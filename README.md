# REMIX CRUD REST API - DENO

This repository contains a simple CRUD (Create, Read, Update, Delete) REST API built using Remix Run on top of Deno. The API allows you to perform basic operations on a collection of todos.

## Features

- **GET**: Retrieve todos or a specific todo by ID.
- **POST**: Create a new todo.
- **PUT**: Update an existing todo by ID.
- **DELETE**: Delete a todo by ID.

## Data Storage

Instead of using a traditional database, this API leverages Deno's built-in file system capabilities to store and retrieve data. The todos are stored in a file on the server, using JSON for serialization.

## API Endpoints

- `GET /todos`: Retrieve all todos.
- `GET /todos/:id`: Retrieve a specific todo by ID.
- `POST /todos`: Create a new todo.
- `PUT /todos/:id`: Update an existing todo by ID.
- `DELETE /todos/:id`: Delete a todo by ID.

## Server Functions

The server utilizes various functions to manipulate the array of todos:

- `createTodo`: Creates a new todo and adds it to the array.
- `getTodos`: Retrieves all todos from the array.
- `getTodo`: Retrieves a specific todo by ID.
- `updateTodo`: Updates an existing todo by ID.
- `deleteTodo`: Deletes a todo by ID.

## Testing the API

To test the API, you can use the provided `todos.http` file and the REST Client extension in Visual Studio Code:

1. Install the REST Client extension in Visual Studio Code if you haven't already.
2. Create a new file named `todos.http` in the root directory of your project.
3. Copy and paste the provided content into the `todos.http` file.
4. Save the `todos.http` file.
5. Start your API server by cloning your repository and running `npm install` followed by `npm run dev` in your terminal. The API will be running at `http://localhost:8000`.
6. Open the `todos.http` file in Visual Studio Code and use the "Send Request" feature of the REST Client extension to test the different API endpoints.

## How to Use

1. Clone this repository: `git clone https://github.com/your-username/your-repo.git`
2. The API will be accessible at `http://localhost:8000`.

Feel free to explore the code and customize it according to your needs. Enjoy building your REMIX CRUD REST API with Deno!

**Note:** Make sure to properly handle security, authentication, and error handling in a production environment.
