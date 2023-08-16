const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

const UserData = require('./models/userModel');
const UserProfileData = require('./models/userProfileModel')
const ConnectionData = require('./models/connectionModel')
const DuoConnectionData = require('./models/duoConnectionModel')

const app = express();
const uploadPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static('uploads'));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

//mongodb configuration
const CONNECTION_URL = "mongodb+srv://febinjoseph:febinjoseph111@cluster0.tkguntg.mongodb.net/mydatabase";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch(error => console.log(error.message));

//multer configuration
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, callback) => {
    const uniqueFileName = Date.now() + '-' + file.originalname;
    callback(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });



app.post('/api/register', async (req, res) => {
  console.log(req.body);
  try {
    await UserData.create({
      name: req.body.userName,
      email: req.body.userEmail,
      password: req.body.userPassword,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', error: 'duplicate email' })
  }
});




app.post('/api/login', async (req, res) => {
  console.log(req.body);

  const user = await UserData.findOne({
    email: req.body.userEmail,
    password: req.body.userPassword,
  });

  if (user) {
    const token = jwt.sign({
      userId: user._id,
      name: user.name,
      email: user.email
    }, 'febins secret key')

    return res.json({
      status: 'ok', user: {
        token: token,
        userId: user._id,
        name: user.name,
        email: user.email
      }
    })
    console.log(token);
  } else {
    return res.json({ status: 'error', user: false })
  }
});




app.get('/api/users', async (req, res) => {
  try {
    const users = await UserData.find({}, '_id name email');
    console.log(users);
    res.json({ status: 'ok', users });
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'Failed to retrieve users' });
  }
});



app.post('/api/profileUpdate', upload.single('image'), async (req, res) => {
  try {
    const receivedImage = req.file;
    const receivedDetails = JSON.parse(req.body.details);
  

    await UserProfileData.create({
      photo:receivedImage.filename,
      phone:receivedDetails.personalInfo.phone,
      city:receivedDetails.personalInfo.city,
      age:receivedDetails.personalInfo.age,
      gender:receivedDetails.personalInfo.gender,
      height: receivedDetails.personalInfo.height,
      diet: receivedDetails.personalInfo.diet,
      religion: receivedDetails.personalInfo.religion,
      motherTongue: receivedDetails.personalInfo.motherTongue,
      highestQualification: receivedDetails.educationDetails.highestQualification,
      completion: receivedDetails.educationDetails.completionYear,
      jobRole: receivedDetails.aboutWork.job,
      worksAt: receivedDetails.aboutWork.worksAs,
      yearlyIncome: receivedDetails.aboutWork.yearlyIncome,
      description: receivedDetails.description.aboutYou,
      userInfo: receivedDetails.userInfo.userId,
    });
    res.status(200).json({ message: 'DatconnectedUsera received and processed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error receiving or processing data.' });
  }
});

app.get('/api/profileDatas', async (req, res) => {
  try {
    const profiles = await UserProfileData.find();
    console.log(profiles);
    res.json({ status: 'ok', profiles });
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'Failed to retrieve profiles' });
  }
});

app.post('/api/connections', async (req, res) => {
  try {
    await ConnectionData.create({
      LoggedInUserId: req.body.LoggedInUserId,
      SecondUserId: req.body.SecondUserId,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: "error" })
  }
}); 

app.get('/api/connectionData',async(req,res)=>{
  try{
    const connections = await ConnectionData.find();
    res.json(connections)
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching connection data' });
}
})

app.delete('/api/connections/:id', async (req, res) => {
  try {
    const deletedConnection = await ConnectionData.findByIdAndDelete(req.params.id);

    if (!deletedConnection) {
      return res.status(404).json({ message: 'Connection request not found' });
    }

    res.json({ message: 'Connection request ignored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error ignoring connection request' });
  }
});

app.post('/api/createDuoConnections' , async (req,res) => {
  try {
    await DuoConnectionData.create({
      LoggedInUserId: req.body.LoggedInUserId,
      AcceptingConnectionUser: req.body.AcceptingConnectionUser,
    })

    await ConnectionData.findByIdAndDelete(req.body.connectionId);


    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: "error" })
  }
});

app.get('/api/duoConnectionData', async(req,res)=>{
  try{
    const duoConnections = await DuoConnectionData.find();
    res.json(duoConnections)
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching connection data' });
}
});

app.delete('/api/duoConnections/:id',async (req,res)=>{
  try {
    const deletedConnection = await DuoConnectionData.findByIdAndDelete(req.params.id);

    if (!deletedConnection) {
      return res.status(404).json({ message: 'friend not found' });
    }

    res.json({ message: 'Removed connection succesfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error error removing connection' });
  }
})


app.get('/api/filterAppliedUsers',async(req,res)=>{
  try{
    const { gender, age, religion, motherTongue } = req.query; // Extract filters from query parameters

    // Build a query object based on the provided filters
    const query = {};
    if (gender) query.gender = gender;
    if (age) query.age =  age ; 
    if (religion) query.religion = religion;
    if (motherTongue) query.motherTongue = motherTongue;

    const filterAppliedUsers = await UserProfileData.find(query);
    res.json(filterAppliedUsers);
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching users' });
}
})


app.listen(9000, () => {
  console.log("server started at port 9000")
});