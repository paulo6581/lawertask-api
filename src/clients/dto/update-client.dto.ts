import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  // name
  @ApiProperty({ 
    example: 'Maria',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  // Email
  @ApiProperty({
    example: 'email@example.com',
    description: 'Email do usuário',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  // Phone
  @ApiProperty({ example: '(61) 99999-9999', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  // Company
  @ApiProperty({ example: 'Empresa lawer', required: false })
  @IsString()
  @IsOptional()
  company?: string;
}
