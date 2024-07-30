var mongo = require('mongodb').MongoClient;
function redirect(req,res){
    mongo.connect(process.env.SECRET,conn);
    function conn(err,client){
        if(err){
            throw err;
        }
        else{
            var db = client.db("gotohell");
            var collectn=db.collection("url");
            collectn.findOne({
                link:Math.round(req.params.num)
            },function(err,doc){
                if(err) {
                    console.log("error: "+err.msg);
                }
                else if(doc){
                    console.log(JSON.stringify(doc));
                    res.redirect(301,doc.url);
                }
                else{
                    console.log(doc);
                    res.send("<h2>URL doesnot exist</h2>");
                }
            });
        }
        client.close();
    }
}
module.exports={"redirect":redirect};