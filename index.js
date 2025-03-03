const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db_conn = require("./config/db")
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const app = express();

dotenv.config()

app.use(cors({
  origin: process.env.CLIENT_URL || '*', 
  credentials: true,
}));
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); 


const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/api/users', userRoutes);  
app.use('/api/admin', adminRoutes);  
app.use('/api/reports', reportRoutes);  



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
