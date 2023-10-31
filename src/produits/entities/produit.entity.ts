import { Categorie } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'produits' })
export class Produit {
  @PrimaryGeneratedColumn()
  id_produit: number;

  @Column()
  nom: string;

  @Column()
  prix: number;

  @Column()
  quantite: number;

  @Column()
  id_categorie: number;

  @ManyToOne(() => Categorie, (categorie) => categorie.produit, { eager: true })
  @JoinColumn({ name: 'id_categorie', referencedColumnName: 'id_categorie' })
  categorie: Categorie;
}
