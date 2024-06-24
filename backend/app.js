import express from 'express';
import http from 'http';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './src/utils/db.util.js';
import cors from 'cors';
import options from './src/utils/cors.util.js';
import authRouter from './src/routes/auth.route.js';
import userRouter from './src/routes/user.route.js';
import { ApiResponse } from './src/responses/api.response.js';
import { serveSwagger, setupSwagger } from './swagger.config.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

dotenv.config();

config();
connectDB();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(fileUpload());
app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

// Serve Swagger UI
app.use('/api-docs', serveSwagger, setupSwagger);

server.listen(PORT, (err) => {
  if (err) throw new Error('[LOG]: Server failed to start');
  console.log(`[LOG]: Server started successfully on port ${PORT}`);
});

