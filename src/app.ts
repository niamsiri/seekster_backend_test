
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import methodOverride from "method-override";
import bodyParser from "body-parser";
import mongoose from "mongoose"

import routes from "./routes"

mongoose.Promise = require("bluebird")
mongoose.connect("mongodb://mongodb:27017/testdb")

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET, HEAD, PUT, POST, DELETE,OPTIONS",
  optionsSuccessStatus: 200,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("X-HTTP-Method-Override"));

app.use('/v1', routes);

app.listen("3000", () => console.log("Server Running!"));