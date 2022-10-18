import { request, response, Router } from "express";
import UserController from "./controllers/UserController";
import ProductoController from "./controllers/ProductoController";
import CategoriaController from "./controllers/CategoriaController";

const router = Router();

const userController = new UserController();
const productoController = new ProductoController();
const categoriaController = new CategoriaController();

router.get("/", (request, response)=>{
  response.render("./index")
})
router.get("/usuario/indexUsuario", userController.handleListUsersController.bind(userController));
router.get("/producto/indexProducto", productoController.handleListProductosController.bind(productoController))
router.get("/categoria/indexCategoria", categoriaController.handleListCategoriaController.bind(categoriaController))

router.get("/usuario/add", (request, response) => {
  response.render("usuario/add");
});

router.get("/producto/addProducto", (request, response) => {
  response.render("producto/addProducto");
});

router.get("/categoria/addCategoria", (request, response) => {
  response.render("categoria/addCategoria");
});

router.post("/usuario/add-user", userController.handleUserController.bind(userController));

router.get("/usuario/search", userController.handleSearchUserController.bind(userController));

router.get("/usuario/edit", userController.handleGetUserDataController.bind(userController));

router.post("/usuario/edit-user", userController.handleUpdateUserController.bind(userController));

router.post("/usuario/delete-user", userController.handleDeleteUserService.bind(userController));


router.post("/producto/add-producto", productoController.handleProductoController.bind(productoController));

router.get("/producto/searchProducto", productoController.handleSearchProductoController.bind(productoController));

router.get("/producto/editProducto", productoController.handleGetProductoDataController.bind(productoController));

router.post("/producto/edit-producto", productoController.handleUpdateProductoController.bind(productoController));

router.post("/producto/delete-producto", productoController.handleDeleteProductoService.bind(productoController));


router.post("/categoria/add-categoria", categoriaController.handleCategoriaController.bind(categoriaController));

router.get("/categoria/searchCategoria", categoriaController.handleSearchCategoriaController.bind(categoriaController));

router.get("/categoria/editCategoria", categoriaController.handleGetCategoriaDataController.bind(categoriaController));

router.post("/categoria/edit-categoria", categoriaController.handleUpdateCategoriaController.bind(categoriaController));

router.post("/categoria/delete-categoria", categoriaController.handleDeleteCategoriaService.bind(categoriaController));


export { router };
