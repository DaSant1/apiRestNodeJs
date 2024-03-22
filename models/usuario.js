const {Schema, model}= require('mongoose');

const UsuarioSchema =Schema({
    nombre:{
        type:String,
        required:[true, 'Es necesario ingresar un nombre']
    },
    correo:{
        type:String,
        require:[true,"Es necesario ingresar un correo"]
    },
    password:{
        type:String,
        require:[true,"La contraseña es obligatoria"]
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        rerquire:true
    },
    estado:{
        type:String,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});
UsuarioSchema.method.toJson=function(){
    const {__v, password, ...usuario}=this.toObject();
    return usuario
}

module.exports=model('Usuario',UsuarioSchema);