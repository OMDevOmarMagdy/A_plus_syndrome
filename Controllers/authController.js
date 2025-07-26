const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");
const generateToken = require("../utils/generateToken");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ======================================================================

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.body;

    const OTP = generateOTP();
    const otpExpire = Date.now() + 10 * 60 * 1000;

    console.log(OTP);
    const user = await User.create({
      name,
      email,
      password,
      image,
      OTP,
      otpExpire,
    });

    // I want to be sure for this
    if (!user) {
      return res.status(400).json({
        message: "Something went wrong, please try again",
      });
    }

    await sendMail(
      user.email,
      "verify your email (OTP)",
      `Your OTP is: ${OTP}`
    );

    res.status(201).json({
      message: "OTP sent to your email, Please verify.",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================================

exports.verifyOTP = async (req, res, next) => {
  try {
    // ============= Get the email and the OTP =============
    const { email, OTP } = req.body;
    const user = await User.findOne({ email });

    // ============= Check if the user exist or not =============
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ============= Compare the OTP with this one =============
    if (user.OTP !== OTP || user.otpExpire < Date.now()) {
      return res.status(400).json({
        message: "OTP is Invalid or Expired",
      });
    }

    user.isVerified = true;
    user.OTP = undefined;
    user.otpExpire = undefined;
    await user.save();

    // Token
    const token = generateToken(user);

    // ============= Verify the email =============
    res
      .status(200)
      .json({ message: "Email Verified", email: user.email, token });
  } catch (error) {
    next(error);
  }
};

// ======================================================================

exports.login = async (req, res, next) => {
  try {
    // ============= Get email and password =============
    const { email, password } = req.body;

    // ============= User exist or not =============
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "This user is not exist",
      });
    }
    // ============= Compare the password =============
    // console.log(password, user.password);
    const compared = await user.copmaredPassword(password, user.password);
    if (!compared) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ============= Token =============
    const token = generateToken(user);

    // ============= Send response =============
    res.status(200).json({
      status: "Success",
      token,
      data: {
        user,
      },
    });

    next();
  } catch (error) {
    next(error);
  }
};

// ======================================================================

exports.protect = async (req, res, next) => {
  // Verifcation the token --> verify that you are the right person to perform this action
  console.log("This is Protect Middleware");

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({ message: "You are not logged in" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
};

// ======================================================================
