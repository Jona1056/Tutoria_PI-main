const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Usuario = require("./models/usuario");
const Publicacion = require("./models/publicaciones");
const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(bodyParser.json()); //  parsea el cuerpo de las peticiones HTTP

let listaUsuarios = [];
let listaPublicaciones = [];
let usuario1 = new Usuario("Juan", "2019", "1234");
let publicacion1 = new Publicacion("Primer Publicacion","Divertido")
publicacion1.aumentarMeGusta();
publicacion1.agregarComentario("Comentario 1");
listaPublicaciones.push(publicacion1);
listaUsuarios.push(usuario1);

app.get("/usuarios", (req, res) => {
  res.json(listaUsuarios);
});

app.get("/publicaciones", (req,res)=>{
  res.json(listaPublicaciones);
})

// Ruta para obtener un usuario por su número de carné
app.get("/usuarios/:numeroCarnet", (req, res) => {
  const numeroCarnet = req.params.numeroCarnet;
  const usuario = listaUsuarios.find(
    (user) => user.numeroCarnet === numeroCarnet
  );
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

// Ruta para crear un nuevo usuario
app.post("/crear-usuario", (req, res) => {
  console.log(req.body);
  const { nombre, numeroCarnet, contraseña } = req.body;
  const nuevoUsuario = new Usuario(nombre, numeroCarnet, contraseña);
  listaUsuarios.push(nuevoUsuario);
  res.status(201).send("Usuario creado exitosamente");
});





// Ruta para actualizar un usuario existente
app.put("/usuarios/:numeroCarnet", (req, res) => {
  const numeroCarnet = req.params.numeroCarnet;
  const { nombre, contraseña } = req.body;
  const usuarioIndex = listaUsuarios.findIndex(
    (user) => user.numeroCarnet === numeroCarnet
  );
  if (usuarioIndex !== -1) {
    listaUsuarios[usuarioIndex].nombre = nombre;
    listaUsuarios[usuarioIndex].contraseña = contraseña;
    res.send("Usuario actualizado exitosamente");
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

// Ruta para eliminar un usuario
app.delete("/usuarios/:numeroCarnet", (req, res) => {
  const numeroCarnet = req.params.numeroCarnet;
  listaUsuarios = listaUsuarios.filter(
    (user) => user.carnet !== numeroCarnet
  );
  console.log(listaUsuarios);
  res.send("Usuario eliminado exitosamente");
});

// Ruta para validar si un usuario y contraseña son válidos
app.post("/validar-usuario", (req, res) => {
  const { numeroCarnet, contraseña } = req.body;
  const usuario = listaUsuarios.find(
    (user) => user.carnet === numeroCarnet && user.contraseña === contraseña
  );
  if (usuario) {
    res.status(200).json({ mensaje: "Usuario valido" });
  } else {
    res.status(200).json({ mensaje: "Usuario o contraseña incorrectos" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
//cargar usuarios
app.post("/cargar_usuarios", (req,res) =>{
  const usuarios = req.body;
  console.log(usuarios)
  //recorrer json
  usuarios.forEach(usuario => {
    const {nombre, carnet, contraseña} = usuario;
    const nuevoUsuario = new Usuario(nombre, carnet, contraseña);
    listaUsuarios.push(nuevoUsuario);
  });
  res.send("Usuarios cargados exitosamente");
});

//aumentar me gusta
app.put('/meGusta/:index', function(req, res) {
  const index = req.params.index;
  listaPublicaciones[index].aumentarMeGusta();
  res.json({ meGusta: listaPublicaciones[index].meGusta });
});

app.post('/comentarios/:index', function(req, res) {
  const index = req.params.index;
  const comentario = req.body.comentario; // Suponiendo que recibes el comentario en el body de la solicitud

  // Agregar el comentario a la publicación en la lista
  listaPublicaciones[index].agregarComentario(comentario);

  // Enviar una respuesta JSON con el número actualizado de comentarios
  res.json({ comentarios: listaPublicaciones[index].comentarios });
});