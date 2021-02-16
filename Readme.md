# Fullstack Auth service

A simple Fullstack Authentication service.

# Technologies Used

- Backend: Node/Express, Graphql, sql
- Libaries: sequelize-typescript, sequelize, apollo-server-express, graphql-tools, express, typescript, react, react-redux

# Backend env sample

- SENDER_EMAIL=
- FORGOT_PASSWORD_ALIAS=
- PORT=3030
- BRAND_NAME=
- JWT_SECRET=
- tokenExpiresIn=
- database=tutorial
- dialect=postgres
- username=postgres
- password=postgres
- host='127.0.0.1'

# Backend baseurl
http://localhost:3030

## API Endpoints

| Endpoint                | Functionality            |
| ----------------------- | ------------------------ |
| POST /user/signup          | Register user |
| POST /user/login           | Login user |
| POST /user/forgot_password | Send a request to user to change password |
| GET /user/find_user        | Find a register user by email |
| GET /user/reset_password   | Change user password   |
| POST /book/create          | Add book  |
| GET /book/list             | List book    |


#
# Graphql query

| Endpoint                | Functionality            |
| ----------------------- | ------------------------ |
| POST /graphql | List of books |


# To Install

- Download or clone
- Open terminal inside the root directory of clone folder
- To start Backend service change directory to the Backend folder
- To start Frontend service change directory to the Frontend folder
- Type `npm install or yarn install` to install all dependencies
- `npm start` to run the app
- To run backend service on local machine run below command on your terminal
- `npm run dev` to run development environment

## AUTHOR

[Kayode Adeyemi](https://github.com/karosi12)