# NestJS Authorization and Authentication App

Welcome to our comprehensive authentication and authorization system built using NestJS, MongoDB, Redis, JWT, and Bcrypt. This robust application provides essential functionalities such as sign-up, sign-in, and password reset capabilities.

## Features

- **Secure User Registration:** Register new users with encrypted passwords using Bcrypt for enhanced security.
- **Efficient User Authentication:** Authenticate users securely via JWT tokens upon successful login.
- **Password Reset Functionality:** Enable users to securely reset their passwords through email verification.

## Technologies Used

- **NestJS:** The backbone of our backend API, empowering us with TypeScript's strength and scalability.
- **MongoDB:** Our trusted database, storing user information and credentials reliably.
- **Redis:** Our secret sauce for caching and session management, boosting performance seamlessly.
- **JWT (JSON Web Tokens):** The guard of our authentication and authorization processes, ensuring robust security.
- **Bcrypt:** The guardian of our passwords, employing hashing for utmost protection.
- **Nodemailer:** Powering our email delivery system for password reset and verification emails.
- **EJS:** Enabling us to create dynamic email templates for an enhanced user experience.


## Setup

### 1. Install the required dependencies

```bash
$ npm install
```

### 2. Rename the .env.example filename to .env and set your local variables

```bash
$ mv .env.example .env
```

### 3. Start the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker for development

```bash
# start the application
$ npm run docker:up

# stop the application
$ npm run docker:down
```

## Swagger documentation

- [localhost:3000/docs](http://localhost:3000/docs)

## License

This project is licensed under the [MIT License](LICENSE).



