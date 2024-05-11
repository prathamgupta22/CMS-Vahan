import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";

const app = express();
const port = process.env.PORT || 8000;

//CONNECT TO POSTGRESQL
const pool = new Pool({
  user: "",
});
