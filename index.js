const express = require('express');
const userRouter = require('./src/router/user.router');
const postRouter = require('./src/router/post.router');
const PORT = process.env.PORT || 8080;

const app = express();
// app.get('/', (req, res) => res.send('HELLO POSTGRES !'))
app.use(express.json())
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(PORT, () => {
    console.log("server start  " + PORT)
})