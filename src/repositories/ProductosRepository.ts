import { Repository, EntityRepository } from "typeorm";
import { Producto } from "../entities/Producto";

@EntityRepository(Producto)
class ProductosRepository extends Repository<Producto>{ }

export { ProductosRepository };