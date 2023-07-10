import mongoose from "mongoose";
const Schema = mongoose.Schema;

const accountSchema = new Schema ({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName:String,
    email: String,
    password: String,
    avatar: {type:String, default: 'https://as1.ftcdn.net/v2/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg'},
    createdAt:{type:Date, default:Date.now},   
})

export default mongoose.model('Account',accountSchema);