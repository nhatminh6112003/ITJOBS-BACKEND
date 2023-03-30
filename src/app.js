import configViewEngine from "./config/viewEngine.config.js";

import express from "express";
import morgan from "morgan";
import route from "./routes/index.js";
import cors from "cors";
import compression from "compression";
// import helmet from "helmet";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/api/test", (req, res) => {
  res
    .status(202)
    .cookie("Name", "Rahul Ahire", {
      secure: false,
      httpOnly: false,
      path: "/",
      sameSite: "strict",
      expires: new Date(new Date().getTime() + 100 * 1000),
    })
    .json({ sucess: true });
});

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
  })
);

//cấp quyền để truy cập tài nguyên

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(helmet())
app.use(morgan("combined"));
// đường dẫn của dự án
route(app);
app.all('*',(req,res,next)=>{
  const err=new Error("The route can not be found");
  err.statusCode=404
  next(err)
})
app.use(errorHandler)
configViewEngine(app);

export default app;
