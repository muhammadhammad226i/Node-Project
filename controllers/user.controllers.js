const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password,phone } = req.body;

  try {
    
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword,phone });

    res.status(201).json({ id: user.id, name: user.name,phone:user.phone, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
