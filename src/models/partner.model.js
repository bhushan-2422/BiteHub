import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const partnerSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        fullname:{
            type: String,
            required: true,

        },
        phone:{
            type:Number,
            required: true,
            unique:true
        },
        earning:{
            type:Number
        },
        location:{
            type:{
                type:String,
                enum:['Point'],
                required: true
            },
            coordinates:{
                type:[Number],
                required: true
            }
        },
        refreshToken:{
            type: String
        },
        accessToken:{
            type: String
        }
    },{
        timestamps: true
    }
)

// userSchema.pre("save",async function(next){
//     if(!this.isModified("password")) return next();
//     this.password =await bcrypt.hash(this.password, 10)
    
// })

// userSchema.methods.isPasswordCorrect = async function
// (password){
//     return await bcrypt.compare(password , this.password)
// }

partnerSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id : this._id,
            phone: this.phone,
            email : this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

partnerSchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Partner = mongoose.model("Partner",partnerSchema)