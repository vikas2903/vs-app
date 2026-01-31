import UserSignupModel from "../modals/vsusermodals.js"; 
import bcrypt from "bcrypt";
import { generateToken } from "../lib/vsjwtouth.js";

// User registration
export const vsuserdatainsertion = async (req, res) => { 
  try {
    const { name, email, password } = req.body;

    // Validate input presence and trimming
    if (!name || !email || !password || name.toString().trim() === '' || email.toString().trim() === '' || password.toString().trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const trimmedName = name.toString().trim();
    const trimmedEmail = email.toString().trim().toLowerCase();
    const trimmedPassword = password.toString().trim();

    // Check if user already exists
    const existingUser = await UserSignupModel.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Create new user
    const newUser = new UserSignupModel({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    // Respond without sending password
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    // Handle duplicate key (email) errors from MongoDB
    if (error && error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already exists.' });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
 



// User login
export const vsuserlogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input presence
    if (!email || !password || email.toString().trim() === '' || password.toString().trim() === '') {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const trimmedEmail = email.toString().trim().toLowerCase();
    const trimmedPassword = password.toString().trim();

    try {
        const user = await UserSignupModel.findOne({ email: trimmedEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   
        const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }   
        // Generate JWT token and set it as an httpOnly cookie
        const token = generateToken(user);
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // only send secure cookies in prod
          //  sameSite: 'Strict',
          maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
}


export const  vsuserlogout = (req, res) => {
  // Clear cookie with the same options used when setting it so the browser removes it reliably
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};
