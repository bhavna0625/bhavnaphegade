var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to Database"))
db.once('open',()=> console.log("Connect to Database"))

app.post("/sign_up", (req,res) => {
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var Gender=req.body.Gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "Gender":Gender,
        "password":password,
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw new Error("");
            ;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_succes.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3020);

console.log("listening on port 3020")