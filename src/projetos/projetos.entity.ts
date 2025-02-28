import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('Projetos')
export class Projeto {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column('simple-array')
  languages: string[];
}
