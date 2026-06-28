<h1>Coursesphere-back Project</h1>
<h2>What is it?</h2>
<p>This is a Rest API used for the CourseSphere Project, a fullstack learning platform. For the front-end, <a href="https://github.com/ProgramasNS/coursesphere-front">click here</a>.</p>
<br>
<h2>Which technologies does the API use?</h2>
<ul>
  <li><strong>Express.JS:</strong> Popular among JavaScript developers, it was the main framework used for creating and maintaining the APIs.</li>
  <li><strong>Sequelize:</strong> Main framework for CRUD operations and database integration.</li>
  <li><strong>SQLite:</strong> The Database Management System (DBMS) used, together with Sequelize.</li>
  <li><strong>Bcrypt:</strong> Robust encryption system used in this application for generating and protecting passwords during registration.</li>
  <li><strong>JSON Web Token(JWT):</strong> Cryptographic system for generating the administrator user token.</li>
</ul>
<h2>The classes</h2>
    <ul>
      <li><strong>User:</strong> corresponds to requests used for user registrations. It has three properties: name, email, and password.</li>
      <li><strong>Course:</strong> corresponds to the platform’s courses. It has 5 properties: name, start_date, end_date, creator_id (required) and description (optional). Only creators (authenticated users) can create, list, and edit courses.</li>
      <li><strong>Lesson:</strong> corresponds to lessons belonging to each course. It has 4 properties: title, status, video_url, and course_id. Only the creators of the respective courses associated with each lesson can create and edit them.</li>
    </ul>
<h2>File Organization System</h2>
<p>By default, this project uses the <strong>Model-View-Controller (MVC)</strong> model, and this specific API corresponds to the models and controllers. Each of the 3 classes (User, Course, and Lesson) is used both in models and controllers, as well as in routes.</p>
<h3>The content of each folder</h3>
<ol>
  <li><h4>Main folder</h4></li>
  <p>This is the most important folder of the entire project, as it contains all other folders and the main modules. Its content includes:
    <ul>
      <li><strong>index.js:</strong> The application initializer. Configures the IP network and opens the server using the listen() method.</li>
      <li><strong>app.js:</strong> Initializes Express, initializes the APIs, and exports them to index.js.</li>
    </ul>
  </p>
  <li><h4>Models</h4></li>
  <p>Within the MVC model, the Model is responsible for the logic and organization of the models to be used by the APIs and during database integration. Sequelize was used to create each of the models. Each model corresponds to each of the classes mentioned earlier, consolidating their properties and associating them with other data.</p>
  <li><h4>Controllers</h4></li>
  <p>The controllers, on the other hand, are responsible for requests related to the models and the manipulation of their data. Here is a demonstration of each controller:</p>
  <ul>
    <li><strong>UserController:</strong> Has the functions registerUser and loginUser, both associated with post methods;</li>
    <li><strong>CourseController:</strong> Has the CRUD functions listCourse, createCourse, updateCourse, and deleteCourse, associated with get, post, put, and delete methods, respectively;</li>
    <li><strong>LessonController:</strong> Has the CRUD functions createLessons, listLessons, updateLesson, and deleteLesson, associated with post, get, put, and delete methods, respectively;</li>
  </ul>
  <li><h4>Routes</h4></li>
  <p>Routes are the "paths" to address each API, associating each class with a route and each route with HTTP methods, each using a function from that class. The methods are also addressed within localhost.</p>
  <li><h4>Config</h4></li>
  <p>Contains a single module: <code>db.js</code>, which initializes Sequelize and defines the database as SQLite.</p>
  <li><h4>Middlewares</h4></li>
  <p>Like config, it also contains a single module: <code>middleware.js</code>, which is mainly responsible for generating the token for creator users, as a way of authenticating them.</p>
</ol>
<h2>How to run the project</h2>
<ol>
  <li>Cloning the repository</li>
  <p>First, create a folder on your computer with the repository name (or an easy-to-remember name, as you prefer) and go to the terminal (cmd or PowerShell):</p>
  <p><code>cd your_folder_name</code></p>
  <p>Then:</p>
  <p><code>git clone https://github.com/ProgramasNS/coursesphere-back.git</code></p>
  <p>Then <code>cd coursesphere-back</code></p>
  <li>Using Docker</li>
  <p>If you have Docker installed, run:</p>
  <p><code>docker build -t coursesphere-back:latest .</code></p>
  <p>Or, if you are on Linux, run:</p>
  <p><code>sudo docker build -t coursesphere-back:latest .</code></p>
  <p>And to run the application, type:</p>
  <p><code>docker run -p 3000:3000 coursesphere-back:latest</code></p>
  
  <p>If it works, you will receive a response similar to this:</p>
  <p><code>Server successfully connected!
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Users';
Executing (default): PRAGMA INDEX_LIST(`Users`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_Users_1`)
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Courses';
Executing (default): PRAGMA INDEX_LIST(`Courses`)
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Lessons';
Executing (default): PRAGMA INDEX_LIST(`Lessons`)
</code></p>
  <p>From there, you can test the APIs.</p>
</ol>
<h2>How to run locally (without Docker)</h2>
<ol>
  <li>Clone the repository and enter the folder:
    <pre><code>git clone https://github.com/ProgramasNS/coursesphere-back.git
cd coursesphere-back</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Create the <code>.env</code> file:
    <pre><code>JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5173</code></pre>
  </li>
  <li>Run the project:
    <pre><code>node index.js</code></pre>
  </li>
  <li>The server will be running at <code>http://localhost:3000</code></li>
</ol>
<h2>Server Hosting</h2>
<p>The back-end server is currently hosted on Render, which can be accessed by clicking <a href="https://coursesphere-back-host.onrender.com/">here</a>.</p>
<h2>API Endpoints</h2>
<table border="1">
  <tr>
    <th>Method</th>
    <th>Route</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/user/</td>
    <td>Register new user</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/user/login</td>
    <td>Login (returns token)</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/course</td>
    <td>Create course</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/course/list</td>
    <td>List user’s courses</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/course/:id</td>
    <td>Update course</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/course/:id</td>
    <td>Delete course</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/lesson/course/:courseId</td>
    <td>List lessons of a course</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/lesson/</td>
    <td>Create lesson</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/lesson/:id</td>
    <td>Update lesson</td>
  </tr>
  
