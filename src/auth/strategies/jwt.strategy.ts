import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../database/prisma.service';

interface JwtPayload {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
}

interface UserPayload {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET não foi definida');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  // Valida se o usuário ainda existe no banco de dados
  async validate(payload: JwtPayload): Promise<UserPayload> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(payload.sub) },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
    };
  }
}
