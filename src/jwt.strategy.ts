import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Utilisateur } from './utilisateurs/entities/utilisateur.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {
    super({
      secretOrKey: 'simplon',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
  async validate(payload: any): Promise<Utilisateur> {
    console.log('validate');
    const { nom } = payload;
    const utilisateur: Utilisateur = await this.utilisateurRepository.findOneBy(
      { nom },
    );

    if (!utilisateur) throw new UnauthorizedException();
    return utilisateur;
  }
}
