import { PrismaClient } from '@prisma/client';

class OwnPrismaClient {
  private static instance: PrismaClient;

  private constructor() {
    // O construtor é privado para evitar instanciamento externo
  }

  public static getInstance(): PrismaClient {
    if (!OwnPrismaClient.instance) {
      // Cria uma nova instância se ainda não existir
      OwnPrismaClient.instance = new PrismaClient();
    }
    return OwnPrismaClient.instance;
  }
}

// Exemplo de uso
const prisma = OwnPrismaClient.getInstance();

export default prisma;