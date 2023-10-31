import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categorie = this.categorieRepository.create(createCategoryDto);
    const result = await this.categorieRepository.save(categorie);
    return result;
  }

  async findAll() {
    return await this.categorieRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  async findOne(id: number) {
    const categorieFound = await this.categorieRepository.findOneBy({
      id_categorie: id,
    });
    if (!categorieFound) {
      throw new NotFoundException(`L'id numero ${id} n'existe pas`);
    }
    return categorieFound;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categorieFound = await this.categorieRepository.findOneBy({
      id_categorie: id,
    });
    if (!categorieFound) {
      throw new NotFoundException(`L'id numéro ${id} n'existe pas`);
    }
    Object.assign(categorieFound, updateCategoryDto);
    await this.categorieRepository.save(categorieFound);
    return categorieFound;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }

  async remove(id: number) {
    const categorieFound = await this.categorieRepository.findOneBy({
      id_categorie: id,
    });
    if (!categorieFound) {
      throw new NotFoundException(`L'id numéro ${id} n'existe pas`);
    }
    return await this.categorieRepository.remove(categorieFound);
  }
}
