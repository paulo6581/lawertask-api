import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

// Classe filha de CreatTaskDto com propriedades opcionais
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
