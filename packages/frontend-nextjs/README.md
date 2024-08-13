# Teste Dialog

[![N|Solid](https://camo.githubusercontent.com/1210c36bead6cfcb15611855f43b91e6d1a786a7494277c443be911e5e48b84e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d414445253230425925323056657263656c2d3030303030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d56657263656c266c6162656c436f6c6f723d303030)](https://vercel.com/)

## Principais requerimentos
> De modo a organizar os requerimentos do teste, os agrupei em 3 categorias principais: **Front-end** (UI/UX), **back-end** (API Restful) e **Arquitetura** (autenticação, otimização, CI/CD e documentação do código).
    
- Front-end
1. **UI/UX**: Utilizar Next.js para criar uma tela de perfil e uma timeline de postagens.
2. **UI/UX**: Exibir postagens na timeline com a capacidade de adicionar novas postagens e curtir
3. **UI/UX**: Implementar uma interface de usuário mais rica e responsiva.

- Back-end
1. **API**: Integração com um banco de dados relacional. Persistir dados de usuários, postagens e reações (curtidas).
2. **API**: Implementar um monolito em Node.js ou uma API RESTful em Node.js para gerenciamento de perfis de usuário.
3. **API**: Operações CRUD (Create, Read, Update, Delete) para os perfis.
4. **API**: Endpoint para criação de postagens na timeline.
5. **API**: Endpoint para reagir a postagens com curtidas.

- Arquitetura
1. **Autenticação**: Implementar autenticação utilizando JWT.
2. **Otimização**: Implementar cache utilizando Redis para melhorar a performance das operações de leitura.
3. **Testes**: Criar testes unitários para os principais endpoints da API.
4. **Testes**: Criar testes de integração para validar o fluxo completo da aplicação.
5. **Documentação**: Documentar a API utilizando Swagger ou uma ferramenta similar.

## Execução
Execução da proposta feita para suprir requerimentos do teste.

### Front-End
> Para facilitar e otimizar o tempo de desenvolvimento utilizei o framework **Material UI** para criar componentes reutilizáveis com styled components e também facilitar no gerenciamento da responsividade dos mesmos.

### Back-End
### **Banco de dados**:
#### Utilizei o postgreSQL como SGBD. O banco irá possuir as seguintes tabelas:
1. **User**
> Tabela que irá armazenar id do usuário, e-mail (unique) e senha. Será a base para a construção de dados relacionados ao perfil (Profile). Terá relacionamento 1:1 com o Profile.
2. **Profile**
> Tabela que irá armazenar o id do perfil, id do usuário vinculado ao perfil e informações adicionais como bio, data de nascimento e mais. Relacionamento 1:1 com User e 1:N com Post
3. **Post**
> Tabela que irá armazenar id do post, conteúdo do post e o id do perfil que o postou. Relacionamento N:1 com Profile e 1:N com Profile.
4. **reaction**
> Tabela que irá armazenar id da Reaction, id do Post e id do Profile.
> Foi construída seguindo a premissa de que:
> 1. 1 Profile poderá ter 1 Reaction por post (1:1)
> 2. 1 Post poderá ter N Reactions (1:N)
> 3. 1 Profile pode reagir a N posts (1:N)

> Equivale dizer que a tabela Reaction é uma tabela que permitirá um relacionamento N:N entre Post e Profile.

#### API Rest
A API Rest será desenvolvida utilizando o Prisma como ORM para mapeamento das entidades do banco de dados e facilitar a composição dos endpoints da API.
Seguindo a arquitetura MVC, onde as views serão correspondentes ao módulos do App Router (NextJS engine) + componentes React, os modelos e controladores serão respectivamente modelos gerados a partir do arquivo schema.prisma (semelhante a um graphQL) e os controladores padrões de uma api (utilizando o diretório ./api)