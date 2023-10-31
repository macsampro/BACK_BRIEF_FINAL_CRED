import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { Produit } from './entities/produit.entity';
import { Categorie } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur, Produit, Categorie])],

  controllers: [ProduitsController],
  providers: [ProduitsService],
})
export class ProduitsModule {}
