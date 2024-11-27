import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Permission schema
const permissionSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user's ObjectId
      ref: 'User', // Assuming you have a 'User' model
      required: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      enum: ['Project Joining Request', 'Admin Role Request', 'Manager Role Request'],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create and export the model
const Permission = model('Permission', permissionSchema);
export default Permission;
