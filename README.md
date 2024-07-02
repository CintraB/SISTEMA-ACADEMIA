# GYM-SYS


Esta é uma aplicação de API RESTful em Node.js que utiliza Express e PostgreSQL para gerenciar uma aplicação de controle de treinos e alunos em uma academia.


## Instalação


Clone o repositório:


```plaintext
git clone https://github.com/CintraB/SISTEMA-ACADEMIA
```
Instale as dependências:


```plaintext
npm install
```


## Configuração


Antes de executar o aplicativo, é necessário configurar as variáveis de ambiente no arquivo `.env`.


```plaintext
PORTA = 3000
USER =
HOST =
DATABASE =
PASSWORD =
PORTA_DB = 5432
TOKEN_SEG =
```


## Execução


Execute o comando


```plaintext
npm run dev
```
O servidor estará acessível em http://localhost:3000.


Ao efetuar login será gerado um token JWT necessário para navegação no sistema.


Exemplo token professor
```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywibm9tZSI6InRlY28gY29tIGhhc2giLCJjcGYiOiIxMjM1NTM3ODkzNiIsInByb2Zlc3NvciI6dHJ1ZSwiYXRpdm8iOnRydWUsImlhdCI6MTcxOTg3ODk0NiwiZXhwIjoxNzI3NjU0OTQ2fQ.HT4wNLBWhBvJtXsd3HZKElwoSegJQk-75eB1mw55a_Q
```


Exemplo token aluno
```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwibm9tZSI6InR1aSBjb20gaGFzaCIsImNwZiI6IjE0MzQ1Njc4OTM2IiwiYWx1bm8iOnRydWUsImF0aXZvIjp0cnVlLCJpYXQiOjE3MTk4NzkyMDUsImV4cCI6MTcyNzY1NTIwNX0.7xt7VE5-7MNsghw_A-wvjT6vLHrox7GZZQeFbNJBktg
```


### Endpoints
  - **Login**
    - POST /login - Obtém retorno e token JWT válido para navegação no sistema.
  - **Aluno**
    - GET /alunos/meutreino - Obtém o treino do aluno logado.
  - **Professor**
    - GET /professores/alunos - Obtém todos os alunos cadastrados.
    - GET /professores/aluno/:id - Obtém aluno por ID.
    - POST /professores/alunos - Realiza o cadastro de um aluno no sistema.
    - GET /professores/professores - Obtém todos professores cadastrados no sistema.
    - GET /professores/professor/:id - Obtém professor por ID.
    - POST /professores/professores - Realiza o cadastro de um professor no sistema.
    - POST /professores/treino - Realiza o cadastro de um treino no sistema.
    - GET /professores/exercicios - Obtém todos exercícios cadastrados no sistema.


**Tabela Login**


| VERBO | URL |
|----------|----------|
|POST| http://localhost:3000/login |


Exemplo Json para realizar o login.
```plaintext
{
    "cpf": "99999999999",
    "senha": "senha123"
}
```


**Tabela Aluno**


| VERBO | URL |
|----------|----------|
|GET| http://localhost:3000/alunos/meutreino |


**Tabela Professor**


| VERBO | URL |
|----------|----------|
|GET| http://localhost:3000/professores/alunos |
|GET| http://localhost:3000/professores/alunos/:id |
|GET| http://localhost:3000/professores/professores |
|GET| http://localhost:3000/professores/professores/:id |
|GET| http://localhost:3000/professores/exercicios |
|POST| http://localhost:3000/professores/alunos |
|POST| http://localhost:3000/professores/professores |
|POST| http://localhost:3000/professores/treino |


Exemplo Json para cadastrar aluno.
```plaintext
{
    "cpf":"99999999999",
    "nome":"joao",
    "senha":"senha123",
    "email":"email@email.com",
    "titulo":"555555555555"
}
```


Exemplo Json para cadastrar professor.
```plaintext
{
    "cpf":"88888888888",
    "nome":"maria",
    "senha":"senha123",
    "email":"email@email.com",
    "titulo":"666666666666"
}
```


Exemplo Json para cadastrar treino.
```plaintext
{
    "id_user": 6,
    "id_professor": 7,
    "exercicios": [
        {
            "id_exercicio": 3,
            "numero_serie": 4,
            "repeticoes": "10 a 15",
            "carga": 20,
            "observacao_ex_usuario": "c/ isometria"
        },
        {
            "id_exercicio": 8,
            "numero_serie": 4,
            "repeticoes": "10 a 15",
            "carga": 15,
            "observacao_ex_usuario": "pegada media"
        }
    ]
}
```
- **Estrutura de Arquivos**
  - server.js: Arquivo de entrada da aplicação.
  - app.js: Configuração do aplicativo Express.
  - config/dbConnect.js: Conexão com o banco de dados PostgreSQL.
  - routes/index.js: Arquivo de roteamento principal.
  - routes/loginRoutes.js: Rota relacionada ao login da aplicação.
  - routes/alunoRoutes.js: Rotas relacionadas aos alunos.
  - routes/professorRoutes.js: Rotas relacionadas aos professores.
  - controllers/loginController.js: Controlador para operações relacionadas ao login.
  - controllers/alunoController.js: Controlador para operações relacionadas aos alunos.
  - controllers/professorController.js: Controlador para operações relacionadas aos professores.
  - middlewares/geradorJwt.js: Middleware para gerar os tokens válidos.
  - middlewares/HashcomSal.js: Middleware para criptografar as senhas antes de enviar ao banco.
  - middlewares/loginVerificador.js: Middleware para comparar a hash da senha com a presente no banco.
  - middlewares/autenticadorJwt.js: Middleware para validar as rotas de professor durante navegação.
  - middlewares/autenticadorAluno.js: Middleware para validar as rotas de aluno durante a navegação.
  - package.json: Arquivo de configuração do Node.js que lista as dependências do projeto.
  - .env: Arquivo de variáveis de ambiente.


- **Tecnologias Utilizadas**
  - Node.js
  - Express.js
  - PostgreSQL
  - dotenv
  - nodemon
  - pg (node-postgres)
  - jsonwebtoken
  - bcrypt
