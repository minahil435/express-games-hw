const express = require("express");
const logger = require("morgan");
const path = require("path");
const indexRouter = require("./router/indexRouter")
const gameRouter = require("./router/gameRouter")

//server starts
const app = express();

//middleware
app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter)
app.use("/api/game", gameRouter)

app.listen(3000, function () {
    console.log(`Server is running on PORT: ${3000}`);
});

module.exports = app
