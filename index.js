const express = require('express');
const app = express();
const port = 3000;


const nameRouter = require('./nameRouter');

app.use(express.json());


app.use('/api', nameRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});