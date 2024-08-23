import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;
}
