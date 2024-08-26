import mongoose, { Schema, Document, model, models } from 'mongoose';


// user :- email,username,password,verified code,is verified,verifycode expirytime,messages

export interface User extends Document {
    email: string,
    name: string,
    restroName: string,
    logo: string,
    detailsVerified: boolean,
}


const userSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    restroName: {
        type: String,
        default: ""
        // required: true,
    },
    logo: {
        type: String,
        default: ""
    },
    detailsVerified: {
        type: Boolean,
        default: false
    }


})

const UserModel = (models.User as mongoose.Model<User>) || model<User>('User', userSchema)
export default UserModel


