"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var OwnPrismaClient = /** @class */ (function () {
    function OwnPrismaClient() {
        // O construtor é privado para evitar instanciamento externo
    }
    OwnPrismaClient.getInstance = function () {
        if (!OwnPrismaClient.instance) {
            // Cria uma nova instância se ainda não existir
            OwnPrismaClient.instance = new client_1.PrismaClient();
        }
        return OwnPrismaClient.instance;
    };
    return OwnPrismaClient;
}());
// Exemplo de uso
var prisma = OwnPrismaClient.getInstance();
exports.default = prisma;
