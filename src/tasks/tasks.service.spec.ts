import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../database/prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
            client: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('Definir', () => {
    expect(service).toBeDefined();
  });

  it('Encontrar toda as tasks', async () => {
    const userId = 1;
    const tasks = [{ id: '1', title: 'Test tarefa' }];

    jest.spyOn(prisma.task, 'findMany').mockResolvedValue(tasks as any);

    const result = await service.findAll(userId);

    expect(result).toEqual(tasks);
    expect(prisma.task.findMany).toHaveBeenCalledWith({
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
  });
});
