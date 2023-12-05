import { IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateProduitDto {
  id_produit: number;

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsInt()
  prix: number;

  @IsNotEmpty()
  @IsInt()
  quantite: number;

  @IsNotEmpty()
  @IsInt()
  id_categorie: number;
}
