const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");
const generateToken = require("../utils/generateToken");
const sendmail = require("../utils/sendMail");
const crypto = require("crypto-js");

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

    const token = generateToken(user);

    res.status(201).json({
      message: "OTP sent to your email, Please verify.",
      token,
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
    if (!user || user.isVerified === false) {
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
  console.log(token);

  if (!token) {
    return res.status(400).json({ message: "You are not logged in" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
};

// ======================================================================

exports.forgetPassword = async (req, res, next) => {
  // Get email
  const email = req.body.email;

  // Find this email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "This email dosn't exist!!" });
  }

  // Create the URL contain the token to send into the gamil
  // http://localhost:5000/api/v1/auth/resetPassword/:resetToken
  const resetToken = user.createResettoken();
  await user.save({ validateBeforeSave: false });
  console.log(resetToken);

  // const url = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/auth/reset-password/${resetToken}`;

  const url = `https://asyndrome.vercel.app/reset-password/${resetToken}`;
  console.log("URL: ", url);

  try {
    await sendmail(
      user.email,
      "Forget password",
      `Click on this link to reset your password: ${url}, \n If not please skip this email.`
    );

    // response ==> check your email if you forget password else please skip it
    res.status(200).json({
      message: "Check your email to Reset your password",
    });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    next(error);
  }
};

// ======================================================================

exports.resetPassword = async (req, res, next) => {
  try {
    // ============== Get user based on resetToken ==============
    const comparedToken = crypto
      .SHA256(req.params.resetToken)
      .toString(crypto.enc.Hex);
    console.log(comparedToken);

    const user = await User.findOne({
      resetToken: comparedToken,
      resetTokenExpires: { $gt: Date.now() },
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    const token = generateToken(user);

    res.status(200).json({
      message: "Password Reset Successfylly",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
