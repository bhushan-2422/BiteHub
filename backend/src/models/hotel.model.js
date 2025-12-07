import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const hotelSchema = new Schema(
    {
        name:{
            type:String,
            required: true
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
        hotelAvatar:{
            type:String,
            required:true
        },
        phone:{
            type: Number,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type:String,
            required:true
        },
        rating:{
            type: Number,
            min: 0,
            max: 5,
        },
        menu:[
            {
                type: Schema.Types.ObjectId,
                ref: "Item"
            }
        ]

    },
    {
        timestamps:true
    }
)

hotelSchema.pre("save",async function(){
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)  
})

hotelSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(this.password, password)
}


hotelSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id : this._id,
            phone: this.phone,
            email : this.email,
            name: this.fullname,
            password: this.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

hotelSchema.methods.generateRefreshToken =  function(){
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

export const Hotel = mongoose.model("Hotel",hotelSchema)