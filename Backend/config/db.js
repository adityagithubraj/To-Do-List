 
const mongoose= require("mongoose");
require("dotenv").config();

//................. conect to db...........//

const connection =mongoose.connect(process.env.URL);


module.exports=connection





