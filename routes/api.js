'use strict';
const express     = require('express');
let app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

require('dotenv').config();

module.exports = function (app) {

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
let issueSchema = new mongoose.Schema({
  projectname: String,
  issue_title: String,
  issue_text: String,
  created_by: String,
  assigned_to: String,
  status_text: String,
  created_on: String,
  updated_on: String,
  open: String
})
let Issue = mongoose.model('Issue',issueSchema);
 let responseObj = {}; 

    app.route('/api/issues/:project').get(function (req, res){
      let project = req.params.project;
       if(req.query){
         Issue.find(req.query,function(err,data){
           if(err) return console.log(err);
           res.json(data);
         })
       }
    })
    
    app.route('/api/issues/:project').post(function (req, res){ 
      let responseObj = {}; 
       if(req.body.issue_text==''|| req.body.issue_title=='' || req.body.created_by==''){
         res.json("error:'required field(s) missing'");
       }else{
         var currentdate = new Date(); 
          var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
         let assignedto= req.body.assigned_to;
         let statustext= req.body.status_text;
         if(req.body.assigned_to==''){
           assignedto= "";
         }
         if(req.body.status_text==''){
           statustext= "";
         }
       var savedIssue = new Issue({projectname: req.params.project, issue_title:req.body.issue_title, issue_text:req.body.issue_text, created_by: req.body.created_by, assigned_to: assignedto,status_text: statustext, created_on:datetime, updated_on: datetime, open:true})
       savedIssue.save(function(err,data){
         if (err) return console.log(err);
         res.json(data);
       })
       }
    })
    
       app.route('/api/issues/:project').put(function (req, res){
      let project = req.params.project;
      if(req.body._id==''){
        res.json("error: 'missing _id'");
      }
      if(Boolean(req.body.issue_text)||Boolean(req.body.issue_title)|| Boolean(req.body.created_by)|| Boolean(req.body.assigned_to)|| Boolean(req.body.status_text) || Boolean(req.body.open)){
        Issue.findByIdAndUpdate(req.body._id, req.body,{new:true},(err,updateddata)=>{
          res.json(updateddata);
        })
      }else{
       let responseObj1 ={}
        responseObj1['error']='no update field(s) sent';
        responseObj1['_id']= req.body._id;
        res.json(responseObj1);
      }
    })
    
     app.route('/api/issues/:project').delete(function (req, res){
      let project = req.params.project;
      if(req.body._id==''){
        res.json("error: 'missing _id'");
      }
       Issue.findByIdAndDelete(req.body._id,(err,data)=>{
         if (err){
           res.json(err)
         }
         res.json("Item deleted");
       })
    });
    
};
