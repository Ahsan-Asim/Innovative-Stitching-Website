const express = require("express");
const bodyParser = require("body-parser");
const userRouter=require("./Routes/user")
const {connectMongoDb}=require('./connection');
const {logReqRes}=require("./middlewares")
// const User = require("./Models/user"); // Import User model

const app = express();

app.use(bodyParser.json());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

connectMongoDb('mongodb://localhost:27017/WEB2');

app.use(logReqRes("log.txt"));

app.use("/",userRouter);




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
