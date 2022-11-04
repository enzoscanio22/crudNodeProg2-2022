import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes";
import "./database";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "./repositories/UsersRepository";

const app = express();
// Login   
// const expres = require('express') //le cambie nombre
const passport = require('passport')
const session = require('express-session')
const cookieParser= require('cookie-parser')
const PassportLocal = require('passport-local').Strategy

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Permite leer los datos enviados por un formulario
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("La aplicación ha sido levantada con éxito. Server en el puerto ${PORT}. http://localhost:3000/");
});

// LOGIN

app.get("/",(req,res)=>{
  // Si ya iniciamos mostrar bienvenida
  // Si no iniciamos sesion redireccionando a /login
 
})

app.get("/login",(req,res)=>{
  res.render("login"); // Mostrar el formulario del login
})

app.post("/login",passport.authenticate('local',{
  successRedirect: "/index",
  failureRedirect: "/"
}))

app.use(cookieParser('oozmaKappa'))

app.use(session({
  secret: "oozmaKappa",
  resave: true , // Cuando es true cada petición aunque la sesión no haya sido modificada la vamos a volver a guardar
  saveUninitialized: true , // Cuando esta true inicializamos sesion en una petición no le guardamos nada aún así se guarda
}))

app.use(passport.initialize()) // Configuración contraseña

app.use(passport.session()) // Configuración session

passport.use(new PassportLocal (async function(eMail,contraseña,done){
  const usersRepository = getCustomRepository(UsersRepository);
  const eMailAlreadyExists = await usersRepository.findOne({ eMail });
  const contraseñaAlreadyExists = await usersRepository.findOne({ contraseña });
  if (eMail==="geronimo@gmail" && contraseña==="1234")
     return done(null,{id: 1, name: "Enzo"})
  
  done(null,false)
}))

passport.serializeUser(function(user,done){
  done(null,user.id);
})

passport.deserializeUser(function(id,done){
  done(null,{id: 1, name: "Enzo"})
})