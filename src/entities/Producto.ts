import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Categoria } from "./Categoria";

@Entity("productos")
class Producto {

  @PrimaryColumn()
  id: string;

  @Column()
  nombreProducto: string;

  @Column()
  descripción: string;

  @Column()
  precio: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaModificacion: Date;

  @ManyToOne(type => Categoria, categoria => categoria.producto)
  categoria:Categoria[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Producto };