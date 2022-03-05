import { Contact } from 'src/contacts/contact.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  imgUrl: string;

  @Column({ nullable: false })
  blur: boolean;

  @Column({ nullable: false })
  gray: boolean;

  @Column({ nullable: false })
  saturation: boolean;

  @OneToOne((type) => Contact, (userEntity) => userEntity.photo, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  user: Contact | { ['id']: number };
}
