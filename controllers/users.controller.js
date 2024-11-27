import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import bcryptjs from "bcryptjs";

export async function authorizationCheck(req, res) {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (err) {
    // console.log("Error in authCheck controller", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().select("-password");

    const getProjectDetails = async (projectId) => {
      const project = await Project.findById(projectId);
      return project;
    };

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const projectsWithDetails = await Promise.all(
          user.projects.map(async (projectId) => {
            const projectDetails = await getProjectDetails(projectId);
            return projectDetails;
          })
        );

        return {
          ...user.toObject(),
          projects: projectsWithDetails,
        };
      })
    );

    res.status(200).json({ success: true, users: updatedUsers });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message }); // Pass the error to the response
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { userId } = req.params;
    // Step 1: Delete the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Step 2: Remove the user ID from all project team arrays
    await Project.updateMany(
      { team: userId }, // Filter projects where the user ID is in the team array
      { $pull: { team: userId } } // Remove the user ID from the team array
    );

    // Step 3: Delete projects where the user is the project lead
    const deletedProjects = await Project.deleteMany({ projectLead: userId });

    return res.status(200).json({
      success: true,
      message: `User deleted successfully, projects updated, and ${deletedProjects.deletedCount} project(s) deleted where the user was the lead.`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "User deletion failed",
      error: error.message, // Include error details for debugging
    });
  }
}

export async function changeUserRole(req, res, next) {
  try {
    const { userId, newRole } = req.body;

    // Find the user by ID and update the role
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true } // This option returns the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user, // Optionally return the updated user object
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Switching User Role Failed",
      error: error.message, // Include error details for debugging
    });
  }
}
export async function createUser(req, res, next) {
  try {
    const { name, password, email } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      projects: [],
      role: "contributor",
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      newUser, // Optionally return the updated user object
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Creating User Failed",
      error: error.message, // Include error details for debugging
    });
  }
}
