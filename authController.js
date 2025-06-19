const User = require('../Models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
     await user.save();
    res.json({ success: true, msg: "Registration successful" });
  } catch (err) {
    res.status(400).json({ success: false, msg: "Registration Failed", error: err.message });
  }
};

const login = async (req, res) => {
    console.log("Incoming request body:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ success: false, msg: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ success: false, msg: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {
      expiresIn: "1d",
    });
    res.json({ success: true, token });
};

module.exports = {
    register,
    login
}