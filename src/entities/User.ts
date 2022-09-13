import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("usuarios")
class Usuario {

  @PrimaryColumn()
  id: string;

  @Column()
  nombreUsuario: string;

  @Column()
  eMail: string;

  @Column()
  teléfono: string;

  @Column()
  ciudad: string;

  @Column()
  provincia: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaModificacion: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Usuario };