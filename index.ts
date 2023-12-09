import express from 'express';
import postRouter from './src/router/post.router';
import userRouter from './src/router/user.router';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(PORT, () => {
  console.log("server start " + PORT);
});
