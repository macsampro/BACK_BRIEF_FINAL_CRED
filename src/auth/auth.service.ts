import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRipository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { nom, prenom, email, password } = createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // création d'une entité utilisateur
    const utilisateur = this.utilisateurRipository.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    try {
      // enregistrement de l'entité utilisateur
      const createdUtilisateur =
        await this.utilisateurRipository.save(utilisateur);
      delete createdUtilisateur.password;
      return createdUtilisateur;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('nom already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { nom, password } = loginDto;
    const utilisateur = await this.utilisateurRipository.findOneBy({ nom });

    if (utilisateur && (await bcrypt.compare(password, utilisateur.password))) {
      const payload = { nom };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
