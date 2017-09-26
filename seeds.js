var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   
        name: "Funville", 
        image: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/14344327_161346570981169_7595779781139811905_n.jpg?oh=4ade7dfcb019abc83bb305af9898d4c4&oe=5A5B4CCB",
        description: "Here there be fun"
    },
    {
        name: "Imagination Land",
        image: "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/14344279_161346580981168_665033806323500617_n.jpg?oh=143370668725c657694bbb9dabe0eed1&oe=5A4DB56E",
        description: "Fun place to be"
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("added campground");
                    // create a comment
                    Comment.create({
                        text: "The best",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    });
                }
            });
        });
    });
    //add a few campgrounds
    
}
module.exports = seedDB;