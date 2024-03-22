const mongoose= require('mongoose');

const dbConnection = async() =>{

    try{

        await mongoose.connect(process.env.MONGOCNN || config.connectionString)
    }catch(Error){
        console.log('Error a la hora de iniciar el servidor')
        console.log('Error tipo: ',Error);
    }
}

module.exports={
    dbConnection
}