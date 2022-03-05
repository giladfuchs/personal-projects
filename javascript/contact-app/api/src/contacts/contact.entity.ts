import { PhoneNumber } from 'src/phoneNumber/phoneNumber.entity';
import { Photo } from 'src/photo/photo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  nickName?: string;

  @Column({ nullable: true })
  address?: string;

  @OneToMany((type) => PhoneNumber, (phoneEntity) => phoneEntity.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  phoneNumbers?: PhoneNumber[];

  @OneToOne((type) => Photo, (phoneEntity) => phoneEntity.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    eager: true,
  })
  photo?: Photo;
}
