import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsNotEmpty({ message: 'Email chưa đúng định dạng!' })
  @IsEmail({}, { message: 'Email chưa được nhập!' })
  email: string;

  @Column()
  @MinLength(6, { message: 'Mật khẩu phải nhiều hơn 6 kí tự' })
  password: string;

  @Column()
  role: string;

  @Column({ name: 'type_login', default: 'normal' })
  typeLogin: string;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  ceatedAt: Date;
}
