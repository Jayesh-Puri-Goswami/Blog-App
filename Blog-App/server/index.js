require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { getUser } = require('./middleware/auth');

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = await getUser(token);
        return { user };
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
