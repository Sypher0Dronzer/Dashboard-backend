import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the project
    projectLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Reference to the User who leads the project
    },
    tags: { type: [String], default: [] }, // Tags like blockchain, web development, etc.
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Array of Users who are part of the project
      },
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing", // Status of the project
    },
  },
  { timestamps: true } // Automatically include createdAt and updatedAt timestamps
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
