const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DriverSchema = new Schema({
  name:{ type: String }, //名字
  sex:{ type: String }, //性别
  idNumber:{ type: String },  //身份证号码
  idAddress:{ type: String }, //身份证住址
  stayAdress:{ type: String  }, //居住证住址
  licenseType:{ type: Array }, //驾驶证类型
  licenseDate:{ type: Date }, //初领驾驶证日期  
  status:{ type: String },  //考试状态
  phone:{ type: Number, unique: true }, //本人手机号码
  isDelete:{ type: Boolean }, //软删除
},
{ timestamps: true }
)

module.exports = mongoose.model('Driver',DriverSchema)