// API backend =======================================================
var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var app = express()
var REST_PORT = 8080
const https = require('https');
const config = require('./config');
const base_url = config.base_url
const secret_key = config.secret_key

app.use(express.static("build"))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  )
  
  next()
})

function getColdChart(symbol, largeBody, res){
  let onedayChartUrl = base_url+'stable/stock/'+symbol+'/chart/1d?token='+secret_key
    let fivedayChartUrl = base_url+'stable/stock/'+symbol+'/chart/5d?token='+secret_key
    let onemonthChartUrl = base_url+'stable/stock/'+symbol+'/chart/1m?token='+secret_key
    let oneyearChartUrl = base_url+'stable/stock/'+symbol+'/chart/1y?token='+secret_key
    let fiveyearChartUrl = base_url+'stable/stock/'+symbol+'/chart/5y?token='+secret_key
    let maxChartUrl = base_url+'stable/stock/'+symbol+'/chart/max?token='+secret_key
    let result = {}
    new Promise((resolve, reject) =>{
      https.get(onedayChartUrl, res1 => {
        if(res1.statusCode==404)
            reject(res1.statusCode)
        else{
              let body = "";
              res1.on("data", data => {
              body += data;
              });
              res1.on("end", () => {
              body = JSON.parse(body);
              
              resolve(body)
              });
            }
      })
    })
    .then((data) =>{
      result.oneday = data
      return new Promise((resolve, reject) =>{
        https.get(fivedayChartUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data) =>{
      result.fiveday = data
      return new Promise((resolve, reject) =>{
        https.get(onemonthChartUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data)=>{
      result.onemonth = data
      return new Promise((resolve, reject) =>{
        https.get(oneyearChartUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data)=> {
      result.oneyear = data
      return new Promise((resolve, reject) =>{
        https.get(fiveyearChartUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data)=>{
      result.fiveyear = data
      return new Promise((resolve, reject) =>{
        https.get(maxChartUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
      
    })
    .then((data)=>{
      result.max = data 
      largeBody.coldcharts = result
      res.send(largeBody)
    })

}

app.get("/tradehotdetails/:request", function (req, res) {
    const request = JSON.parse(req.params.request)
    let symbol = request.symbol
    let quoteUrl= base_url+'stable/stock/'+symbol+'/quote?token='+secret_key
    let tradayChartUrl= base_url+'stable/stock/'+symbol+'/intraday-prices?token='+secret_key
    let newsUrl = base_url+'stable/stock/'+symbol+'/news/last/5?token='+secret_key
    let statsUrl= base_url+'stable/stock/'+symbol+'/stats?token='+secret_key
    let result = {}

    new Promise((resolve, reject) =>{
      https.get(quoteUrl, res1 => {
        if(res1.statusCode==404)
            reject(res1.statusCode)
        else{
              let body = "";
              res1.on("data", data => {
              body += data;
              });
              res1.on("end", () => {
              body = JSON.parse(body);
              
              resolve(body)
              });
            }
      })
    })
    .then((data) =>{
      
      result.price = data.latestPrice,
      result.priceChange = data.change,
      result.priceChangePercent = data.changePercent
      return new Promise((resolve, reject) =>{
        https.get(tradayChartUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data)=>{
      result.chart = data
      res.send(result)
      
    })
    
  })


  app.get("/normalhotdetails/:request", function (req, resolve) {
    const request = JSON.parse(req.params.request)
    let symbol = request.symbol
    let newsUrl = base_url+'stable/stock/'+symbol+'/news/last/5?token='+secret_key
    
    https.get(newsUrl, res => {
        if(res.statusCode==404)
            resolve.status(404).send('Stock not found');
        else{
              //res.setEncoding("utf8");
              let body = "";
              res.on("data", data => {
              body += data;
              });
              res.on("end", () => {
              body = JSON.parse(body);
              
              resolve.send(body)
              });
            }
        
      });
  })

  app.get("/normalcolddetails/:request", function (req, res) {
    const request = JSON.parse(req.params.request)
    let symbol = request.symbol
    let range = request.range
    let quoteUrl= base_url+'stable/stock/'+symbol+'/quote?token='+secret_key
    let historicalChartUrl = base_url+'stable/stock/'+symbol+'/chart/'+range+'?token='+secret_key
    let overviewUrl = base_url+'stable/stock/'+symbol+'/company?token='+secret_key
    let peerUrl = base_url+'stable/stock/'+symbol+'/peers?token='+secret_key
    let newsUrl = base_url+'stable/stock/'+symbol+'/news/last/5?token='+secret_key
    let statsUrl= base_url+'stable/stock/'+symbol+'/stats?token='+secret_key
    let result = {}
    new Promise((resolve, reject) =>{
      https.get(quoteUrl, res1 => {
        if(res1.statusCode==404)
            reject(res1.statusCode)
        else{
              let body = "";
              res1.on("data", data => {
              body += data;
              });
              res1.on("end", () => {
              body = JSON.parse(body);
              
              resolve(body)
              });
            }
      })
    })
    .then((data) =>{
      result = data
      return new Promise((resolve, reject) =>{
        https.get(historicalChartUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data) =>{
      result.chart = data
      return new Promise((resolve, reject) =>{
        https.get(overviewUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data)=>{
      result.overview = data
      return new Promise((resolve, reject) =>{
        https.get(newsUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data)=> {
      result.news= data
      return new Promise((resolve, reject) =>{
        https.get(statsUrl, res1 => {
          if(res1.statusCode==404)
              reject(res1.statusCode)
          else{
                let body = "";
                res1.on("data", data => {
                body += data;
                });
                res1.on("end", () => {
                body = JSON.parse(body);
                
                resolve(body)
                });
              }
        })
      })
    })
    .then((data)=>{
      result.stats = data
      getColdChart(symbol, result, res)
      
    })
    
    
  })

  app.get("/possiblesymbol/:request", function (req, res) {
    const request = req.params.request
    
    let possibleUrl = base_url+'stable/search/'+request+'?token='+secret_key
    new Promise((resolve, reject) =>{
      https.get(possibleUrl, res1 => {
        if(res1.statusCode==404)
            reject(res1.statusCode)
        else{
              let body = "";
              res1.on("data", data => {
              body += data;
              });
              res1.on("end", () => {
              body = JSON.parse(body);
              
              resolve(body)
              });
            }
      })
    })
    .then((data) =>res.send(data))
    .catch((err)=> console.error(err.message))
  })

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"))
})

app.listen(REST_PORT)
console.log("Express server listening on http://localhost:"+REST_PORT)


