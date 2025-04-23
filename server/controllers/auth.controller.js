import { compare } from "bcrypt";
import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // 3. Create user
    const user = await User.create({ email, password });

    // 4. Generate token and set cookie
    const token = createToken(email, user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // ✅ Required with SameSite: "None"
      sameSite: "None",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    // 5. Omit sensitive data in response
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email." });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = createToken(email, user._id);


    res.cookie("jwt", token, {
      secure: true,
      httpOnly: true, // Ensure the cookie is HTTP-only
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        email: user.email,
        id: user._id,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
  console.log(req.userId);
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({
      email: userData.email,
      id: userData._id,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// export const updateProfile = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     const { firstName, lastName, color } = req.body;

//     if (!firstName || !lastName) {
//       return res
//         .status(400)
//         .json({ message: "Firstname, Lastname and color are required." });
//     }

//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         firstname: firstName, // Use "firstname" as per the schema
//         lastname: lastName,   // Use "lastname" as per the schema
//         color,
//         profileSetup: true,
//       },
//       { new: true, runValidators: true }
//     );

//     return res.status(200).json({
//       email: userData.email,
//       id: userData._id,
//       profileSetup: userData.profileSetup,
//       firstName: userData.firstname, // Return "firstname" as "firstName"
//       lastName: userData.lastname,   // Return "lastname" as "lastName"
//       image: userData.image,
//       color: userData.color,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// };

// export const updateProfileImage = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }

//     const imagePath = `uploads/profiles/${req.file.filename}`;
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { image: imagePath },
//       { new: true, runValidators: true }
//     );

//     return res.status(200).json({
//       image: updatedUser.image,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteProfileImage = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     const userData = await User.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ message: "User not found." });
//     }
//     if (userData.image) {
//       try {
//         unlinkSync(userData.image); // Ensure this path is correct
//       } catch (err) {
//         console.error("Error deleting file:", err);
//       }
//     }
//     userData.image = null;
//     await userData.save();
//     return res.status(200).json({ message: "Image deleted successfully." });
//   } catch (error) {
//     console.error("Error in deleteProfileImage:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// export const logout = async (req, res, next) => {
//   try {
//     res.clearCookie("jwt", { secure: true, sameSite: "None" });
//     return res.status(200).json({ message: "Logged out successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// }
