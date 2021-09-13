const express = require('express');
const ruta = express.Router();

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

ruta.get('/', (request,response)=> {
    response.send(usuarios);
    
});

ruta.get('/:id', (request,response)=> {
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario) response.status(404).send(`No se encontro el usuario ${request.params.id}`);
    response.send(usuario);
    
    
});
ruta.post('/', (request,response)=> {
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


ruta.put('/:id',(request, response)=>{
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario) {
        response.status(404)
        .send(`No se encontro el usuario ${request.params.id}`)
        return;
    };

    usuario.nombre = request.body.nombre;
    response.send(usuario);
});

ruta.delete('/:id',(request, response)=>{
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

module.exports = ruta;