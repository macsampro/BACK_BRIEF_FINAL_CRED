import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateCategoryDto {
  // id_categorie: number;

  @IsNotEmpty()
  @IsString()
  nom: string;
}
