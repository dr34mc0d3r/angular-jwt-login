// https://github.com/Tariqu/REST_API_WITH_MYSQL
// https://www.cloudbooklet.com/setup-node-js-with-apache-proxy-on-ubuntu-18-04-for-production/
// https://pm2.keymetrics.io/docs/usage/quick-start/

// very nice TypeScript for Node myswl REST API
// https://github.com/FaztWeb/typescript-mysql-rest


require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require("./api/users/user.router");

app.use(cors());
app.use(bodyParser.json()); 
// app.use(express.json());

app.use("/api/users", userRouter);
const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
