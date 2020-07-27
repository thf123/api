const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')  //密码校验
const jwt = require('jsonwebtoken')  // 生成token
const tuser = require('../../models/Users')
const passport = require('passport')


//test  /api/user/register  注册接口
router.post('/register', (req, res) => {
  tuser.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: '邮箱已存在' })
      } else {
        const newUser = new tuser({
          ...req.body
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        })
      }
    })
})

//test  /api/user/login  登录接口
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  tuser.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(404).json({ msg: '用户不存在' })
      } else {
        //验证密码
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const rule = {
                id: user.id,
                name: user.name
              }
              jwt.sign(rule, 'secret', { expiresIn: 3600 }, (err, token)=> {
                if (err) throw err
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              });
            } else {
              return res.status(400).json('密码错误')
            }
          })
      }
    })
})

//   GET api/users/current
router.get('/current',passport.authenticate("jwt",{session:false}), (req, res)=>{
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})

module.exports = router