import mongoose from "mongoose"

const connectDB = async()=>{
    try{
       mongoose.connection.on('connected',()=>console.log('MongoDb is connected'))
       await mongoose.connect(process.env.MONGODB_URI as string)
    }
    catch(err){
        console.error("Error connecting in MongoDb", err)
    }
}

export default connectDB