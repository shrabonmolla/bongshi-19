const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs'); // ✅ Needed to check/create upload folder
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 // ✅ Make uploads publicly accessible


// MongoDB connection
mongoose.connect('mongodb+srv://formman:formman007@cluster0.xjqnh.mongodb.net/form-to-mongodb?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB error:', err));

// Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: String,
  department: String,
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  phone: String,
  school: String,
  college: String,
  presentAddress: String,
  permanentAddress: String,
  busStopage: {
    type: String,
    enum: [
      "Jagannath University",
      "Gulisthan",
      "Shahbag",
      "Bata Signal Bus Stop",
      "Elephant Road",
      "Kalabagan",
      "Shyamoli",
      "Technical",
      "Gabtoli",
      "Hemayetpur",
      "Savar Bus Stand",
      "Nobinagar",
    ]
  },
  photo: String,
  facebook: {  // Add new field for Facebook link
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // ✅ Ensure directory exists
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname); // Keeps original name
  }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// posting from data
app.post('/submit', upload.single('photo'), async (req, res) => {
  try {
    const { name, department, bloodGroup, phone, school, college, presentAddress, permanentAddress, busStopage, facebook } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Save full file path

    const newUser = new User({
      name,
      department,
      bloodGroup,
      phone,
      school,
      college,
      presentAddress,
      permanentAddress,
      busStopage,
      photo,
      facebook  // Save the Facebook link
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: '✅ User saved successfully',
      user: savedUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Failed to save user', error: err.message });
  }
});

//reading all data
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json({ users });
    } catch (err) {
      res.status(500).json({ message: '❌ Failed to fetch users' });
    }
  });  

// Start server
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
