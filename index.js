const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');

// middlewares
const authRouter = require('./routes/auth/authRoute');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');

dotenv.config();
app.use(morgan('dev'));

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);

// file upload for multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// file upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json({
        message: 'File uploaded successfully',
        file: req.file,
    });
});


// Category routes
app.use("/api", categoryRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});