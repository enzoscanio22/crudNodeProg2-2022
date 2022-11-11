import { request, response, Router } from "express";
import UserController from "./controllers/UserController";
import ProductoController from "./controllers/ProductoController";
import CategoriaController from "./controllers/CategoriaController";
import CategoriaService from "./services/CategoriaService";

const router = Router();

const userController = new UserController();
const productoController = new ProductoController();
const categoriaController = new CategoriaController();
const categoriaService = new CategoriaService();

// Renderizar Login

// router.get("/", (request, response)=>{
//   response.render("login")
// })

// Renderizar Index

// router.get("/index", (request, response)=>{
//   response.render("index")
// })

router.get("/usuario/indexUsuario", userController.handleListUsersController.bind(userController));
router.get("/producto/indexProducto", productoController.handleListProductosController.bind(productoController))
router.get("/categoria/indexCategoria", categoriaController.handleListCategoriaController.bind(categoriaController))

// Añadir Usuario

// router.get("/usuario/add", (request, response) => {
//   response.render("usuario/add");
// });

// Añadir Producto

router.get("/producto/addProducto", async (request, response) => {
  const categorias= await categoriaService.list();
  response.render("producto/addProducto", {listaDeCategorias:categorias});
});

// Añadir Categoria

router.get("/categoria/addCategoria", (request, response) => {
  response.render("categoria/addCategoria");
});

// Rustas de Usuario

router.get("/usuario",userController.handleListUsersController.bind(userController));

router.post("/usuario/add-user", userController.handleUserController.bind(userController));

router.get("/usuario/search", userController.handleSearchUserController.bind(userController));

router.get("/usuario/edit", userController.handleGetUserDataController.bind(userController));

router.post("/usuario/edit-user", userController.handleUpdateUserController.bind(userController));

router.post("/usuario/delete-user", userController.handleDeleteUserService.bind(userController));

// Rutas de Producto

router.get("/producto", productoController.handleListProductosController.bind(productoController));

router.post("/producto/add-producto", productoController.handleProductoController.bind(productoController));

router.get("/producto/searchProducto", productoController.handleSearchProductoController.bind(productoController));

router.get("/producto/editProducto", productoController.handleGetProductoDataController.bind(productoController));

router.post("/producto/edit-producto", productoController.handleUpdateProductoController.bind(productoController));

router.post("/producto/delete-producto", productoController.handleDeleteProductoService.bind(productoController));

// Rutas de Categorias

router.get("/categoria", categoriaController.handleListCategoriaController.bind(categoriaController));

router.post("/categoria/add-categoria", categoriaController.handleCategoriaController.bind(categoriaController));

router.get("/categoria/searchCategoria", categoriaController.handleSearchCategoriaController.bind(categoriaController));

router.get("/categoria/editCategoria", categoriaController.handleGetCategoriaDataController.bind(categoriaController));

router.post("/categoria/edit-categoria", categoriaController.handleUpdateCategoriaController.bind(categoriaController));

router.post("/categoria/delete-categoria", categoriaController.handleDeleteCategoriaService.bind(categoriaController));


export { router };
