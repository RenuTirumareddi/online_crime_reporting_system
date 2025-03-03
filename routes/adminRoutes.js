const express = require('express');
const router = express.Router();
const { auth, isAdmin} = require('../middlewares/authenticate');
const {updateReport, assignReportToOfficer, getCrimeReportStats, deleteReport} = require('../controllers/reportcontroller');

router.put('/reports/:id/status', auth, isAdmin, updateReport);  
router.put('/reports/:id/assign', auth, isAdmin, assignReportToOfficer);  
router.get('/reports/stats', auth, isAdmin, getCrimeReportStats);  
router.delete('/reports/:id', auth, isAdmin, deleteReport);

module.exports = router;
