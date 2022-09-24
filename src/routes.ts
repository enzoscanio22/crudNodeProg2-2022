import { request, response, Router } from "express";
import UserController from "./controllers/UserController";
import ProductoController from "./controllers/ProductoController";

const router = Router();

const userController = new UserController();
const productoController = new ProductoController();

router.get("/", (request, response)=>{
  response.render("./index")
})
router.get("/usuario/index", userController.handleListUsersController.bind(userController));
router.get("/producto/indexProducto", productoController.handleListProductosController.bind(productoController))

router.get("/usuario/add", (request, response) => {
  response.render("usuario/add");
});

router.get("/producto/addProducto", (request, response) => {
  response.render("producto/addProducto");
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

export { router };
