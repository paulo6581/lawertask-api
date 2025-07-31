import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  // Conecta com o banco dados ao inicializar o app
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexão com banco de dados estabelecida');
    } catch (error) {
      this.logger.error(`Erro ao conectar com banco de dados: ${error}`);
      throw error;
    }
  }

  // Desconecta com o banco de dados ao encerrar o app
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Conexão com banco de dados encerrada');
    } catch (error) {
      this.logger.error(`Erro ao desconectar do banco de dados: ${error}`);
    }
  }
}
