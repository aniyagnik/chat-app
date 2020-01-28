const { MongoClient }=require('mongodb')
//var mongoUrl=process.env.MONGOLAB_URI
var mongoUrl="mongodb+srv://password:username@cluster1-yci5f.mongodb.net/test?retryWrites=true&w=majority"
client=new MongoClient(mongoUrl || 'mongodb://localhost:27017/project',{ useNewUrlParser: true },{ useUnifiedTopology: true })
client.connect()
//accessing database test and then sending  collection accounts
const get_db=()=>{       
        const db=client.db('test')
        return new Promise(function(resolve, reject){
            resolve(db);
        });
    }

async function edit_loginAccount(accInfo){
    let profile={}
    let val1=await get_db()
        .then(db=>db.collection('Accounts'))
        .catch(err=>{
            console.log('error in collection ',err)
            return false    
        })
        .then(collection=>
            collection.findOne(
                {id:accInfo.id}
            )
        )
        .then(result=>{
            if(result!=='undefined'){
                profile=result
                return true
            }    
            else{
                return false
            }    
        })
        .catch(err=>{
            console.log('error in finding ',err)
            return false    
        })
    console.log('value of val1 ',val1)    
    if(val1){
        val1= await get_db()
            .then(db=>db.collection('Accounts'))
            .catch(err=>{
                console.log('error in collection 2 ',err)
                return false    
            })
            .then(collection=>
                collection.updateOne(
                    {id:accInfo.id},
                    {
                        $set : {online:true}
                    }
                )
            )
            .then(result=>{
                console.log('status updated ',result.message)
                if(result!=='undefined')
                    return true
                else{
                    return false
                }    
            })
    }
    else{
        val1=get_db()
            .then(db=>db.collection('Accounts'))
            .catch(err=>{
                console.log('error in collection 3 ',err)
                return false    
            })
            .then(collection=>
                collection.insertOne(accInfo))
            .then(result=>{
                console.log('inserted ',result.opts.documents[0])
                if(result!=='undefined')
                    return true
                else{
                    return false
                }    
            })
    }
    if(val1)
        return 'you signed-up in sucessfully'        
    else
        return 'unidentified error occured. try after sometime...'    
}

module.exports={
    edit_loginAccount
}    
    