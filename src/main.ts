import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './custom-validation.pipe';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Cross-origin
    app.enableCors();

    // Prefixo das rotas
    app.setGlobalPrefix('api');

    // Usa o pipe personalizado que resolve problemas com class-validator
    app.useGlobalPipes(new CustomValidationPipe());

    // Swagger
    const config = new DocumentBuilder()
      .setTitle('LawerTask API')
      .setDescription('API para gerenciamento de tarefas')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Aplicação rodando: http://localhost:${port}/api/docs`);
  } catch (error) {
    console.error(`Erro ao inicializar a aplicação: ${error}`);
  }
}

void bootstrap();
