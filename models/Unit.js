const mongoose = require("mongoose");

const unit = mongoose.Schema({
    unitNo:{
        type:Number
    },
    unitName:{
        type:String
    }
})

const Unit = mongoose.model('unit', unit);


module.exports = Unit;