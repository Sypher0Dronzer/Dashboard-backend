import Project from "../models/project.model.js";
import User from '../models/user.model.js'
export const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find();

    // Helper function to fetch user details excluding the password
    const getUserDetails = async (userId) => {
      const user = await User.findById(userId).select("-password"); // Exclude password
      return user;
    };

    // Helper function to update the user's projects array in the database
    const updateUserProjects = async (userId, projectId) => {
      // Add the project ID to the user's projects array if it's not already there
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { projects: projectId }, // Using $addToSet to avoid duplicates
        },
        { new: true } // Return the updated document
      );
    };

    // Process projects to replace team IDs with user details and check for project ID in user details
    const updatedProjects = await Promise.all(
      projects.map(async (project) => {
        // Decode team member details
        const teamWithDetails = await Promise.all(
          project.team.map(async (teamMemberId) => {
            const userDetails = await getUserDetails(teamMemberId);
            
            // Check if the project ID exists in the user's projects array
            if (!userDetails.projects.includes(project._id.toString())) {
              // Add the project ID to the user's projects array
              await updateUserProjects(teamMemberId, project._id);
            }

            return userDetails;
          })
        );

        // Decode project lead details and check if the project ID exists
        const projectLeadDetails = await getUserDetails(project.projectLead);
        if (!projectLeadDetails.projects.includes(project._id.toString())) {
          // Add the project ID to the project lead's projects array
          await updateUserProjects(project.projectLead, project._id);
        }

        // Return updated project object with user details
        return {
          ...project.toObject(),
          team: teamWithDetails, // Updated team with user details
          projectLead: projectLeadDetails, // Updated project lead with user details
        };
      })
    );

    res.status(200).json({ success: true, projects: updatedProjects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const createProject = async (req, res) => {
  try {
    const { name, tags } = req.body;

    // Check if a project with the same name already exists
    const existingProject = await Project.findOne({ name: { $regex: `^${name}$`, $options: "i" } });

    if (existingProject) {
      return res.status(400).json({ 
        success: false, 
        message: `A project with the name "${name}" already exists. Please choose a different name.` 
      });
    }

    // Create a new project
    const newProject = new Project({
      name,
      projectLead: req.user._id,
      tags,
      team: [req.user._id],
      status: "ongoing",
    });

    const savedProject = await newProject.save();
    res.status(201).json({ 
      success: true, 
      project: savedProject, 
      message: `${name} has successfully been created` 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Delete the project
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }

    // Find and update users whose projects array contains the projectId
    const usersWithProject = await User.find({ projects: projectId });

    if (usersWithProject.length > 0) {
      await Promise.all(
        usersWithProject.map(async (user) => {
          user.projects = user.projects.filter((id) => id.toString() !== projectId);
          await user.save();
        })
      );
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      deletedProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const addMembersToProject = async (req, res) => {
  try {
    const { projectId, newMembers } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }

    // if (project.team.includes(userId)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, error: "User is already a member of this project" });
    // }

    project.team.push(...newMembers);
    await project.save();

    res.status(200).json({ success: true, message: "Members added successfully", project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const removeMembersFromProject = async (req, res) => {
  try {
    const { projectId, removeMembers } = req.body;
    // Validate input
    if (!projectId || !Array.isArray(removeMembers)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. 'projectId' and 'removeMembers' are required.",
      });
    }

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Filter out members to be removed from the project team
    project.team = project.team.filter(
    (memberId) => !removeMembers.includes(memberId.toString())
    );

    // Save updated project
    await project.save();
    res.status(200).json({
      success: true,
      message: "Members removed successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

