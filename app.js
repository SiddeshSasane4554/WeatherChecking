const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
 
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
  });

    app.post("/",function(req,res){
  const query= req.body.cityName;
  const apiKey=" " //API KEY
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit

  https.get(url,function(response){
    console.log(response.statusCode);


    //Parse JSON 
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp
      const weatherDescription=weatherData.weather[0].description
      const feelsLike=weatherData.main.feels_like
      const name1=weatherData.main.name
      const icon=weatherData.weather[0].icon
      const imageURL="http://openweathermap.org/img/wn/"+icon+".png"
      // console.log(temp);
      // console.log(feelsLike);
      // console.log(name1);
      //res.write("</p>The Weather is currently"+feelsLike+"</p>");
      res.write("<h1>The temperature in " +query+" is " +temp+ " degree celcius</h1>");
      res.write("The weather is currently "+weatherDescription);
      res.write("</p>The Weather feels like "+feelsLike+"</p>");
      res.write("<img  src="+imageURL+">");
      res.send()
    })
  })

    })
app.listen(3000,function(){
  console.log("Server started at port 3000")  
})