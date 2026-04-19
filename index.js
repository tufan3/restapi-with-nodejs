const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth/authRoute');
const userRouter = require('./routes/userRoute');
dotenv.config();

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});