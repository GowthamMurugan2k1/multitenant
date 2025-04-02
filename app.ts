import express from "express";
import router from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error-middleware";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({ path: "./.env" });
const Port = process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware)
// Cookies parser
app.use(cookieParser());


// the CORS options
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"], // Whitelisted Domain
};
app.use(cors(corsOptions));

// Accept JSON
app.use(express.json());
app.use("/api/v1", router);

app.listen(Port, () =>
  console.log(`Server running at http://localhost:${Port}`)
);
