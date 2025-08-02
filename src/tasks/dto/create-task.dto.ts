import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskStatus, TaskPriority } from '@prisma/client';

export class CreateTaskDto {
    // título
  @ApiProperty({ example: 'Revisar contrato' })
  @IsString()
  @IsNotEmpty()
  title: string;

  // Descrição
  @ApiProperty({ example: 'cláusulas do contrato' })
  @IsString()
  @IsNotEmpty()
  description: string;

  // status (TODO, DOING, DONE)
  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO, required: false, description: 'Status da tarefa (padrão: TODO)' })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  // Prioridade da task (LOW, MEDIUM, HIGH)
  @ApiProperty({ enum: TaskPriority, example: TaskPriority.MEDIUM, required: false, description: 'Prioridade da tarefa (padrão: MEDIUM)' })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  // Data de vencimento
  @ApiProperty({ example: '2024-08-15T10:00:00Z' })
  @IsDateString()
  dueDate: string;

  // id client - vinculado a task
  @ApiProperty({ example: 1, description: 'ID cliente' })
  @Transform(({ value }) => parseInt(String(value)))
  @IsInt()
  @Min(1)
  clientId: number;
}
