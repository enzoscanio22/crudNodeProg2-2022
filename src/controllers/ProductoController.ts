import { Request, Response } from "express";
import ProductoService from "../services/ProductoService"

class ProductoController {
    private service:ProductoService;
    constructor(){
      this.service= new ProductoService();
    }
    async handleProductoController(request: Request, response: Response) {
      const { nombreProducto, descripción, precio } = request.body;
  
      try {
        await this.service.create({
          nombreProducto,
          descripción,
          precio
        }).then(() => {
          response.render("message", {
            message: "Producto registrado con éxito."
          });
        });
      } catch (err) {
        response.render("message", {
          message: `Error al registrar producto: ${err.message}`
        });
      }
    }

    async handleDeleteProductoService(request: Request, response: Response) {
        const { id } = request.body;
    
        try {
          await this.service.delete(id).then(() => {
            response.render("message", {
              message: "Producto eliminado exitosamente."
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al eliminar Producto: ${err.message}`
          });
        }
      }
    
      async handleGetProductoDataController(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const producto = await this.service.getData(id);
    
        return response.render("editProducto", {
          producto: producto
        });
      }

      async handleListProductosController(request: Request, response: Response) {
    
        const productos = await this.service.list();
    
        return response.render("./viewsProducto/indexProducto", {
          productos: productos
        });
      }

      async handleSearchProductoController(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        try {
          const productos = await this.service.search(search);
          response.render("searchProducto", {
            productos: productos,
            search: search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar producto: ${err.message}`
          });
        }
      }

      async handleUpdateProductoController(request: Request, response: Response) {
        const {id, nombreProducto, descripción, precio } = request.body;
    
        try {
          await this.service.update({ id, nombreProducto, descripción, precio }).then(() => {
            response.render("message", {
              message: "Producto actualizado con éxito."
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al actualizar producto: ${err.message}`
          });
        }
      }  
  }
  
  export default ProductoController;