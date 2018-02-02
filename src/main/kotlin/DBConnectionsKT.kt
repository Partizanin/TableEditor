import java.sql.DriverManager
import java.sql.Statement
import java.util.*

class DBConnectionsKT {

    fun getByID(id: Long): EmployeeKT {

        val resultSet = getStatement().executeQuery("SELECT * FROM empdata\n" +
                "WHERE Id='" + id + "';")

        var name = ""
        var position = " "
        var office = ""
        var age = 0
        var startDate = ""
        var salary = ""

        while (resultSet.next()) {
            name = resultSet.getString("Name")
            position = resultSet.getString("Position")
            office = resultSet.getString("Office")
            age = Integer.parseInt(resultSet.getString("Age"))
            salary = resultSet.getString("Salary")
            startDate = resultSet.getString("StartDate")
        }

        return EmployeeKT(id, name, position, office, age, startDate, salary)

    }

    fun create(employee: EmployeeKT) {

        getStatement().executeUpdate("INSERT INTO empdata(Id,Name, Position, Office, Age, `StartDate`, Salary) " +
                " VALUE ('" + employee.id + "','" + employee.name + "','"
                + employee.position + "','" + employee.office + "','"
                + employee.age + "','" + employee.startDate + "','"
                + employee.salary + "')")

    }

    fun read(): MutableList<EmployeeKT> {
        val list: MutableList<EmployeeKT> = mutableListOf()

        val resultSet = getStatement().executeQuery("SELECT * FROM empdata;")

        while (resultSet.next()) {
            val id = Integer.parseInt(resultSet.getString("Id")).toLong()
            val name = resultSet.getString("Name")
            val position = resultSet.getString("Position")
            val office = resultSet.getString("Office")
            val age = Integer.parseInt(resultSet.getString("Age"))
            val startDate = resultSet.getString("StartDate")
            val salary = resultSet.getString("Salary")

            list.add(EmployeeKT(id, name, position, office, age, startDate, salary))
        }

        return list
    }

    fun update(employee: EmployeeKT) {
        getStatement().executeUpdate("UPDATE empdata\n" +
                "SET Name = '" + employee.name + "', Position = '" + employee.position + "'," +
                "Office ='" + employee.office + "', Age = '" + employee.age + "', `StartDate`= '"
                + employee.startDate + "', Salary = '" + employee.salary + "'\n" +
                "WHERE Id= '" + employee.id + "';")
    }

    fun delete(employee: EmployeeKT) {
        getStatement().executeUpdate("DELETE FROM empdata\n" +
                "WHERE Id='" + employee.id + "';")
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