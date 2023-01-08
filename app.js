import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import userRoutes from './src/routes/user.route.js'
import groupRoutes from './src/routes/group.route.js'
import presentationRoutes from './src/routes/presentation.route.js'
import slideRoutes from './src/routes/slide.route.js'
import slideHeadingRoutes from './src/routes/slideHeading.route.js'
import slideParagraphRoutes from './src/routes/slideParagraph.route.js'


import db from './config/db.config.js';

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
app.use('/slide', slideRoutes);
app.use('/slide_heading', slideHeadingRoutes);
app.use('/slide_paragraph', slideParagraphRoutes);
app.use('/user', userRoutes);
app.use('/', (req, res) => res.json('api run web2'));

// app.use('/payment', paymentRoutes);
export default app;