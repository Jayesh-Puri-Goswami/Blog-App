const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');

const resolvers = {
  Query: {
    getPosts: async () => {
      return Post.find().populate('author').sort({ createdAt: -1 });
    },

    getPost: async (_, { id }) => {
      return Post.findById(id).populate('author');
    },

    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    },
  },

  Mutation: {
    register: async (_, { username, password }) => {
      const existing = await User.findOne({ username });
      if (existing) {
        throw new Error('Username already taken');
      }

      if (password.length < 4) {
        throw new Error('Password must be at least 4 characters');
      }

      const hashed = await bcrypt.hash(password, 12);
      const user = await User.create({ username, password: hashed });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return { token, user };
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return { token, user };
    },

    addPost: async (_, { title, content }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const post = await Post.create({
        title,
        content,
        author: user.id,
      });

      return post.populate('author');
    },
  },
};

module.exports = resolvers;
