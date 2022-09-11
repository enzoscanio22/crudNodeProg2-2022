import { Request, Response } from "express";
import UserService from "../services/UserService"

class UserController {
    private service:UserService;
    constructor(){
      this.service= new UserService();
    }
    async handleUserController(request: Request, response: Response) {
      const { username, email, telefone, cidade, estado } = request.body;
  
      try {
        await this.service.create({
          username,
          email,
          telefone,
          cidade,
          estado
        }).then(() => {
          response.render("message", {
            message: "Usuario registrado con éxito."
          });
        });
      } catch (err) {
        response.render("message", {
          message: `Error al registrar usuario: ${err.message}`
        });
      }
    }

    async handleDeleteUserService(request: Request, response: Response) {
        const { id } = request.body;
    
        try {
          await this.service.delete(id).then(() => {
            response.render("message", {
              message: "Usuario eliminado exitosamente."
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al eliminar usuario: ${err.message}`
          });
        }
      }
    
      async handleGetUserDataController(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const user = await this.service.getData(id);
    
        return response.render("edit", {
          user: user
        });
      }

      async handleListUsersController(request: Request, response: Response) {
    
        const users = await this.service.list();
    
        return response.render("index", {
          users: users
        });
      }

      async handleSearchUserController(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        try {
          const users = await this.service.search(search);
          response.render("search", {
            users: users,
            search: search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar usuario: ${err.message}`
          });
        }
      }

      async handleUpdateUserController(request: Request, response: Response) {
        const { id, username, email, telefone, cidade, estado } = request.body;
    
        try {
          await this.service.update({ id, username, email, telefone, cidade, estado }).then(() => {
            response.render("message", {
              message: "Usuario actualizado con éxito."
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al actualizar usuario: ${err.message}`
          });
        }
      }  
  }
  
  export default UserController;