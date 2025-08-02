import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Dados estruturados - request - usuaŕio autenticado
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: AuthenticatedRequest) {
    return this.tasksService.create(createTaskDto, Number(req.user.id));
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas' })
  findAll(@Request() req: AuthenticatedRequest) {
    return this.tasksService.findAll(Number(req.user.id));
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas das tarefas' })
  @ApiResponse({ status: 200, description: 'Estatísticas das tarefas' })
  getStats(@Request() req: AuthenticatedRequest) {
    return this.tasksService.getStats(Number(req.user.id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa por ID' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.tasksService.findOne(id, Number(req.user.id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req: AuthenticatedRequest) {
    return this.tasksService.update(id, updateTaskDto, Number(req.user.id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa excluída com sucesso' })
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.tasksService.remove(id, Number(req.user.id));
  }
}
