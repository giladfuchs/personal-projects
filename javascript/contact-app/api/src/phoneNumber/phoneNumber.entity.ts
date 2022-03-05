import { Contact } from 'src/contacts/contact.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  numericNumber: string;

  @ManyToOne((type) => Contact, (userEntity) => userEntity.phoneNumbers, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  user: Contact | { ['id']: number };
}
