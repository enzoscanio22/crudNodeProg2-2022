import { Repository, EntityRepository } from "typeorm";
import { Usuario } from "../entities/User";

@EntityRepository(Usuario)
class UsersRepository extends Repository<Usuario>{ }

export { UsersRepository };