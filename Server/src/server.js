import { app } from "./app.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST"],
//     // allowedHeaders: ["Content-Type", "Authorization", "Custom-Header"],
//   })
// );
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
