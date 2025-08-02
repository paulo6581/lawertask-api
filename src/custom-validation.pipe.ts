import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// Pipe personalizado de validação criado para contornar problemas de detecção
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {

  //Método principal que transforma e valida os dados de entrada
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Verifica se existe um metatype e se deve ser validado
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    }
    
    // Se passou na validação, retorna o objeto transformado
    return object;
  }

  // determina se um tipo deve ser validado
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
