const mongoose = require("mongoose")

const invoiceDetails = mongoose.Schema({
    lineNo:{
        type:Number
    },
    productName:{
        type:String,
        maxlength:100
    },
    UnitNo:{
        type:Number,
    },
    unit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"unit"
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    total:{
        type:Number
    },
    expireDate:{
        type:Date
    }
})

const InvoiceDetails = mongoose.model('invoice-details', invoiceDetails);
module.exports = InvoiceDetails;