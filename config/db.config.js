import mongoose from 'mongoose';
// import { createClient } from 'redis';
// global.redisClient = {};

const Url = 'mongodb+srv://test:NKIfsrgfam55@cluster0.sbypu.mongodb.net/?retryWrites=true&w=majority';
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

