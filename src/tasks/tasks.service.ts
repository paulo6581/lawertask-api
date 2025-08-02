import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Cria uma nova task no sistema - vinculado ao ID usuário e cliente
  async create(createTaskDto: CreateTaskDto, userId: number) {
    const client = await this.prisma.client.findUnique({
      where: { id: createTaskDto.clientId },
    });

    if (!client) {
      throw new BadRequestException('Cliente não encontrado');
    }

    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        dueDate: new Date(createTaskDto.dueDate),
        userId,
      },
      include: {
        client: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Busca todas as tasks do usuário autenticado
  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      include: {
        client: true, 
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Busca uma task específica por ID e usuário autenticado
  async findOne(id: string, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id: parseInt(id), userId },
      include: {
        client: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  // Atualiza uma task existente 
  async update(id: string, updateTaskDto: UpdateTaskDto, userId: number) {
    await this.findOne(id, userId);

    // Antes de atualizar, verifica se o novo cliente existe
    if (updateTaskDto.clientId) {
      const client = await this.prisma.client.findUnique({
        where: { id: updateTaskDto.clientId },
      });

      if (!client) {
        throw new BadRequestException('Cliente não encontrado');
      }
    }

    const updateData = { 
      ...updateTaskDto,
      ...(updateTaskDto.dueDate && { dueDate: new Date(updateTaskDto.dueDate) })
    };

    return this.prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        client: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Remove uma task
  async remove(id: string, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.task.delete({
      where: { id: parseInt(id) },
    });
  }

  // Estatísticas das tasks do usuário - dashboard
  async getStats(userId: number) {
    const [total, todoCount, doingCount, doneCount] = await Promise.all([
      // Total de Tasks do usuário
      this.prisma.task.count({ where: { userId } }), 

      // Tasks TODO
      this.prisma.task.count({ where: { userId, status: 'TODO' } }),

      // Tasks DOING
      this.prisma.task.count({ where: { userId, status: 'DOING' } }), 

      // Tasks DONE
      this.prisma.task.count({ where: { userId, status: 'DONE' } }), 
    ]);

    return {
      total,
      byStatus: {
        todo: todoCount,
        doing: doingCount,
        done: doneCount,
      },
    };
  }
}
