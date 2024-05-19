import { app } from "./app.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// console.log(process.env.CORS_ORIGIN);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
