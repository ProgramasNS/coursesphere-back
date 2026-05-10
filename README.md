<h1>Projeto Ensino.API</h1>
<h2>O que é?</h2>
<p>Trata-se de uma API Rest utilizada para o Projeto CourseSphere, uma plataforma de ensino fullstack.</p>
<br>
<h2>Quais tecnologias a API usa?</h2>
<ul>
  <li><strong>Express.JS:</strong> Popular entre desenvolvedores JavaScript, foi o framework principal utilizado para a criação e a manutenção das APIs</li>
  <li><strong>Sequelize:</strong> Framework principal para os CRUDs e a integração com o banco de dados.</li>
  <li><strong>SQLite:</strong> O Sistema de Gerenciamento de Banco de Dados (SGBD) utilizado, aliado ao Sequelize.</li>
  <li><strong>Bcrypt:</strong> Sistema robusto de criptografia utilizado nesta aplicação para a geração e proteção de senhas durante o cadastro.</li>
  <li><strong>JSONWebTool (JWT):</strong> Sistema criptográfico para a geração do token do usuário administrador.</li>
</ul>
<h2>As classes</h2>
    <ul>
      <li><strong>User:</strong> corresponde às requisições utilizadas para os cadastros dos usuários. Possui três propriedades: name, email e password.</li>
      <li><strong>Course:</strong> corresponde aos cursos da plataforma. Possui 5 propriedades: name, start_date, end_date, creator_id (obrigatórias) e description (opcional). Somente criadores (usuários autenticados) podem criar, listar e editar cursos.</li>
      <li><strong>Lesson:</strong> corresponde às aulas pertencentes a cada um dos cursos. Possui 4 propriedades: title, status, video_url e course_id. Somente os criadores dos respectivos cursos associados a cada aula podem criá-las e editá-las.</li>
    </ul>
<h2>Sistema de Organização de Arquivos</h2>
<p>Por padrão, este projeto utiliza o modelo <strong>Model-View-Controller (MVC)</strong> e esta API em específico corresponde às models e aos controllers. Cada qual das 3 classes (User, Course e Lesson) é utilizada tanto nas models quanto nos controllers e também nas routes. </p>
<h3>O conteúdo de cada pasta</h3>
<ol>
  <li><h4>A pasta principal</h4></li>
  <p>É a pasta mais importante de todo o projeto, pois guarda todas as outras pastas e os módulos principais. No conteúdo está: 
    <ul>
      <li><strong>index.js:</strong> O inicializador do aplicativo. Configura a rede IP e abre o servidor por meio do método listen().</li>
      <li><strong>app.js:</strong> Inicializa o Express, incializa as APIs e as exporta para o index.js.</li>
    </ul>
  </p>
  <li><h4>Models</h4>
  </li>
  <p>Dentro do modelo MVC,o Model é responsável pela lógica e pela organização dos modelos a serem usados pelas APIs e durante a integração com o banco de dados. O Sequelize foi utilizado para a criação de cada um dos models. Cada model corresponde a cada uma das classes informadas anteriormente, consolidando suas propriedades e associando-as a outros dados.</p>
  <li><h4>Controllers</h4></li>
  <p>Os controllers, por outro lado, são responsáveis pelas requisições relativas aos models e as manipulações de seus dados. Aqui está uma demonstração de cada controller: </p>
  <ul>
    <li><strong>UserController: </strong>Possui as funções registerUser e loginUser, ambas sendo associadas a métodos post;</li>
    <li><strong>CourseController: </strong>Possui as funções CRUD listCourse, createCourse, updateCourse e deleteCourse, sendo associadas aos métodos get, post, put e delete, respectivamente;</li>
    <li><strong>LessonController: </strong>Possui as funções CRUD createLessons, listLessons, updateLesson e deleteLesson, sendo estes associados aos métodos post, get, put e delete, respectivamente;</li>
  </ul>
  <li><h4>Routes</h4></li>
  <p>As routes são as "rotas" para endereçar cada qual das APIs, associando cada classe a uma route e cada route a métodos http, cada qual utilizando uma função desta classe. Os métodos também são endereçados dentro do localhost.</p>
  <li><h4>Config</h4></li>
  <p>Possui um único módulo: <code>db.js</code>, o qual inicializa o Sequelize e define o banco de dados como SQLite.</p>
  <li><h4>Middlewares</h4></li>
  <p>Assim como config, possui também um único módulo: <code>middleware.js</code>, o qual é o principal responsável pela geração do token para os usuários criadores, como uma forma de autenticá-los.</p>
</ol>
<h2>Como executar o projeto</h2>
<ol>
  <li>Clonando o repositório</li>
  <p>Primeiro, crie uma pasta em seu computador com o nome do repositório (ou um nome fácil de ser lembrado, conforme sua preferência) e vá para o terminal (cmd ou PowerShell): </p>
  <p><code>cd nome_da_sua_pasta</code></p>
  <p>E depois: </p>
  <p><code>git clone https://github.com/ProgramasNS/Ensino.API</code></p>
  <li>Instalando as dependências</li>
  <p>Para instalar as dependências necessárias, digite o seguinte código no terminal: </p>
  <p><code>npm install</code></p>
  <li>Executando o módulo principal</li>
  <p>Após instalar todas as dependências necessárias, digite: </p>
  <p><code>node index.js</code></p>
  <p>E, se funcionar, você receberá uma resposta parecida com essa: </p>
  <p><code>Servidor conectado com sucesso!
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Users';
Executing (default): PRAGMA INDEX_LIST(`Users`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_Users_1`)
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Courses';
Executing (default): PRAGMA INDEX_LIST(`Courses`)
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Lessons';
Executing (default): PRAGMA INDEX_LIST(`Lessons`)
</code></p>
  <p>E a partir daí você poderá testar as APIs.
</p>
</ol>
<h2>Endpoints da API</h2>
<table border="1">
  <tr>
    <th>Método</th>
    <th>Rota</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/register</td>
    <td>Registrar novo usuário</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/login</td>
    <td>Fazer login (retorna token)</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/courses</td>
    <td>Criar curso</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/courses/list</td>
    <td>Listar cursos do usuário</td>
  </tr>
</table>
<h2>Usuário de teste</h2>
<p>Caso não queira criar um usuário manualmente, utilize estas credenciais:</p>
<pre>
email: nicolas@sbo.com
password: 123456
</pre>
