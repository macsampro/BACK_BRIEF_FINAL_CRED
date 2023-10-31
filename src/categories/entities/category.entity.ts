import { Produit } from 'src/produits/entities/produit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Categorie {
  @PrimaryGeneratedColumn()
  id_categorie: number;

  @Column()
  nom: string;

  @OneToMany(() => Produit, (produit) => produit.categorie)
  produit: Produit[];
}
