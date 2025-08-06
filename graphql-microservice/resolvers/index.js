const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Book = require("../models/Book");
const Author = require("../models/Author");
const User = require("../models/User");
const generateToken = require("../auth/jwt");

const resolvers = {
    Query: {
        books: async () => await Book.find().populate("author"),
        authors: async () => await Author.find(),
        booksByGenre: async (_, { genre }) => await Book.find({ genre }).populate("author"),
        booksByAuthor: async (_, { authorId }) => await Book.find({ author: authorId }).populate("author"),
    },

    Mutation: {
        signup: async (_, { email, password }) => {
            const existing = await User.findOne({ email });
            if (existing) throw new Error("User already exists");

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword });
            const token = generateToken(user);
            return { id: user._id, email: user.email, token };
        },

        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error("Invalid credentials");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");

            const token = generateToken(user);
            return { id: user._id, email: user.email, token };
        },

        addBook: async (_, { title, genre, publishedYear, authorId }, { user }) => {
            if (!user) throw new Error("Unauthorized");

            const book = await Book.create({
                title,
                genre,
                publishedYear,
                author: authorId,
            });

            return await book.populate("author");
        },

        updateBook: async (_, { id, ...updates }, { user }) => {
            if (!user) throw new Error("Unauthorized");

            const book = await Book.findByIdAndUpdate(id, updates, { new: true });
            return await book.populate("author");
        },


        deleteBook: async (_, { id }, { user }) => {
            if (!user) throw new Error("Unauthorized");
            await Book.findByIdAndDelete(id);
            return "Book deleted successfully";
        },

        addAuthor: async (_, args, { user }) => {
            if (!user) throw new Error("Unauthorized");
            return await Author.create(args);
        },

        updateAuthor: async (_, { id, ...updates }, { user }) => {
            if (!user) throw new Error("Unauthorized");
            return await Author.findByIdAndUpdate(id, updates, { new: true });
        },
    },

    Author: {
        books: async (parent) => await Book.find({ author: parent.id }),
    },
};

module.exports = resolvers;
