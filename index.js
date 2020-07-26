var express = require('express');
var app = express()
const bodyParser = require('body-parser');
var MongoClient = require('mongoose')
const passport = require("passport");
const users = require('./routes/api/user')
const profiles = require('./routes/api/profiles')
const URL = 'mongodb+srv://test:test$1234@cluster0.paaaj.mongodb.net/test?retryWrites=true&w=majority'

MongoClient.connect(URL, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => { console.log('sss') })
  .catch((err) => {console.log(err)})


app.get('/', function (req, res) {
  res.send('Hello World');
})

//使用bodyparser 进行post
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(passport.initialize());     //passport初始化

require("./config/passport")(passport)


app.use('/api/users', users)
app.use('/api/profiles', profiles)


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})