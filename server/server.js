const express = require('express');
const mongoose = require('mongoose');
const Driver = require('./models/driver')
const bodyParser = require('body-parser')
const util = require("util")

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
  Driver.find({isDelete:false}).sort({'createdAt': -1}).skip((req.query.page-1)*req.query.pageSize).limit(parseInt(req.query.pageSize)).exec(function(err, drivers) {
    if (err) {
      console.log(err)
      return res.status(500).json({error: err.message})
    }
    res.json({ drivers })
  })
});

app.get('/all_drivers', (req, res) => {
   Driver.find({isDelete:false}).count()
  .then(
    (count) => {
      res.status(200).json({count})
    }
  )
});

app.get('/driver/:id', (req, res) => {
  Driver.findOne({_id: req.params.id,isDelete:false}).exec(function(err, driver) {
    if (err) return res.status(500).json({error: err.message})
    res.json({ driver })
  })
})
app.post('/driver', (req, res) => {
  Driver.findOne({phone:req.body.params.phone,isDelete:true},function(err,driver){
    if(driver){
      for (prop in req.body.params) {
        driver[prop] = req.body.params[prop]
      }
      driver.isDelete = false
      driver.save(function(error) {
        if (error) return res.status(500).json({error: error.message})
        res.json({
          message: '司机新增成功'
        })
      })
    }else{
      const driver = new Driver(req.body.params)
      driver.isDelete = false
      driver.status = "审查中"
      driver.save(function(error) {
        if (error) return res.status(500).json({error: '增加司机失败'})
        res.json({
          message: '司机新增成功'
        })
      })
        }
      })
    
  });

app.put('/driver/:id', function(req, res) {
  if (req.body.name === '') return res.status(400).json({error: '司机名字不能为空'})
  Driver.findOne({_id: req.params.id,isDelete:false}, function(err, driver) {
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
app.put('/delete_driver/:id', function(req, res) {
  Driver.findById({_id: req.params.id}, function(err, driver) {
    if (err) return res.status(500).json({error:  err.message})
    driver.isDelete = true
    driver.save(function(err) {
      if (err) return res.status(500).json({error: err.message})
      res.json({
        message: '司机删除成功'
      })
    })
  })
})
app.put('/change_driver/:id', function(req, res) {
  Driver.findById({_id: req.params.id}, function(err, driver) {
    if (err) return res.status(500).json({error:  err.message})
    driver.status = req.body.params.status
    driver.save(function(err) {
      if (err) return res.status(500).json({error: err.message})
      res.json({
        message: '司机删除成功'
      })
    })
  })
})

app.get('/search_driver/:phone', function(req, res) {
  Driver.find({phone: req.params.phone}).exec(function(err, drivers) {
    if (err) return res.status(500).json({error: err.message})
    res.json({ drivers })
  })
})

// app.delete('/driver/:id', function(req, res) {
//   Driver.findById({_id: req.params.id}, function(err, driver) {
//     if (err) return res.status(500).json({error: err.message})
//     driver.remove(function(err){
//       if (err) return res.status(500).json({error: err.message})
//       res.json({ message: '司机已经删除了！' })
//     })
//   })
// })




app.listen(port, () => console.log(`Listening on port ${port}`));