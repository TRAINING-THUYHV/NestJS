import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ name: 'type_login', default: 'normal' })
  typeLogin: string;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  ceatedAt: Date
}
