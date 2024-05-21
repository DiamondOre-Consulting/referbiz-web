import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        require: true,
    },
    phone:{
        type:Number,
        require: true,
    },
    leadfor:{
        type:String,
        require: true,
    },
    summery:{
        type:String,
        require: true,
    },

})

export default mongoose.model('Lead', leadSchema);
