var express = require("express");
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var db = require('../models/index');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
console.log()
app.use(bodyParser.json());

var router = express.Router();
app.use('/api', router);

var secureApi = express.Router();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// index route
app.get('/', (req, res) => {
  res.send('Backend Working');
});

app.post('/doctor', async (req, res) => {
  try {
    await createDoctor(req.body);
    res.status(200).send('created');
  }
  catch ({ message }) {
    console.error(message);
    res.status(500).send('something went wrong');

  }
})
app.get('/doctor/:id', async (req, res) => {
  try {
    const id = req.params.id
    const doctor = await db.doctors.findOne({ where: { id } });
    if (doctor) {
      res.status(200).send(doctor);
    } else {
      res.status(400).send('no record found');
    }
  }
  catch ({ message }) {
    console.error(message);
    res.status(500).send('something went wrong');

  }
})
app.put('/doctor/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name } = req.body;
    await db.doctors.update({ name }, { where: { id } });

    res.status(200).send('done');
  }
  catch ({ message }) {
    console.error(message);
    res.status(500).send('something went wrong');
  }
})

app.post('/speciality', async (req, res) => {
  try {
    await createSpeciality(req.body);
    res.send('saved');
  }
  catch ({ message }) {
    console.error(message);
    res.status(500).send('Something went wrong');
  }
})
app.get('/speciality/:id', async (req, res) => {
  try {
    const specialityId = req.params.id
    const speciality = await db.specialities.findOne({ where: { specialityId } });
    if (speciality) {
      res.status(200).send(speciality);
    } else {
      res.status(400).send('no record found');
    }
  }
  catch ({ message }) {
    console.error(message);
    res.status(500).send('Something went wrong');
  }
})
app.put('/speciality/:id', async (req, res) => {
  try {
    const specialityId = req.params.id
    const { name } = req.body;
    await db.specialities.update({ name }, { where: { specialityId } });
    res.status(200).send('done');
  }
  catch ({ message }) {
    console.error(message);
    res.status(500).send('something went wrong');
  }
})
var ApiConfig = {
  app: app
}

const createDoctor = async ({ name, Speciality }) => {
  try {
    await db.doctors.create({ name });
    return true;
  } catch (err) {
    throw err;
  }
}

const createSpeciality = async ({ name }) => {
  try {
    await db.specialities.create({ name });
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = ApiConfig;
