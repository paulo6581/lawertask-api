import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Proteger rotas com request auth JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
