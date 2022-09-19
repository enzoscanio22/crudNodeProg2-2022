import { Router } from "express";
import UserController from "./controllers/UserController";
import ProductoController from "./controllers/ProductoController";

const router = Router();

const userController = new UserController();
const productoController = new ProductoController();

router.get("/", userController.handleListUsersController.bind(userController));
router.get("/", productoController.handleListProductosController.bind(productoController))

router.get("/add", (request, response) => {
  response.render("add");
});

router.post("/add-user", userController.handleUserController.bind(userController));

router.get("/search", userController.handleSearchUserController.bind(userController));

router.get("/edit", userController.handleGetUserDataController.bind(userController));

router.post("/edit-user", userController.handleUpdateUserController.bind(userController));

router.post("/delete-producto", userController.handleDeleteUserService.bind(userController));


router.post("/add-producto", productoController.handleProductoController.bind(productoController));

router.get("/search", productoController.handleSearchProductoController.bind(productoController));

router.get("/edit", productoController.handleGetProductoDataController.bind(productoController));

router.post("/edit-producto", productoController.handleUpdateProductoController.bind(productoController));

router.post("/delete-producto", productoController.handleDeleteProductoService.bind(productoController));

export { router };
