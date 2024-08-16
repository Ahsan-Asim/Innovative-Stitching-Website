const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/user");
const productRouter = require("./Routes/product");
const path = require('path');



const { connectMongoDb } = require('./connection');

const app = express();
app.set('view engine', 'ejs');
// app.set('views',path.resolve("./views"));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(bodyParser.json());
app.use(express.static('views'));
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory
app.use(bodyParser.urlencoded({ extended: true }));

connectMongoDb('mongodb://localhost:27017/WEB2');

app.use("/", userRouter);
app.use("/", productRouter); // Ensure routes are correctly used

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
