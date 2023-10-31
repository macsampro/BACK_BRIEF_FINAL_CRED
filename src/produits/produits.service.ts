import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';
import { Categorie } from 'src/categories/entities/category.entity';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Utilisateur)
    private userRepository: Repository<Utilisateur>,
    @InjectRepository(Produit)
    private produitRepository: Repository<Produit>,
    @InjectRepository(Categorie)
    private categrieRepository: Repository<Categorie>,
  ) {}

  async create(createProduitDto: CreateProduitDto) {
    const produit = this.produitRepository.create(createProduitDto);
    const result = await this.produitRepository.save(produit);
    return result;
  }

  async findAll() {
    return await this.produitRepository.find();
  }

  async findOne(id: number) {
    const produitFound = await this.produitRepository.findOneBy({
      id_produit: id,
    });
    if (!produitFound) {
      throw new NotFoundException(`L'id numero ${id} n'existe pas`);
    }
    return produitFound;
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    const produitFound = await this.produitRepository.findOneBy({
      id_produit: id,
    });
    if (!produitFound) {
      throw new NotFoundException(`L'id numéro ${id} n'existe pas`);
    }
    Object.assign(produitFound, updateProduitDto);
    await this.produitRepository.save(produitFound);
    return produitFound;
  }

  async remove(id: number) {
    const produitFound = await this.produitRepository.findOneBy({
      id_produit: id,
    });
    if (!produitFound) {
      throw new NotFoundException(`L'id numéro ${id} n'existe pas`);
    }
    return await this.produitRepository.remove(produitFound);
  }
}
