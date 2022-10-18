import { getCustomRepository } from "typeorm";
import { CategoriasRepository } from "../repositories/CategoriasRepository";
import { Categoria } from "../entities/Categoria";

interface ICategoria {
  id?: string
  nombreCategoria: string;
}

class CategoriaService{
    async create({ nombreCategoria}: ICategoria) {
        if (!nombreCategoria ) {
          throw new Error("Por favor rellene todos los campos");
        }
    
        const categoriasRepository = getCustomRepository(CategoriasRepository);
    
        const nombreCategoriaAlreadyExists = await categoriasRepository.findOne({ nombreCategoria });
    
        if (nombreCategoriaAlreadyExists) {
          throw new Error("El nombre de la categoria seleccionado ya está registrado");
        }
    

        const categoria = categoriasRepository.create({ nombreCategoria});
    
        await categoriasRepository.save(categoria);
    
        return categoria;
    
      }

      async delete(id: string) {
        const categoriasRepository = getCustomRepository(CategoriasRepository);
    
        const categoria = await categoriasRepository
          .createQueryBuilder()
          .delete()
          .from(Categoria)
          .where("id = :id", { id })
          .execute();
    
        return categoria; 
      }

      async getData(id: string) {
        const categoriasRepository = getCustomRepository(CategoriasRepository);
    
        const categoria = await categoriasRepository.findOne(id);
    
        return categoria;
      }

      async list() {
        const categoriasRepository = getCustomRepository(CategoriasRepository);
    
        const categorias = await categoriasRepository.find();
    
        return categorias;
      }

      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const categoriasRepository = getCustomRepository(CategoriasRepository);
    
        const categoria = await categoriasRepository
          .createQueryBuilder()
          .where("nombreCategoria like :search", { search: `%${search}%` })
          .getMany();
    
        return categoria;
      }

      async update({ id, nombreCategoria }: ICategoria) {
        const categoriasRepository = getCustomRepository(CategoriasRepository);
    
        const categoria = await categoriasRepository
          .createQueryBuilder()
          .update(Categoria)
          .set({ nombreCategoria })
          .where("id = :id", { id })
          .execute();
    
        return categoria;
      }
}

export default CategoriaService;