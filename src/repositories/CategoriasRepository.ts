import { Repository, EntityRepository } from "typeorm";
import { Categoria } from "../entities/Categoria";

@EntityRepository(Categoria)
class CategoriasRepository extends Repository<Categoria>{ }

export { CategoriasRepository };