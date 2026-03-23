# Blog App

A full-stack blog application built with React, GraphQL, Node.js, and MongoDB.

## Prerequisites

- **Node.js** v18 or later
- **MongoDB** running on `localhost:27017`

## Getting Started

### 1. Start the Backend

```bash
cd server
npm install
npm run dev
```

The GraphQL API will be available at **http://localhost:4000/graphql**.

### 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

The app will open at **http://localhost:5173**.

## Project Structure

```
Blog-App/
├── client/          React + Vite + Tailwind CSS frontend
│   └── src/
│       ├── apollo.js            Apollo Client setup
│       ├── graphql/             Queries and mutations
│       ├── components/          Shared UI components
│       └── pages/               Route pages
└── server/          Node.js + Express + Apollo GraphQL backend
    ├── index.js                 Server entry point
    ├── models/                  Mongoose models
    ├── graphql/                 Schema and resolvers
    └── middleware/              JWT auth middleware
```

## Environment Variables

The server uses a `.env` file in `server/`:

| Variable     | Default                               |
| ------------ | ------------------------------------- |
| `MONGO_URI`  | `mongodb://localhost:27017/blogapp`   |
| `JWT_SECRET` | `your_super_secret_key`               |
| `PORT`       | `4000`                                |

## Features

- User registration and login with JWT authentication
- Create, read, and browse blog posts
- Protected routes — unauthenticated users are redirected to login
- Responsive design — works on mobile, tablet, and desktop
- Real-time cache updates via Apollo Client
