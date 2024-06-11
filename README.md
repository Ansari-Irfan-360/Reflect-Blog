# Rerflect : Blog Website

This Blog Website is a full-stack web application that allows users to create, read, update, and delete blog posts. It features user authentication, image uploads, and a responsive design using modern web technologies.

## Table of Contents

- [Blog Website](#blog-website)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Acknowledgements](#acknowledgements)

## Introduction

Blog Website is designed to provide a seamless blogging experience. Users can sign up, log in, and manage their own blog posts. The application supports image uploads for blog posts and offers a modern, responsive design.

## Features

- User authentication (sign up, log in, log out)
- Create, read, update, and delete blog posts
- Image uploads for blog posts
- Responsive design

## Tech Stack

**Client:**

- React
- Material UI
- Axios
- React Router

**Server:**

- Node.js
- Express
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- Bcrypt for password hashing
- Multer and GridFS for file uploads
- Cors
- Dotenv

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Ansari-Irfan-360/Reflect.git
    cd blog-website
    ```

2. Install client dependencies:

    ```sh
    cd client
    npm install
    ```

3. Install server dependencies:

    ```sh
    cd ../server
    npm install
    ```

4. Create a `.env` file in the `server` directory and add your MongoDB URI and JWT secret:

    ```env
    MONGO_URL=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    ```

5. Start the server:

    ```sh
    npm start
    ```

6. Start the client:

    ```sh
    cd ../client
    npm start
    ```

The client will run on `http://localhost:3000` and the server will run on `http://localhost:5000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in with an existing account.
3. Create, read, update, and delete blog posts.
4. Upload images to your blog posts.

## Acknowledgements

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Multer](https://www.npmjs.com/package/multer)
- [GridFS](https://www.mongodb.com/docs/manual/core/gridfs/)
