const { validationResult } = require('express-validator');
const TeamModel = require('../Models/team')
module.exports={
    index: (req, res, next)=> {
      TeamModel.find((err,docs)=>{
        if(err){
          return res.json({error:"Something went wrong!"+err})
        }
        const team=[];
        docs.forEach(element=>{
          team.push({
            name:element.name,
            designation:element.designation,
            image:element.image,
            id:element._id

          })
        })
        res.render('backend/team/index', { title: 'Admin team', layout: 'backend/layout',data:team });

      })


        
      },

      create: (req, res, next)=> {
        res.render('backend/team/create', { title: 'Admin team create', layout: 'backend/layout' });
      },
      
      edit: (req, res, next)=> {
        res.render('backend/team/edit', { title: 'Admin team edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin team delete', layout: 'backend/layout' });
      },

      show: (req, res, next)=> {
        TeamModel.find((err,docs)=>{
          if(err){
              return res.json({error:"Something went wrong!"+err})
          }
          return res.json({team:docs});
      })
        res.render('backend/team/show', { title: 'Admin team show', layout: 'backend/layout' });


        // res.render('index', { title: 'Admin team show' });
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
        }
        let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd=new Date().valueOf();
        let filePath='upload/' +rnd+sampleFile.name;
      
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/'+filePath, function(err) {
          if (err)
            return res.status(500).send(err);
      
          res.send('File uploaded!');
        });



        const team = new TeamModel({
          name: req.body.name,
          image: filePath,
          designation: req.body.designation,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          linked: req.body.linked
        })

        team.save((err,newTeam)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          //return res.json({team:newTeam});
        })



        // res.render('index', { title: 'Admin team store' });
      },

      update: (req, res, next)=> {
        res.render('index', { title: 'Admin team update', layout: 'backend/layout'  });
      },
      
}