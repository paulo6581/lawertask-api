import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  // name
  @ApiProperty({ 
    example: 'Maria' 

  })

  @IsString()
  @IsNotEmpty()
  name: string;

  // Email
  @ApiProperty({
    example: 'email@example.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
