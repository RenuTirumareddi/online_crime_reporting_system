const Report = require('../models/Report');
const User = require('../models/User');


exports.createReport = async (req, res) => {
  try {
    const { userId, crimeType, description, location, evidence } = req.body;

    const newReport = new Report({
      user: req.user._id, 
      crimeType,
      description,
      location,
      evidence,
    });

    const savedReport = await newReport.save();
    res.status(201).json({
      message: 'Report created successfully',
      report: savedReport,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('user officerAssigned');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};


exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('user officerAssigned');
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error });
  }
};


exports.updateReport = async (req, res) => {
  try {
    const { status, officerAssigned } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status, officerAssigned },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({
      message: 'Report updated successfully',
      report: updatedReport,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating report', error });
  }
};


exports.deleteReport = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report', error });
  }
};

exports.searchReportsByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location query parameter is required' });
    }
    const reports = await Report.find({ location: { $regex: location, $options: 'i' } }).populate('user officerAssigned');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error searching reports by location', error });
  }
};


exports.getCrimeReportStats = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const crimeTypes = await Report.aggregate([
      { $group: { _id: '$crimeType', count: { $sum: 1 } } }
    ]);
    const statusCounts = await Report.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      totalReports,
      crimeTypes,
      statusCounts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crime report stats', error });
  }
};


exports.assignReportToOfficer = async (req, res) => {
  try {
    const { officerAssigned } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    report.officerAssigned = officerAssigned;
    await report.save();
    res.status(200).json({ message: 'Report assigned to officer successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning officer', error });
  }
};
