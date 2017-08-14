var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});
//This route currently displays some pictures from facebook
app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "lala land", img: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/18447418_10155226933479882_8139646278294728945_n.jpg?oh=c9bc390855e38405b907b41a2a5ce08d&oe=5A21C26D"},
        {name: "valhala land", img: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/19437364_10155371728984882_2555544258857050120_n.jpg?oh=f6cd50d98a849c34122a7f6a89cf5ee5&oe=59EB7C59"},
        {name: "funville", img: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/19554297_10155387954989882_3118977450117726534_n.jpg?oh=d59be1bfa53789dbe6e6a041f299d69e&oe=5A21A93B"},
        
    ];
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is running");
});