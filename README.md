# Challenge for developers - Technical Assessment

## Descrição Geral

Este repositório contém um desafio técnico para desenvolvedores de diferentes níveis (Júnior, Pleno e Sênior). O objetivo é construir uma aplicação de perfil de usuário com uma timeline (feed) onde os usuários possam criar postagens e interagir com reações, como curtidas. O desafio está estruturado em diferentes níveis de complexidade, permitindo avaliar habilidades em desenvolvimento frontend e backend.

## Estrutura do Repositório

O repositório está organizado como um monorepo, com múltiplos diretórios correspondentes a diferentes partes do sistema, incluindo tanto APIs quanto interfaces de usuário. Abaixo está uma explicação detalhada sobre cada diretório e sua finalidade:

```
user-profile-app/
├── README.md
├── packages/
│   ├── monolith-sample/      # Monolito Quick Start em Node.js (Iniciado)
│   ├── monolith-node/        # Monolito em Node.js (Iniciado)
│   ├── api-node/             # API em Node.js (Iniciado)
│   ├── api-go/               # API em Go (Iniciado)
│   ├── microservices-go/     # Microserviços em Go (Diretórios Vazios)
│   ├── frontend-react/       # Frontend em React (Pacote Inicial Criado)
│   ├── frontend-nextjs/      # Frontend em Next.js (Pacote Inicial Criado)
├── package.json
└── .gitignore
```

## Níveis de Experiência

### Nível Júnior

#### Requisitos Mínimos
- **API RESTful:** Implementar um monolito em Node.js ou uma API RESTful em Node.js ou Go para gerenciamento de perfis de usuário.
  - Operações CRUD (Create, Read, Update, Delete) para os perfis.
  - Endpoint para criação de postagens na timeline.
  - Endpoint para reagir a postagens com curtidas.
- **Frontend Básico:** Utilizar React ou Next.js para criar uma tela de perfil e uma timeline de postagens.
  - Exibir postagens na timeline com a capacidade de adicionar novas postagens e curtir.
- **Autenticação:** Implementar autenticação utilizando JWT.
- **Testes Unitários:** Criar testes unitários para os principais endpoints da API.
- **Documentação:** Documentar a API utilizando Swagger ou uma ferramenta similar.

#### Implementação Inicial (monolith-sample)
- O diretório `monolith-sample/` já contém uma implementação básica em Node.js e React.
- **Dependências**: O projeto foi configurado para rodar com Node.js e SQLite.
- **Instruções de Uso**: 
  - Para rodar o projeto, utilize os scripts:
    ```bash
    cd packages/monolith-sample
    npm run install:all
    npm run dev
    ```

### Nível Pleno

#### Requisitos Adicionais
- **Frontend Avançado:** Migrar o frontend para Next.js (caso tenha escolhido React no nível Júnior).
  - Implementar uma interface de usuário mais rica e responsiva.
- **Banco de Dados:** Integração com um banco de dados relacional (ex: PostgreSQL).
  - Persistir dados de usuários, postagens e reações (curtidas).
- **Cache:** Implementar cache utilizando Redis para melhorar a performance das operações de leitura.
- **Testes de Integração:** Criar testes de integração para validar o fluxo completo da aplicação.

#### Implementação Inicial
- O diretório `frontend-nextjs/` já contém um pacote inicial criado com `create-next-app`, pronto para ser expandido.
- **Expectativas**:
  - Otimizar a aplicação para usar um banco de dados relacional e implementar as funcionalidades adicionais conforme descrito nos requisitos.

### Nível Sênior

#### Requisitos Adicionais
- **Escalabilidade e Performance:** Otimizar a aplicação para suportar um grande volume de postagens e curtidas simultâneas.
  - Implementar concorrência utilizando Golang para processos críticos de performance (caso escolha Go).
- **WebSocket:** Implementar WebSocket para atualizações em tempo real na timeline.
- **Funcionalidade Offline:** Permitir que a aplicação funcione offline utilizando Service Workers.
- **Monitoramento e Logs:** Configurar monitoramento e logging para a aplicação utilizando ferramentas como ELK Stack (Elasticsearch, Logstash, Kibana).
- **Microsserviços:** Refatorar parte da aplicação para uma arquitetura de microsserviços, separando responsabilidades (ex: serviço de autenticação, serviço de perfis, serviço de postagens).

#### Implementação Inicial
- Os diretórios `microservices-go/` (`auth-service`, `post-service`, `profile-service`) foram criados, mas estão vazios. Esses diretórios servem como base para implementação de uma arquitetura de microsserviços, onde cada serviço é responsável por uma parte específica da aplicação.
- **Expectativas**:
  - Implementar toda a estrutura de microsserviços, utilizando Golang, com foco em escalabilidade e performance.

## Instruções de Entrega

1. **Repositório Git:** Submeta o código em um repositório Git. Pode ser público ou privado (forneça acesso se for privado).
2. **Branches:** Crie uma branch específica para cada nível (junior, pleno, senior). Certifique-se de que o código esteja devidamente commitado em cada branch correspondente.
3. **README Individual:** Cada branch deve conter um README.md próprio explicando as decisões técnicas tomadas, como configurar e rodar a aplicação para aquele nível.
4. **Demonstração:** Opcional, mas recomendado. Inclua uma demonstração ao vivo ou um vídeo explicando a aplicação e as funcionalidades implementadas.

## Avaliação

Os candidatos serão avaliados com base nos seguintes critérios:

- **Código Limpo e Manutenível:** Organização do código, padrões de projeto, legibilidade e comentários.
- **Funcionalidade:** Atendimento aos requisitos mínimos e adicionais conforme o nível.
- **Qualidade dos Testes:** Cobertura e eficácia dos testes unitários e de integração.
- **Desempenho:** Capacidade de lidar com carga elevada, eficiência do uso de cache e concorrência.
- **Documentação:** Qualidade e clareza da documentação da API e do código.
- **Inovação e Melhoria:** Implementação de funcionalidades adicionais que demonstrem criatividade e conhecimento avançado.

## Como Iniciar

1. Clone este repositório:

2. Navegue até o diretório correspondente ao seu nível e tecnologia escolhida.
   
3. Siga as instruções do README específico da branch para rodar a aplicação e começar a desenvolver.

Boa sorte!
