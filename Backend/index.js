//...................Import model.................//

const express =require("express");
const connection = require("./config/db")
const cors =require("cors")
const app =express();
const {userRouter}=require("./routes/user.route")
const {router}=require("./routes/ToDo.route")
const {authenticate}=require("./middleware/auth.js")

app.use(express.json());
app.use(cors());
const port=process.env.PORT||6060;

app.get("/",(req,res)=>{
    res.send("hello  todo")
})

app.use("/api",userRouter)
app.use("/api",router)


//...............run server ...................//

app.listen(port,()=>{
    try {
        connection
        console.log("conected to DB");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`port runig ${port}`);
})