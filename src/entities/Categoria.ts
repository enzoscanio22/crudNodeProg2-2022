import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Producto } from "./Producto";

@Entity("categorias")
class Categoria {

  @PrimaryColumn()
  id: string;

  @Column()
  nombreCategoria: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaModificacion: Date;

  @OneToMany(type => Producto, producto => producto.categoria)
  producto:Producto[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Categoria };