import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Carga de Dados de usuário, clientes e tarefas
async function loadDatas() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@lawertask.com' },
    update: {},
    create: {
      email: 'admin@lawertask.com',
      name: 'Administrador',
      password: hashedPassword,
    },
  });

  const client1 = await prisma.client.upsert({
    where: { email: 'cliente1@gmail.com' },
    update: {},
    create: {
      name: 'João Vitor',
      email: 'cliente1@gmail.com',
      phone: '(79) 96941-8286',
      company: 'Empresa ABC',
    },
  });

  const client2 = await prisma.client.upsert({
    where: { email: 'cliente2@gmail.com' },
    update: {},
    create: {
      name: 'Maria Santos',
      email: 'cliente2@gmail.com',
      phone: '(81) 98563-1438',
      company: 'Empresa XYZ',
    },
  });

  await prisma.task.create({
    data: {
      title: 'Revisar contrato de prestação de serviços',
      description: 'Análise completa das cláusulas contratuais',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: new Date('2024-08-15'),
      clientId: client1.id,
      userId: user.id,
    },
  });

  await prisma.task.create({
    data: {
      title: 'Elaborar parecer jurídico',
      description: 'Parecer sobre questões trabalhistas',
      status: 'DOING',
      priority: 'MEDIUM',
      dueDate: new Date('2024-08-20'),
      clientId: client2.id,
      userId: user.id,
    },
  });
}

loadDatas()
  .then(async () => {
    console.log("Carga de dados feita com sucesso!");
    await prisma.$disconnect();
  })
  .catch((erro) => {
    console.error(erro);
    process.exit(1)
  })
  