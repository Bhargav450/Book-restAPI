require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRoutes');


const app = express();
const PORT = process.env.PORT || 3400;

app.use(bodyParser.json());
app.use('/api', bookRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
