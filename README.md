# TableEditor App
#### Table editor app on Angular 5 and Java with MySQL data base.
 
 
 Prewiew image of project. 
 
![Prewiew image of Project](https://i.imgur.com/HdNEamd.png)



### Technology stack 
- **Front-End**
  - Angular 5
  - Bootstrap
  - TypeScript
  - font-awesome
  - mocha
  
- **Back-End**
  - Java/Kotlin
  - Spring-Boot
  - MySQL
  - Rest
 

### How to try ?
For run app yourself you must have a MySQL data base, 
with a table of users which you can take from  <code>"src\main\resources\database\database_ininialize.sql"</code>.
Update all dependencies in files <code>pom.xml</code> and <code>src\web\myApp\package.json</code>
After that you have two-way to run application.

##### In docker?
in command prompt run:
<code> docker run -e 'ACCEPT_EULA=Y' -e MYSQL_ROOT_PASSWORD=user -p 3306:3306 --name mysqlDB -d mysql/mysql-server:latest </code> (create the container)
<code>docker exec -it mysqlDB mysql -uroot -p </code>   (login with a password 'user')
<code>CREATE USER 'user'@'%' IDENTIFIED BY 'user'; </code> (create the user for a db)
<code> GRANT ALL PRIVILEGES ON employees.* TO 'user'@'%'; </code> (grant privileges for user)
<code>CREATE DATABASE IF NOT EXISTS employees; </code> (create a db)
### Runing

##### First way
You can build angular application with command <code>npm build</code>, when  the building is over, 
you will be had, application file at resource package of spring application <code>src\main\resources\static</code>, 
next you can run spring application and visit web page <code>http://localhost:8080 </code> with this application.

##### Second way
For run application you need run spring application <code>src\main\java\spring\SpringJpaHibernateExampleApplication.java</code>, and angular application with command<code>npm start</code>, 
after that you can visit web page <code>http://localhost:4200 </code> and enjoy of application.


 - after first execution change line <code> spring.datasource.initialization-mode=always</code> 
 to <code> spring.datasource.initialization-mode=never </code>  