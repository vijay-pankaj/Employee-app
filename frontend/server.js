const multer = require("multer");
const path = require("path");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage });

// Update your signup route to handle the image upload
router.post("/signup", upload.single("image"), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  // Create user logic
  const user = new User({
    name,
    email,
    mobile,
    designation,
    gender,
    course,
    image: req.file.path, // Store the image path in the database
  });

  // Continue with your existing user creation logic...
});
