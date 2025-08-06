# Blog API

A RESTful API built with NestJS and TypeORM for managing a blogging platform. The API supports user registration, authentication, article publishing, commenting, liking, and following/unfollowing users. It is designed for scalability, security, and ease of integration with frontend clients.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Use Cases](#use-cases)
- [Design Decisions](#design-decisions)

---

## Features
- User registration and authentication (JWT)
- CRUD operations for articles
- Commenting on articles
- Like system for articles
- Follow/unfollow users
- Pagination for lists
- Role-based access (public/private endpoints)

## Tech Stack
- **NestJS**: Modular, scalable Node.js framework
- **TypeORM**: ORM for database management
- **PostgreSQL** 
- **Passport.js**: Authentication middleware
- **Jest**: Testing framework

## API Endpoints

### Auth
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT

### User
- `PATCH /user/update` — Update user profile (JWT required)
- `DELETE /user/delete/:id` — Delete user (JWT required)
- `GET /user/getuser` — Get user by email
- `POST /user/follow` — Follow another user (JWT required)
- `PUT /user/unfollow` — Unfollow a user (JWT required)
- `GET /user/get-following` — List users you follow (JWT required)
- `GET /user/get-followers` — List your followers (JWT required)
- `GET /user/my-profile` — Get your profile (JWT required)

### Article
- `POST /artical/new-artical/userName/:userName` — Create new article (JWT required)
- `GET /artical/all` — List all articles (public, paginated)
- `GET /artical/:title` — Get article by title (public)
- `PATCH /artical/update/:id/userId/:userId` — Update article (JWT required)
- `DELETE /artical/delete/:id/userId/:userId` — Delete article (JWT required)

### Comment
- `POST /comment/new-comment` — Add comment to article (JWT required)
- `GET /comment/all/:articalId` — List comments for an article (public)
- `PATCH /comment/update/:id/userId/:userId` — Update comment (JWT required)
- `DELETE /comment/delete/:id/userId/:userId` — Delete comment (JWT required)

### Like
- `POST /likes/new-like` — Like an article (JWT required)
- `GET /likes/all/:articalId` — List likes for an article (public)
- `DELETE /likes/delete/:id/userId/:userId` — Remove like (JWT required)

## Use Cases
- **Blogging Platform**: Power a full-featured blog with user-generated content, comments, and social features.
- **Social Network**: Enable following/unfollowing and engagement (likes/comments) for a community site.
- **Learning Project**: Demonstrates best practices in NestJS, TypeORM, and JWT authentication.
- **API Backend**: Integrate with any frontend (React, Angular, Vue, mobile apps).

## Design Decisions & Rationale
- **NestJS**: Chosen for its modularity, dependency injection, and scalability.
- **TypeORM**: Simplifies database operations and migrations.
- **JWT Authentication**: Secure, stateless user sessions.
- **Pagination**: Ensures efficient data retrieval for large datasets.
- **Role-based Access**: Public/private decorators for endpoint security.
- **DTOs & Validation**: Ensures data integrity and clear API contracts.
- **Testing**: Jest for unit and e2e tests to ensure reliability.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
