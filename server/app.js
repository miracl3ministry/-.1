const express = require("express");
const createError = require('http-errors');
const path = require("path");
let logger = require('morgan');

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(logger('dev'));

app.use('/lab1', express.static(path.join(__dirname, '../', 'lab1')));
app.use('/lab2', express.static(path.join(__dirname, '../', 'lab2')));

app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    let content = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "  <head>\n" +
        "    <meta charset=\"UTF-8\" />\n" +
        "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
        "    <title>Document</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <a href=\"./lab1\">Лабораторная работа 1</a>\n" +
        "    <br>\n" +
        "    <a href=\"./lab2\">Лабораторная работа 2</a>\n" +
        "  </body>\n" +
        "</html>";
    res.write(content);
    res.end();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.sendStatus(404);
    console.log(404);
    // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err)
    res.write('error' + '\n' + err.message);
    res.status(err.status || 500);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
