const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const descriptionRoutes = express.Router();

const PORT = 4999;
let Description = require('./description.model');app.use(cors());

app.use(bodyParser.json());mongoose.connect('mongodb://127.0.0.1:27017/description', { useNewUrlParser: true });
const connection = mongoose.connection;connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

descriptionRoutes.route('/').get(function(req, res) {
    Description.find(function(err, descriptions) {
        if (err) {
            console.log(err);
        } else {
            res.json(descriptions);
        }
    });
});descriptionRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Description.findById(id, function(err, description) {
        res.json(description);
    });
});descriptionRoutes.route('/update/:id').post(function(req, res) {
    Description.findById(req.params.id, function(err, description) {
        if (!description)
            res.status(404).send("data is not found");
        else
            description.name = req.body.name;
            description.title = req.body.title;
            description.desc = req.body.desc;
            description.body = req.body.body;            
            description.save().then(description => {
                res.json('Description updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});descriptionRoutes.route('/add').post(function(req, res) {
    let description = new Description(req.body);
    description.save()
        .then(description => {
            res.status(200).json({'description': 'description added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new description failed');
        });
});app.use('/description', descriptionRoutes);app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});