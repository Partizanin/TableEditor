import java.sql.DriverManager
import java.sql.Statement
import java.util.*

fun main(args: Array<String>) {
    val dbConnectionsKT = DBConnectionsKT()
    println("size of users: ${dbConnectionsKT.read().size}")
}

class DBConnectionsKT {

    fun getByID(id: Long): EmployeeKT {

        val resultSet = getStatement().executeQuery("SELECT * FROM empdata\n" +
                "WHERE id='" + id + "';")

        var name = ""
        var position = " "
        var office = ""
        var age = 0
        var startDate = ""
        var salary = ""

        while (resultSet.next()) {
            name = resultSet.getString("name")
            position = resultSet.getString("position")
            office = resultSet.getString("office")
            age = Integer.parseInt(resultSet.getString("age"))
            salary = resultSet.getString("salary")
            startDate = resultSet.getString("startDate")
        }

        return EmployeeKT(id, name, position, office, age, startDate, salary)

    }

    fun create(employee: EmployeeKT) {

        getStatement().executeUpdate("INSERT INTO empdata(id,name, position, office, age, `startDate`, salary) " +
                " VALUE ('" + employee.id + "','" + employee.name + "','"
                + employee.position + "','" + employee.office + "','"
                + employee.age + "','" + employee.startDate + "','"
                + employee.salary + "')")

    }

    fun read(): MutableList<EmployeeKT> {
        val list: MutableList<EmployeeKT> = mutableListOf()

        val resultSet = getStatement().executeQuery("SELECT * FROM empdata;")

        while (resultSet.next()) {
            val id = Integer.parseInt(resultSet.getString("id")).toLong()
            val name = resultSet.getString("name")
            val position = resultSet.getString("position")
            val office = resultSet.getString("office")
            val age = Integer.parseInt(resultSet.getString("age"))
            val startDate = resultSet.getString("startDate")
            val salary = resultSet.getString("salary")

            list.add(EmployeeKT(id, name, position, office, age, startDate, salary))
        }

        return list
    }

    fun update(employee: EmployeeKT) {
        getStatement().executeUpdate("UPDATE empdata\n" +
                "SET name = '" + employee.name + "', position = '" + employee.position + "'," +
                "office ='" + employee.office + "', age = '" + employee.age + "', `startDate`= '"
                + employee.startDate + "', salary = '" + employee.salary + "'\n" +
                "WHERE id= '" + employee.id + "';")
    }

    fun delete(employee: EmployeeKT) {
        getStatement().executeUpdate("DELETE FROM empdata\n" +
                "WHERE id='" + employee.id + "';")
    }

    private fun getStatement(): Statement {
        Locale.setDefault(Locale.ENGLISH)
        Class.forName("com.mysql.jdbc.Driver")
        val url = "jdbc:mysql://localhost:3306/employees?profileSQL=true"
        val username = "user"
        val pass = "user"
        return DriverManager.getConnection(url, username, pass).createStatement()
    }
}