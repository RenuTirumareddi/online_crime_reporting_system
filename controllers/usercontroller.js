const User = require('../models/User');
const {hash} = require('../utils/hashPassword')

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, birth_date, phone, gender, role, password, confirm_password, profilePhoto } = req.body;

    if(! first_name ||
       ! last_name  ||
       ! email||
       ! birth_date ||
       ! phone ||
       ! gender ||
       ! role ||
       ! password ||
       ! confirm_password ||
       ! profilePhoto
    ){
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (confirm_password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Confirm password must be at least 6 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashpassword = await hash(password);



    const newUser = new User({
      first_name,
      last_name,
      email,
      birth_date,
      phone,
      gender,
      role: role || 'user',
      password: hashpassword, 
      profilePhoto,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating user', error });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, gender, role, profilePhoto } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { first_name, last_name, email, phone, gender, role, profilePhoto },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
     const user = await User.findById(req.user._id);
     if (!user) {
        return res.status(404).json({ message: 'User not found' });
     }
     res.status(200).json(user);
  } catch (error) {
     res.status(500).json({ message: 'Error fetching user profile', error });
  }
};
