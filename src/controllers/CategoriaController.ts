import { Request, Response } from "express";
import CategoriaService from "../services/CategoriaService"

class CategoriaController {
    private service:CategoriaService;
    constructor(){
      this.service= new CategoriaService();
    }
    async handleCategoriaController(request: Request, response: Response) {
      const { nombreCategoria } = request.body;
  
      try {
        await this.service.create({
          nombreCategoria
        }).then(() => {
          response.render("categoria/messageCategoria", {
            message: "Categoria registrado con éxito."
          });
        });
      } catch (err) {
        response.render("categoria/messageCategoria", {
          message: `Error al registrar categoria: ${err.message}`
        });
      }
    }

    async handleDeleteCategoriaService(request: Request, response: Response) {
        const { id } = request.body;
    
        try {
          await this.service.delete(id).then(() => {
            response.render("categoria/messageCategoria", {
              message: "Categoria eliminada exitosamente."
            });
          });
        } catch (err) {
          response.render("categoria/messageCategoria", {
            message: `Error al eliminar Categoria: ${err.message}`
          });
        }
      }
    
      async handleGetCategoriaDataController(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const categoria = await this.service.getData(id);
    
        return response.render("categoria/editCategoria", {
          categoria: categoria
        });
      }

      async handleListCategoriaController(request: Request, response: Response) {
    
        const categorias = await this.service.list();
    
        return response.render("categoria/indexCategoria", {
          categorias: categorias
        });
      }

      async handleSearchCategoriaController(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        try {
          const categorias = await this.service.search(search);
          response.render("categoria/searchCategoria", {
            categorias: categorias,
            search: search
          });
        } catch (err) {
          response.render("categoria/messageCategoria", {
            message: `Error al buscar categoria: ${err.message}`
          });
        }
      }

      async handleUpdateCategoriaController(request: Request, response: Response) {
        const {id, nombreCategoria } = request.body;
    
        try {
          await this.service.update({ id, nombreCategoria }).then(() => {
            response.render("categoria/messageCategoria", {
              message: "Categoria actualizado con éxito."
            });
          });
        } catch (err) {
          response.render("categoria/messageCategoria", {
            message: `Error al actualizar categoria: ${err.message}`
          });
        }
      }  
  }
  
  export default CategoriaController;