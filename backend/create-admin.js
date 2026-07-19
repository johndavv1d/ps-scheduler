const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const senha = 'rootroot';
    const senhaHash = await bcrypt.hash(senha, 10);
    
    // Deletar admin existente
    await prisma.admin.deleteMany({});
    
    // Criar admin
    const admin = await prisma.admin.create({
      data: {
        email: 'root@agenda.com',
        senha: senhaHash,
        nome: 'Administrador Root'
      }
    });

    console.log('✅ Admin criado com sucesso!');
    console.log('📧 Email: root@agenda.com');
    console.log('🔑 Senha: rootroot');
    console.log('👤 Nome:', admin.nome);
    console.log('🆔 ID:', admin.id);

    // Verificar senha
    const test = await bcrypt.compare(senha, admin.senha);
    console.log('🔐 Teste de senha:', test ? '✅ OK' : '❌ FALHOU');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();