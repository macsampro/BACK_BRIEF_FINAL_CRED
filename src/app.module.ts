import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { ProduitsModule } from './produits/produits.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateurs/entities/utilisateur.entity';
import { Produit } from './produits/entities/produit.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { Categorie } from './categories/entities/category.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Utilisateur, Produit, Categorie],
      synchronize: false,
      logging: false,
    }),
    UtilisateursModule,
    ProduitsModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
