const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const path = require("path");

mongoose
    .connect("mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST,PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    next();
});

app.use('/api/posts',postRoutes);
app.use('/api/users', userRoutes);




module.exports = app;
