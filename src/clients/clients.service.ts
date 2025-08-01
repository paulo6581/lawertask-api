import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  // Cria um novo cliente na base dados
  async create(createClientDto: CreateClientDto) {
    try {
      return await this.prisma.client.create({
        data: createClientDto,
      });
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw error;
    }
  }

  // Busca todos os clientes ordenados por nome
  async findAll() {
    return this.prisma.client.findMany({
      orderBy: { name: 'asc' },
    });
  }

  // Busca um cliente pelo ID - incluindo suas tarefas
  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id: parseInt(id) },
      include: {
        tasks: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }


  // Atualiza os dados de um cliente existente
  async update(id: string, updateClientDto: CreateClientDto) {
    await this.findOne(id); // Verificar se existe

    try {
      return await this.prisma.client.update({
        where: { id: parseInt(id) },
        data: updateClientDto,
      });
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw error;
    }
  }
}
