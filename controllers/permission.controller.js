import Permission from "../models/permission.model.js";


export async function getAllPermissions(req, res, next) {
  try {
    const permissions = await Permission.find().populate('senderId', 'name email'); // Populate senderId with user name and email (if applicable)

    res.status(200).json({
      success: true,
      permissions: permissions,
      message:'All permissions have been fetched'
    });
  } catch (error) {
    console.error('Error fetching permissions:', error);

    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: 'Failed to fetch permissions. Please try again later.',
    });
  }
}

export async function deletePermission(req, res, next) {
  try {
    // Extract permissionId from the request parameters
    const { permissionId } = req.params;

    // Validate the permissionId
    if (!permissionId) {
      return res.status(400).json({ success: false, message: "Permission ID is required." });
    }

    // Attempt to delete the permission by its ID
    const deletedPermission = await Permission.findByIdAndDelete(permissionId);

    // Check if the permission existed and was deleted
    if (!deletedPermission) {
      return res.status(404).json({ success: false, message: "Permission not found." });
    }

    // Respond with success and the deleted permission details
    return res.status(200).json({
      success: true,
      message: "Permission deleted successfully.",
      deletedPermission,
    });
  } catch (error) {
    // Pass errors to the error-handling middleware
    next(error);
  }
}

export async function createPermission(req, res, next) {
  try {
    // Destructuring data from request body
    const { subject, body, senderId } = req.body;

    // Validate the input data (Optional: You can add more validation logic here)
    if (!subject || !body || !senderId) {
      return res.status(400).json({ message: "Subject, Body, and SenderId are required." });
    }

    // Create a new Permission instance
    const newPermission = new Permission({
      subject,
      body,
      senderId,
    });

    // Save the permission to the database
    await newPermission.save();

    // Respond with the newly created permission
    res.status(201).json({
      message: "Permission created successfully.",
      permission: newPermission,
    });
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
}