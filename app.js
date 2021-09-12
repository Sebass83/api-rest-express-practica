const express = require('express');
const config = require('config');
const morgan = require('morgan');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

//Configuracion de entorno
console.log(`Aplicación: ${config.get('nombre')}`);
console.log(`DB Server: ${config.get('configDB.host')}`);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan se encuentra en ejecución...')
}


//Data
const usuarios = [
    {id:1, nombre:'Sebastian'},
    {id:2, nombre:'Carlos'},
    {id:3, nombre:'Miguel'},
    {id:4, nombre:'Andres'},
    {id:5, nombre:'Cristian'},
    {id:6, nombre:'Leandro'},
    {id:7, nombre:'Nicolas'},
    {id:8, nombre:'Rogelio'}
]


app.get('/', (request,response)=> {
    response.send('<h1>RestAPI de prueba 1</h1><h2>Trabajando en ello</h2>');
    
});

app.get('/api/usuarios', (request,response)=> {
    response.send(usuarios);
    
});

app.get('/api/usuarios/:id', (request,response)=> {
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario) response.status(404).send(`No se encontro el usuario ${request.params.id}`);
    response.send(usuario);
    
    
});
app.post('/api/usuarios', (request,response)=> {
    const usuario = request.body;
    if(!request.body.nombre){
        response.status(400).send('Debe ingresar Un nombre');
        return;
    };
 
    const newUsuario = {
        id: Math.round(Math.random()*100000),
        nombre: usuario.nombre
    };
    usuarios.push(newUsuario);
    response.send(newUsuario);
});


app.put('/api/usuarios/:id',(request, response)=>{
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario) {
        response.status(404)
        .send(`No se encontro el usuario ${request.params.id}`)
        return;
    };

    usuario.nombre = request.body.nombre;
    response.send(usuario);
});

app.delete('/api/usuarios/:id',(request, response)=>{
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario) {
        response.status(404)
        .send(`No se encontro el usuario ${request.params.id}`)
        return;
    };

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);
    response.send(usuarios)
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}...`);
})
