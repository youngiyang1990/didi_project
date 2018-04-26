const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
  username:{ type: String, unique: true },
  password:{ type: String },
  admin:{ type: Boolean },
},
{ timestamps: true }
)

module.exports = mongoose.model('User',UserSchema)