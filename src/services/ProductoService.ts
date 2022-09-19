import { getCustomRepository } from "typeorm";
import { ProductosRepository } from "../repositories/ProductosRepository";
import { Producto } from "../entities/Producto";

interface IProducto {
  id?: string
  nombreProducto: string;
  descripción: string;
  precio: number;
}

class ProductoService{
    async create({ nombreProducto, descripción, precio }: IProducto) {
        if (!nombreProducto || !descripción || !precio ) {
          throw new Error("Por favor rellene todos los campos");
        }
    
        const productosRepository = getCustomRepository(ProductosRepository);
    
        const nombreProductoAlreadyExists = await productosRepository.findOne({ nombreProducto });
    
        if (nombreProductoAlreadyExists) {
          throw new Error("El nombre del producto seleccionado ya está registrado");
        }
    
        // const descripciónAlreadyExists = await productosRepository.findOne({ descripción });
    
        // if (descripciónAlreadyExists) {
        //   throw new Error("La descripcion que selecciono ya está registrado");
        // }
    
        const producto = productosRepository.create({ nombreProducto, descripción, precio });
    
        await productosRepository.save(producto);
    
        return producto;
    
      }

      async delete(id: string) {
        const productosRepository = getCustomRepository(ProductosRepository);
    
        const producto = await productosRepository
          .createQueryBuilder()
          .delete()
          .from(Producto)
          .where("id = :id", { id })
          .execute();
    
        return producto; 
      }

      async getData(id: string) {
        const productosRepository = getCustomRepository(ProductosRepository);
    
        const producto = await productosRepository.findOne(id);
    
        return producto;
      }

      async list() {
        const productosRepository = getCustomRepository(ProductosRepository);
    
        const productos = await productosRepository.find();
    
        return productos;
      }

      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const productosRepository = getCustomRepository(ProductosRepository);
    
        const producto = await productosRepository
          .createQueryBuilder()
          .where("nombreProducto like :search", { search: `%${search}%` })
          .orWhere("descripción like :search", { search: `%${search}%` })
          .orWhere("precio like :search", { search: `%${search}%` })
          .getMany();
    
        return producto;
      }

      async update({ id, nombreProducto, descripción, precio }: IProducto) {
        const productosRepository = getCustomRepository(ProductosRepository);
    
        const producto = await productosRepository
          .createQueryBuilder()
          .update(Producto)
          .set({ nombreProducto, descripción, precio })
          .where("id = :id", { id })
          .execute();
    
        return producto;
      }
}

export default ProductoService;