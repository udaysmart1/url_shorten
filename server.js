//mongod --port 27017 --dbpath=./data
var express=require('express');
var app=express();
var path=require('path');
var mongo = require('mongodb').MongoClient;
var cors = require('cors');
var redirect=require('./redirect');
app.use(cors());
var regexURL=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
var isURL=function(address){
    return address.match(regexURL)!=null;
}
var hasHttp=function(address){
    return address.startsWith("http://")||address.startsWith("https://");
}
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"views","index.html"));
});
app.get("/public/:resource",function(req,res){
    res.sendFile(path.join(__dirname,"public",req.params.resource));
});
app.get("/r/:num",redirect.redirect);
// API call 
app.get("/new/:url(*)",(req,res)=>{
    var link=0;
    if(isURL(req.params.url)){
        var urlreq=req.params.url;
        if(hasHttp(urlreq)==false){
            urlreq="http://"+urlreq;
        }
    mongo.connect(process.env.SECRET,conn);
    function conn(err,client){
        if(err){
            throw err;
        }
        else{
            var db = client.db("gotohell");
            var collectn=db.collection("url");
            collectn.count({},(e,count)=>{
                link=count+1;
                collectn.findOne({
                    url:urlreq
                    }, function (err, docs) {
                    if(err) throw err;
                    else if(!docs){
                        var d={
                            urlToShorten:urlreq,
                            shortenedURL:"https://natural-town.glitch.me/r/"+link
                        };
                        collectn.insertMany([{"url":urlreq,"link":link}],function(err,docs){
                            if(err) throw err;
                        });
                        res.send(d);
                    }
                    else{
                        res.send({
                            urlToShorten:docs.url,
                            shortenedURL:"https://natural-town.glitch.me/r/"+docs.link
                        });
                    }
                  });
            });
        }
        }
    }
    else{
        res.send({error:"Invalid URL entered"});
    }
});
app.listen(process.env.port||3000,function(err){
    console.log("server running");
});