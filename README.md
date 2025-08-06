GraphQL Bookstore Microservice:-
This is a GraphQL-based microservice for managing a bookstore. It allows users to register, login (with JWT auth), and perform CRUD operations on books and authors.

Tech Stack:-
Node.js

Express.js

GraphQL (Apollo Server)

MongoDB with Mongoose

JWT Authentication

Project Structure:-
graphql-microservice/
├── models/             # Mongoose models for Book and Author
├── resolvers/          # GraphQL resolvers
├── schema/             # GraphQL type definitions
├── utils/              # Utility functions (e.g., JWT)
├── app.js              # Express & Apollo server setup
├── .env                # Environment variables
├── .gitignore          # Git ignored files
├── package.json
└── README.md

Setup Instructions:-
1. Clone the repository
git clone (https://github.com/swatimonalisa-patra/bookstore-microservice.git)
cd graphql-microservice
2. Install dependencies
npm install
3. Configure Environment Variables
Create a .env file in the root directory:

env
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_secure_jwt_secret_key
PORT=4000
Replace your_secure_jwt_secret_key with a strong secret key.

4. Start the server
npm start
npm run dev

-Access 
http://localhost:4000/graphql(Open in Browser)


Sample GraphQL Queries
======================
Register User:-
mutation {
  signup(email: "test@example.com", password: "123456") {
    id
    email
    token
  }
}

Login User
mutation {
  login(email: "test@example.com", password: "123456") {
    id
    email
    token
  }
}
Use the returned token as a Bearer token in the Authorization header for further queries.

Add Author
mutation {
  addAuthor(name: "J.K. Rowling", bio: "Author of Harry Potter") {
    id
    name
    bio
  }
}

Update Author:-
mutation {
  updateAuthor(
    id: "68931692339091f546bb4597" 
    name: "Joanne Rowling updated"
    bio: "British author best known for the Harry Potter series"
  ) {
    id
    name
    bio
  }
}


Add Book
mutation {
  addBook(
    title: "Harry Potter and the Philosopher's Stone"
    genre: "Fantasy"
    publishedYear: 1997
    authorId: "68931692339091f546bb4597"
  ) {
    id
    title
    genre
    publishedYear
    author {
      name
    }
  }
}

Update Book:-
mutation {
  updateBook(
    id: "689317a1339091f546bb459a" 
    title: "Harry Potter and the Chamber of Secrets updated"
    genre: "Fantasy"
    publishedYear: 1998
  ) {
    id
    title
    genre
    publishedYear
    author {
      name
    }
  }
}


Delete Book:-
mutation {
  deleteBook(id: "689317a1339091f546bb459a")
}

Query All Books:-
query {
  books {
    id
    title
    genre
    publishedYear
    author {
      name
    }
  }
}

Books By genre
query {
  booksByGenre(genre: "Fantasy") {
    title
    author {
      name
    }
  }
}

Books By Author:-
query {
  booksByAuthor(authorId: "68931692339091f546bb4597") {
    title
    genre
  }
}


Set The Auth Token in Graphql Server:-
====================================

-Select Header in the bottom of the screen
-Select New Header & Header Key as Authorization
-Add the token with Bearer in the 1st part

UseCases:-
==========

-only Authorized Token user can Add,Update,Delete Resources
-UnAuthorized dont have access to Add,update,Delete Resources
-But they can fetch booklist and Authors and genre also

