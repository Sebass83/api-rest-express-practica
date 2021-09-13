const usuarios = require('./routes/usuarios.js');
const express = require('express');
const config = require('config');
const morgan = require('morgan');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/usuarios', usuarios)
app.use(express.static('public'));

//Configuracion de entorno
console.log(`Aplicación: ${config.get('nombre')}`);
console.log(`DB Server: ${config.get('configDB.host')}`);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan se encuentra en ejecución...')
}


//Data



app.get('/', (request,response)=> {
    response.send('<h1>RestAPI de prueba 1</h1><h2>Trabajando en ello</h2>');
    
});



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}...`);
})
