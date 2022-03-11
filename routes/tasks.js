var express = require('express');
// using express Router
var router = express.Router();

// Loading MongoJS
var mongojs = require('mongojs');
// specifing db path
var db = mongojs('mongodb://umar:umar123@ds127954.mlab.com:27954/mytasklist', ['tasks']);

// Get all Tasks
router.get('/tasks', function(req, res, next){
//   res.send('INDEX PAGE'); // to output a string
//    res.render('tasks.html'); // To render a Page
    db.tasks.find(function(err, tasks){
        if (err){
            res.send(err);
        }
        res.json(tasks);
    });
});


// Get One Task
router.get('/task/:id', function(req, res, next){

    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if (err){
            res.send(err);
        }
        res.json(task);
    });
});

// Post (Save) One Task
router.post('/task', function(req, res, next){

    var task = req.body;
    if (!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else {
        db.tasks.save(task, function(err, next){
            if (err){
                res.send(err);
            }
            else{
                res.json(task);
            }
        });
    }
});

// Delete a Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if (err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update a Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updateTask = {};

    if (task.isDone){
        updateTask.isDone = task.isDone;
    }
    if (task.title){
        updateTask.title = task.title;
    }
    if (!updateTask){
        res.status(400);
        res.json({
            "error": "bad data"
        });     
    }
    else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {},function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }
});


module.exports = router;