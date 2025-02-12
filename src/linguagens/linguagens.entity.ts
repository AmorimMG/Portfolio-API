import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Linguagem {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  nome: string;
}
