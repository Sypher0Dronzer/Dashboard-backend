route.get("/users", async(req,res,next)=>{
    const permissions=[
        {
          "senderId": "6743585521c8b340c7621de2",
          "subject": "Admin Role Request",
          "body": "I am interested in taking up an admin role."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e7f",
          "subject": "Manager Role Request",
          "body": "Hoping to assist as a project manager."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e8b",
          "subject": "Project Joining Request",
          "body": "Please allow me to join this project."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e8f",
          "subject": "Admin Role Request",
          "body": "Looking forward to managing this project."
        },
        {
          "senderId": "6743585521c8b340c7621de8",
          "subject": "Project Joining Request",
          "body": "Requesting permission to join the team."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e91",
          "subject": "Manager Role Request",
          "body": "Excited to be part of the team as an admin."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e8d",
          "subject": "Project Joining Request",
          "body": "Would love to contribute as an admin."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e73",
          "subject": "Admin Role Request",
          "body": "Hoping to assist as a project manager."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e95",
          "subject": "Project Joining Request",
          "body": "Please allow me to join this project."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e75",
          "subject": "Admin Role Request",
          "body": "I am interested in taking up an admin role."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e77",
          "subject": "Manager Role Request",
          "body": "Requesting permission to join the team."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e81",
          "subject": "Project Joining Request",
          "body": "Looking forward to managing this project."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e87",
          "subject": "Admin Role Request",
          "body": "Excited to be part of the team as an admin."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e83",
          "subject": "Manager Role Request",
          "body": "Would love to contribute as an admin."
        },
        {
          "senderId": "67459078af8bc9374e4ebb43",
          "subject": "Project Joining Request",
          "body": "Hoping to assist as a project manager."
        },
        {
          "senderId": "6743585521c8b340c7621de2",
          "subject": "Admin Role Request",
          "body": "Please allow me to join this project."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e97",
          "subject": "Project Joining Request",
          "body": "I am interested in taking up an admin role."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e79",
          "subject": "Manager Role Request",
          "body": "Requesting permission to join the team."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e85",
          "subject": "Admin Role Request",
          "body": "Looking forward to managing this project."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e89",
          "subject": "Project Joining Request",
          "body": "Excited to be part of the team as an admin."
        },
        {
          "senderId": "6743585521c8b340c7621dec",
          "subject": "Manager Role Request",
          "body": "Would love to contribute as an admin."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e93",
          "subject": "Admin Role Request",
          "body": "Hoping to assist as a project manager."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e7b",
          "subject": "Project Joining Request",
          "body": "Please allow me to join this project."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e71",
          "subject": "Manager Role Request",
          "body": "I am interested in taking up an admin role."
        },
        {
          "senderId": "67435ac0e96f1dc797d35e83",
          "subject": "Admin Role Request",
          "body": "Requesting permission to join the team."
        }
      ]
      const savedPermissions = [];

    for (const permission of permissions) {
      const { body, senderId, subject } = permission;
      const newPermission = new Permission({ body, senderId, subject });
      const savedPermission = await newPermission.save();
      savedPermissions.push(savedPermission);
    }

    // Send all saved permissions in the response
    return res.json({ success: true, permissions: savedPermissions });
      
});