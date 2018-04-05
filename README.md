# TableEditor App
#### Table editor app on Angular 5 and Java with MySQL data base.
 
 
 Prewiew image of project. 
 
![Prewiew image of Project](https://i.imgur.com/HdNEamd.png)

### How to try ?
For run app yourself you must have a MySQL data base, 
with table of users which you can take from  <code>"src\main\resources\database\employees_data.sql"</code>.
Update all dependencies in files <code>pom.xml</code> and <code>src\web\myApp\package.json</code>
After that you have two way to run aplication.

### Runing

##### First way
You can build angular application with command <code>npm build</code>, when  the building is over, 
you will be have, aplication file at resource package of spring aplication <code>src\main\resources\static</code>, 
next you can run spring aplication and visit web page <code>http://localhost:8080</code> with this application.

##### Second way
For run application you need run spring application <code>src\main\java\spring\SpringJpaHibernateExampleApplication.java</code>, and angular application with command<code>npm start</code>, after the you can visit web page <code>http://localhost:4200</code> and enjoy of application.
