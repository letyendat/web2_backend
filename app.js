import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import userRoutes from './src/routes/user.route'
import groupRoutes from './src/routes/group.route'
import presentationRoutes from './src/routes/presentation.route'

import db from './config/db.config';

const app = express();
db.conn.on('open', () => {
    console.log('Database connected');
});

// db.redisClient();

app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors());
app.use('/group', groupRoutes);
app.use('/presentation', presentationRoutes);

app.use('/user', userRoutes);
// app.use('/payment', paymentRoutes);
export default app;