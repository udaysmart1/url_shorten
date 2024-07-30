var mongo = require('mongodb').MongoClient;
function connect(){
var collectn;
    mongo.connect('mongodb://rajat:rknrkn@ds029725.mlab.com:29725/gotohell',(err,client)=>{
        if(err){
            throw err;
        }
        else{
            var db = client.db("gotohell");
            collectn=db.collection("url");
        }
    });
    return collectn;
}
module.exports={"connect":connect};