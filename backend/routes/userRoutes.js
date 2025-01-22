// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// // POST route to add a person

// router.post("/signup", async (req, res) => {
//   try {
//     const data = req.body; // Assuming the request body contains the User data

    
//     console.log(data);
//     // Validate Aadhar Card Number must have exactly 12 digit
//     if (!/^\d{12}$/.test(data.aadharCardNumber)) {
//       return res
//         .status(400)
//         .json({ error: "Aadhar Card Number must be exactly 12 digits" });
//     }

//     // Check if a user with the same Aadhar Card Number already exists
//     const existingUser = await User.findOne({
//       aadharCardNumber: data.aadharCardNumber,
//     });
//     if (existingUser) {
//       return res.status(400).json({
//         error: "User with the same Aadhar Card Number already exists",
//       });
//     }

//     // Create a new User document using the Mongoose model
//     const newUser = new User(data);

//     // Save the new user to the database
//     const response = await newUser.save();
//     console.log("data saved");

//     const payload = {
//       id: response.id,
//     };
//     console.log(JSON.stringify(payload));
//     const token = generateToken(payload);

//     res.status(200).json({ response: response, token: token });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   try {
//     const { aadharCardNumber, password } = req.body;

//     if (!aadharCardNumber || !password) {
//       return res
//         .status(400)
//         .json({ error: "Aadhar Card Number and password are required" });
//     }

//     const user = await User.findOne({ aadharCardNumber });
//     if (!user || !(await user.comparePassword(password))) {
//       return res
//         .status(401)
//         .json({ error: "Invalid Aadhar Card Number or Password" });
//     }

//     const payload = { id: user.id };
//     const token = generateToken(payload);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     });

//     res.json({
//       message: "User login successful!",
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// // Profile route
// router.get("/profile", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userData = req.user;
//     const userId = userData.id;
//     // console.log(userId);
//     const user = await User.findById(userId);
//     res.status(200).json({ user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract the id from the token
//     const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body
//     // Check if currentPassword and newPassword are present in the request body
//     if (!currentPassword || !newPassword) {
//       return res
//         .status(400)
//         .json({ error: "Both currentPassword and newPassword are required" });
//     }

//     // Find the user by userID
//     const user = await User.findById(userId);

//     // If user does not exist or password does not match, return error
//     if (!user || !(await user.comparePassword(currentPassword))) {
//       return res.status(401).json({ error: "Invalid current password" });
//     }

//     // Update the user's password
//     user.password = newPassword;
//     await user.save();

//     console.log("password updated");
//     res.status(200).json({ message: "Password updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/logout", async (req, res) => {
//   console.log("logout route");
//   try {
//     res.status(200).json({ msg: null });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.patch("/check-auth", (req, res) => {
//   // Check if the user is authenticated
//   console.log("route hit");
//   if (req.isAuthenticated()) {
//     res.status(200).json({ authenticated: true });
//   } else {
//     res.status(401).json({ authenticated: false });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aryanrathour696@gmail.com", // Your email
    pass: "ybnebbqplegzjxrg", // Your email password (or use environment variables)
  },
});

// Function to send verification email
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://localhost:8000/user/verify-email/${token}`;
  const mailOptions = {
    from: "aryanrathour696@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.log("Error sending email:", error);
    }
};

// POST route to sign up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, aadharCardNumber, mobile, address, age } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with the same email already exists" });
    }

    // Create a new User
    const newUser = new User({
      name,
      email,
      password,
      aadharCardNumber,
      mobile,
      address,
      age,
    });

    // Generate a verification token
    const verificationToken = jwt.sign({ email: newUser.email }, "secret-key", {
      expiresIn: "1h",
    });
    newUser.verificationToken = verificationToken;

    // Save the new user
    await newUser.save();

    // Send email with verification link
    await sendVerificationEmail(newUser.email, verificationToken);

    res
      .status(200)
      .json({
        message:
          "Signup successful, please check your email to verify your account.",
      });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for email verification
router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Verify token
    jwt.verify(token, "secret-key", async (err, decoded) => {
      if (err) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      // Find the user and mark as verified
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.isVerified = true;
      user.verificationToken = null; // Remove verification token
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to login
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    if (!aadharCardNumber || !password) {
      return res
        .status(400)
        .json({ error: "Aadhar Card Number and password are required" });
    }

    const user = await User.findOne({ aadharCardNumber });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ error: "Invalid Aadhar Card Number or Password" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ error: "Please verify your email before logging in" });
    }

    const token = jwt.sign({ id: user.id }, "secret-key", { expiresIn: "1h" });

    res.status(200).json({ message: "User login successful!", token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

router.post("/resend-verification-email", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    // Generate new verification token
    const verificationToken = jwt.sign({ email: user.email }, "secret-key", {
      expiresIn: "1h",
    });
    user.verificationToken = verificationToken;
    await user.save();

    // Send the verification email again
    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ message: "Verification email resent" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
