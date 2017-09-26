var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var seedDB = require("./seeds");
// var Comment = require("./models/comment");
// var User = require("./models/user");
mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});

seedDB();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});
// var campgrounds = [
//     {   
//         name: "lala land", 
//         img: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/18447418_10155226933479882_8139646278294728945_n.jpg?oh=c9bc390855e38405b907b41a2a5ce08d&oe=5A21C26D"},
//         description: "fun place"
//     {   
//         name: "valhala land", 
//         img: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/19437364_10155371728984882_2555544258857050120_n.jpg?oh=f6cd50d98a849c34122a7f6a89cf5ee5&oe=59EB7C59"},
//         description: "fun place"
//     {
//         name: "funville", 
//         img: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/19554297_10155387954989882_3118977450117726534_n.jpg?oh=d59be1bfa53789dbe6e6a041f299d69e&oe=5A21A93B"},
//         description: "fun place"
// ];
//This route currently displays some pictures from facebook
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgroundsMongo){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: campgroundsMongo});       
        }
    });   
    
});
//create
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    //campgrounds.push({name: name, img: image});
    Campground.create({
        name: name, 
        img: image,
        description: desc
    }, function(err, newObject){
        if(err){
            console.log(err);
        } else {
            console.log("successfully added");
        }
    });
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new", function(req, res) {
    
    res.render("campgrounds/new");
});
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//-------------------
// COMMENTS
//-------------------

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});            
        }
    });
});
app.post("/campgrounds/:id/comments", function(req, res){
    //look up camground
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment)
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id)
                }
            });

        }
    });
});
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is running");
});