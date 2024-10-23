import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuario {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  usuario: string;

  @Column()
  senha: string;

  @Column()
  email: string;
}
