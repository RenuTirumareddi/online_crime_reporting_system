const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authenticate');
const { login , logout} = require("../controllers/authcontroller")
const { createUser, getUserProfile, updateUser} = require('../controllers/usercontroller');
const { createReport, getAllReports, searchReportsByLocation} = require('../controllers/reportcontroller');


router.post('/register', createUser);  
router.post('/login', login);          
router.post('/logout', logout);        


router.get('/profile', auth, getUserProfile);  
router.put('/profile', auth, updateUser); 


router.post('/reports', auth, createReport);  
router.get('/reports', auth, getAllReports);  
router.get('/reports/search', auth, searchReportsByLocation);  

module.exports = router;
