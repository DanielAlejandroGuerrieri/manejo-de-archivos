const express = require("express");
const app = express();
const path = require('path');
let indexRouter = require('./routes/index');
const uploadFile = require('./routes/uploadFile');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', uploadFile);



app.listen(3000, () => {
    console.log(`Server running on port ${3000}...`);
})