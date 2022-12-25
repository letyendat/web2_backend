import mongoose from 'mongoose';
// import { createClient } from 'redis';
// global.redisClient = {};

const Url = 'mongodb+srv://final:asd251315100@cluster0.hx9ljdh.mongodb.net/test';
mongoose.connect(Url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const conn = mongoose.connection;

export default {
  conn
}

