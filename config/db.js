const mongoose = require('mongoose');

const conectarBD = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Conectado a base de dados ${conn.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}


module.exports = conectarBD;