import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'utilisateurs' })
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id_utilisateur: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
