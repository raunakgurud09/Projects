const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const https = require("https");
const { query } = require("express");

app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  //   console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "ac1674cc3c42d8d7a184d40d85e6755c";
  const unit = 'metric';
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in " +query+ " is " + temp + " celcious</h1>");
      res.write("<p>The weather is currently" + weatherDescription + "</p>");
      res.write("<img src=" + iconLink + ">");
      res.send();
    });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is listing on port ${port}`);
});
