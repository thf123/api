const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport')
//引入mongodb数据模型
const profiles = require('../../models/Profiles')

//测试           /api/profiles/test
router.get('/test',  (req, res)=>{
  res.json({msg:'profiles'})
})        
//新增数据   /api/profiles/add
router.post('/add', /*passport.authenticate("jwt",{session:false}),*/ (req, res)=>{
    const newprofiles = {}

    if(req.body.type) newprofiles.type = req.body.type
    if(req.body.title) newprofiles.title = req.body.title
    if(req.body.desc) newprofiles.desc = req.body.desc
    if(req.body.author) newprofiles.author = req.body.author
	if(req.body.identity) newprofiles.identity = req.body.identity
    new profiles(newprofiles).save().then((profile)=>{
        res.json(profile)
    })
})
//获取所有  /api/profiles
router.get('/', /*passport.authenticate("jwt",{session:false}),*/ (req, res)=>{
    profiles.find()
            .then(profile=>{
                res.json(profile)
            })
            .catch(err=> console.log(err))
})
//获取单个  /api/profiles/:id
router.get('/:id', /* passport.authenticate("jwt",{session:false}), */ (req, res)=>{
    profiles.findOne({_id: req.params.id })
            .then(profile=>{
                res.json(profile)
            })
            .catch(err=> console.log(err))
})
//修改    /api/profiles/edit
router.post('/edit/:id', /* passport.authenticate("jwt",{session:false}), */ (req, res)=>{
    const newprofiles = {}

    if(req.body.type) newprofiles.type = req.body.type
    if(req.body.title) newprofiles.title = req.body.title
    if(req.body.desc) newprofiles.desc = req.body.desc
    if(req.body.author) newprofiles.author = req.body.author
	if(req.body.identity) newprofiles.identity = req.body.identity
	
    profiles.findOneAndUpdate({_id: req.params.id }, { $set: newprofiles}, {new: true})
            .then(profile=>{
                res.json(profile)
            })
            .catch(err=> console.log(err))
})
//删除    /api/profiles/delete
router.delete('/delete/:id', /*passport.authenticate("jwt",{session:false}),*/ (req, res)=>{
    profiles.findOneAndDelete({_id: req.params.id })
            .then(profile=>{
                profiles.save().then(profile=> res.json(profile))
            })
            .catch(err=> console.log(err))
})

module.exports = router