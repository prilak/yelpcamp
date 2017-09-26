var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dog_app");

var dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    
});

var Dog = mongoose.model("Dog", dogSchema);

var ziggy = new Dog({
    name: "ziggy",
    age: 2
});

//This function adds an object to mongodb
    //  ziggy.save(function(err, dog){
    //      if(err){
    //          console.log("failure to save");
    //      } else {
    //          console.log("saved the dog");
    //          console.log(dog);
    //      }
    //  });

Dog.create({
    name: "tiger",
    age: 14
}, function(err, dog){
    if(err){
        console.log(err);
    } else {
        console.log(dog);
    }
});

//retrieve all dogs from db
Dog.find({}, function(err, dogs){
   if(err){
       console.log("ra roh, you have an error");
       console.log(err);
   } else {
       console.log(dogs);
   }
});