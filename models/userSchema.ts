import mongoose, { Document } from "mongoose";

interface user{
    email:string;
    password:string;
    refreshToken:string
}

const userSchema = new mongoose.Schema<user & Document>({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
})

export default mongoose.model("userSchema", userSchema);