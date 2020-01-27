const { MongoClient }=require('mongodb')
//var mongoUrl=process.env.MONGOLAB_URI
client=new MongoClient('mongodb://localhost:27017/project',{ useNewUrlParser: true })
client.connect()
//accessing database test and then sending  collection accounts
const get_db=()=>{       
        const db=client.db('test')
        return new Promise(function(resolve, reject){
            resolve(db);
        });
    }

async function insert_newLogin(accInfo){
    let val1=get_db()
        .then(db=>db.collection('Accounts'))
        .then(collection=>
            collection.findOne(
                {username:accInfo.username}
            )
        )
        .then(result=>{
            if(result!=='undefined')
                return true
            else{
                return false
            }    
        })
    if(val1)
        return 'username already exists'
    else{
        val1=get_db()
            .then(db=>db.collection('Accounts'))
            .then(collection=>
                collection.insertOne(accInfo))
            .then(result=>{
                console.log('inserted ',result)
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
    
module.export={
    insert_newLogin
}    
    