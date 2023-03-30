import app from "./src/app.js";
import dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
