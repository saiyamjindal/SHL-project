// const MONGO_DB = process.env.MONGO_DB||require("./config/secrets").MONGO_DB;
const MONGO_DB =require("./config/secret").MONGO_DB;
// const SK = process.env.SK;
var express = require('express')
var app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))
var fs = require('fs')
var path = require('path')
const mongoose = require('mongoose');
mongoose.connect(MONGO_DB, { useNewUrlParser: true });
var session = require('express-session')
var _ = require("lodash")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var bodyParser = require("body-parser")
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const secret = 'abcdefg';

const projectSchema = new Schema({
    title: String,
    technologies: String,
    frontend: String,
    backend: String,
    database: String,
    infrastructure: String
});
 
const project = mongoose.model("Project", projectSchema)

var d;
(async () => {
    d = await project.find({});
    // console.log(d);
    })()



app.get('/', (req, res) => {
    
    console.log(d);

    res.render('index', { pro: d})

})

var spd;
var id;
async function work()
{
    spd = await project.findOne({ _id: id });
}
app.post('/', urlencodedParser, async function (req, res) {
    console.log(req.body.id);

        id=req.body.id;
        (async () => {
            await work();
            })()
        res.redirect('/info')
    })

app.get('/info',async function (req,res) {
    await work();
    console.log("23");
    console.log(spd);
    
    res.render('info',{pro:spd});
})

app.get('/add-proj', function (req, res) {

    res.render("add-proj")
});

app.post('/add-proj', urlencodedParser, async(req, res) => {
    // console.log(req);
    console.log(req.body);
    const projectuser = await project.create({
        title: req.body.title,
        technologies: req.body.technologies,
        frontend : req.body.frontend,
        backend : req.body.backend,
        database : req.body.database,
        infrastructure : req.body.infrastructure
      });
    
      res.redirect('/');
    //   return res.status(200).json(contactuser);
    });





const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server has started at port 3000");
  });