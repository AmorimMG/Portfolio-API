import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuario {
  @ObjectIdColumn()
  id: number;

  @Column()
  usuario: string;

  @Column()
  senha: string;

  @Column()
  email: string;
}
