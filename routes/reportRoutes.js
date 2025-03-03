const express = require('express');
const router = express.Router();
const {updateReport, assignReportToOfficer, getCrimeReportStats, deleteReport, searchReportsByLocation, createReport, getAllReports} = require('../controllers/reportcontroller');
const { auth, isAdmin } = require('../middlewares/authenticate');  

router.post('/', auth, createReport);  
router.get('/', auth, getAllReports);  


router.put('/:id/status', auth, isAdmin, updateReport);
router.put('/:id/assign', auth, isAdmin, assignReportToOfficer);  
router.get('/stats', auth, isAdmin, getCrimeReportStats);  
router.delete('/:id', auth, isAdmin, deleteReport);  


router.get('/search', auth, searchReportsByLocation);  

module.exports = router;
