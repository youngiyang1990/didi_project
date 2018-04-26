const express = require('express');
const mongoose = require('mongoose');
const Driver = require('./models/driver')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;



mongoose.connect('mongodb://localhost:27017/didi');

const db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success!')
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true }) ); // to support URL-encoded bodies
app.use(bodyParser.text());

app.get('/drivers', (req, res) => {
  Driver.find().sort({'createdAt': -1}).exec(function(err, drivers) {
    if (err) return res.status(500).json({error: err.message})
    res.json({ drivers })
  })
});

app.get('/driver/:id', (req, res) => {
  Driver.find({_id: req.params.id}).exec(function(err, driver) {
    if (err) return res.status(500).json({error: err.message})
    res.json({ driver })
  })
})
app.post('/driver', (req, res) => {
  console.log(req.body)
  const driver = new Driver(JSON.parse(req.body))
  driver.save(function(err){
    if(err) console.log(err)
  })
  res.json({ message: '增加司机成功' });
});

app.put('/driver/:id', function(req, res) {
  if (req.body.name === '') return res.status(400).json({error: '司机名字不能为空'})
  Driver.findById({_id: req.params.id}, function(err, driver) {
    if (err) return res.status(500).json({error:  err.message})
    for (prop in req.body) {
      driver[prop] = req.body[prop]
    }
    driver.save(function(err) {
      if (err) return res.status(500).json({error: err.message})
      res.json({
        message: '司机信息更新成功'
      })
    })
  })
})
app.delete('/driver/:id', function(req, res) {
  Driver.findById({_id: req.params.id}, function(err, driver) {
    if (err) return res.status(500).json({error: err.message})
    driver.remove(function(err){
      if (err) return res.status(500).json({error: err.message})
      res.json({ message: '司机已经删除了！' })
    })
  })
})




app.listen(port, () => console.log(`Listening on port ${port}`));