import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { Usuario } from "../entities/User";

interface IUser {
  id?: string
  nombreUsuario: string;
  eMail: string;
  teléfono: string;
  ciudad: string;
  provincia: string;
}

class UserService{
    async create({ nombreUsuario, eMail, teléfono, ciudad, provincia }: IUser) {
        if (!nombreUsuario || !eMail || !teléfono || !ciudad || !provincia) {
          throw new Error("Por favor rellene todos los campos");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const usernameAlreadyExists = await usersRepository.findOne({ nombreUsuario });
    
        if (usernameAlreadyExists) {
          throw new Error("El nombre de usuario ya está registrado");
        }
    
        const emailAlreadyExists = await usersRepository.findOne({ eMail });
    
        if (emailAlreadyExists) {
          throw new Error("El eMail que selecciono ya está registrado");
        }
    
        const user = usersRepository.create({ nombreUsuario, eMail, teléfono, ciudad, provincia });
    
        await usersRepository.save(user);
    
        return user;
    
      }

      async delete(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .delete()
          .from(Usuario)
          .where("id = :id", { id })
          .execute();
    
        return user; 
      }

      async getData(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository.findOne(id);
    
        return user;
      }

      async list() {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const users = await usersRepository.find();
    
        return users;
      }

      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .where("nombreUsuario like :search", { search: `%${search}%` })
          .orWhere("eMail like :search", { search: `%${search}%` })
          .orWhere("teléfono like :search", { search: `%${search}%` })
          .orWhere("ciudad like :search", { search: `%${search}%` })
          .orWhere("provincia like :search", { search: `%${search}%` })
          .getMany();
    
        return user;
      }

      async update({ id, nombreUsuario, eMail, teléfono, ciudad, provincia }: IUser) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .update(Usuario)
          .set({ nombreUsuario, eMail, teléfono, ciudad, provincia })
          .where("id = :id", { id })
          .execute();
    
        return user;
      }
}

export default UserService;