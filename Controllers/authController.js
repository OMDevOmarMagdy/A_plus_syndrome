const jwt = require("jsonwebtoken");

const TempUser = require("../models/tempUserModel");
const User = require("../models/userModel");
const BlockedEmail = require("../models/blockedEmailModel");
const sendMail = require("../utils/sendMail");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto-js");

const otpTemplate = require("../utils/templates/otpTemplate");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ======================================================================

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.body;

    const OTP = generateOTP();
    const otpExpire = Date.now() + 10 * 60 * 1000;

    // Check if the user is blokced or not
    const blocked = await BlockedEmail.findOne({ email });
    if (blocked) {
      return res
        .status(403)
        .json({ message: "This email is blocked. Contact support." });
    }

    // If email already exists in TempUser or User
    if (
      (await User.findOne({ email })) ||
      (await TempUser.findOne({ email }))
    ) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Store in TempUser
    const tempUser = await TempUser.create({
      name,
      email,
      password,
      image,
      OTP,
      otpExpire,
    });

    await sendMail(
      tempUser.email,
      "verify your email (OTP)",
      `Your OTP is: ${OTP}`,
      otpTemplate(tempUser.name, OTP)
    );

    const token = generateToken(tempUser);

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
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(400).json({ message: "No signup request found" });
    }

    // ============= Compare the OTP with this one =============
    if (tempUser.OTP !== OTP || tempUser.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP is invalid or expired" });
    }

    // Create real user
    const user = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      image: tempUser.image,
      isVerified: true,
    });

    // Remove from TempUser
    await TempUser.deleteOne({ email });

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

    // Check if the user is blokced or not
    const blockedLogin = await BlockedEmail.findOne({ email });
    if (blockedLogin) {
      return res
        .status(403)
        .json({ message: "This email is blocked. Contact support." });
    }

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
  } catch (error) {
    next(error);
  }
};

// ======================================================================

exports.protect = async (req, res, next) => {
  console.log("This is Protect Middleware");

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  try {
    // 1️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 2️⃣ Find user
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // 3️⃣ (Optional) Check if user changed password after token was issued
    if (currentUser.passwordChangedAt) {
      const changedTimestamp = parseInt(
        currentUser.passwordChangedAt.getTime() / 1000,
        10
      );
      if (changedTimestamp > decoded.iat) {
        return res
          .status(401)
          .json({ message: "Password was changed. Please log in again." });
      }
    }

    // Attach user to request
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
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
    console.log("Start sending email...");
    await sendMail(
      user.email,
      "Forget password",
      `Click here: ${url}`,
      undefined
    );
    console.log("Email send finished ✅");

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

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You don't have permission to perform this action",
      });
    }
    next();
  };
};
