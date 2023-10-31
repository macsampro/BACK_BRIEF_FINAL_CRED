import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}
  async create(createUtilisateurDto: CreateUtilisateurDto) {
    const newUtilisateur =
      this.utilisateurRepository.create(createUtilisateurDto);
    const result = await this.utilisateurRepository.save(newUtilisateur);
    return result;
  }

  async findAll() {
    return await this.utilisateurRepository.find();
  }

  async findOne(id: number) {
    const utilisateurFound = await this.utilisateurRepository.findOneBy({
      id_utilisateur: id,
    });
    if (!utilisateurFound) {
      throw new NotFoundException(`L'id numero ${id} n'existe pas`);
    }
    return utilisateurFound;
  }

  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    const utilisateurFound = await this.utilisateurRepository.findOneBy({
      id_utilisateur: id,
    });
    if (!utilisateurFound) {
      throw new NotFoundException(`L'id numéro ${id} n'existe pas`);
    }
    Object.assign(utilisateurFound, updateUtilisateurDto);
    await this.utilisateurRepository.save(utilisateurFound);
    return utilisateurFound;
  }
  async remove(id: number) {
    const userFound = await this.utilisateurRepository.findOneBy({
      id_utilisateur: id,
    });
    if (!userFound) {
      throw new NotFoundException(`L'id numéro ${id} n'existe pas`);
    }
    return await this.utilisateurRepository.remove(userFound);
  }
}
