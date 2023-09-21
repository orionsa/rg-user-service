import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
