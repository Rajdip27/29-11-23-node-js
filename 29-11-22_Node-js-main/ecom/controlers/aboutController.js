const { validationResult } = require('express-validator');
const AboutModel = require('../Models/about')

module.exports={
    index: (req, res, next)=> {

      AboutModel.find((err,docs)=>{
        if(err){
            require.res.json({error:"Something Went Worng!"+err});
        }
        const about=[];
        docs.forEach(element=>{
          about.push({
                title:element.title1,
                details:element.details,
                image:element.image,
                id:element._id
            });
        });
        res.render('backend/about/index', { title: 'Admin about', layout: 'backend/layout',data:about });
    });

      },

      create: (req, res, next)=> {
        res.render('backend/about/create', { title: 'Admin blog create', layout: 'backend/layout'});
      },
      
      edit: (req, res, next)=> {
        res.render('backend/about/edit', { title: 'Admin blog edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin blog delete' , layout: 'backend/layout'});
      },

      show: (req, res, next)=> {
        
        AboutModel.findById(req.params.id)
        .then((about)=>{
           
            const details={
                title:about.title1,
                details:about.details,
                image:about.image
            }
            // console.log(details);
            res.render('backend/about/show', { title: 'About',layout:"backend/layout",blog:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })
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

        const about = new AboutModel({
          image: filePath,
          title1: req.body.title1,
          title2: req.body.title2,
          details: req.body.details,
          map: req.body.map
        })

        about.save((err,newAbout)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          //return res.json({about:newAbout});
        })

        // return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },



      update: (req, res, next)=> {
        res.render('index', { title: 'Admin blog update' , layout: 'backend/layout'});
      },
      
}