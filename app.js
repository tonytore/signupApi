const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express()

app.use(express.static("public"))

//parse request to bodyparser--allows us to serialize the data ane access the form data using body property
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', function(req,res){
    res.sendFile(__dirname + '/signup.html')
})



app.post('/', function(req, res){
    const fname = req.body.Fname;
    const lname = req.body.Lname;
    const email = req.body.Email;
    
    const  data = {
        members:[
            {
            email_address: email,
            status: "subscribed", 
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
            
        }
    ]
    }

    const jsonData = JSON.stringify(data)

    
    const url = "https://us9.api.mailchimp.com/3.0/lists/e7d66f3a6a"
    const options = {
        method:"POST",
        auth:"tonytor:2c2651270dbc1678c7fa22105f2daa2c-us9"
    }


    const request = https.request(url, options, function(response){
          if(response.statusCode === 200){
            res.sendFile(__dirname + '/succuss.html')
            console.log("awosome");
          }else{
            res.sendFile(__dirname + '/failure.html') 
            console.log("error happen");
          }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end()

})

app.post('/failure', function(req,res){
    res.redirect("/")
})

app.listen(3000, ()=>{
    console.log(`server listening on port http://localhost:3000`);
})

//api_key
//d684e67a9b09531f12ab41b02a19902c-us8
//2c2651270dbc1678c7fa22105f2daa2c-us9

//list_id
//e7d66f3a6a