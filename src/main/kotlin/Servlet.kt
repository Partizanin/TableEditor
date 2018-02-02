import org.json.JSONArray
import org.json.JSONObject
import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(name = "Servlet", value = ["/Servlet"])
class Servlet : HttpServlet() {

    private val dbConnectionsKT = DBConnectionsKT()

    override fun doPost(req: HttpServletRequest, resp: HttpServletResponse) {
        super.doGet(req, resp)
    }

    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {
        resp.contentType = "text/plain; charset=utf-8"
        resp.characterEncoding = "UTF-8"


        val jsData = JSONObject(req.getParameter("jsonData"))
        val operation = jsData.getString("operation")

        var employee = EmployeeKT()

        when (operation) {
            "create", "update", "delete" -> {
                val catchData = JSONObject(jsData.getString("data"))
                employee = jsonToObject(catchData)
            }
        }

        val writer = resp.writer

        val sendData = sendData(operation, employee)
        writer.println(sendData)
        writer.flush()
    }

    private fun sendData(operation: String, employee: EmployeeKT): JSONObject {
        return when (operation) {
            "create" -> {
                dbConnectionsKT.create(employee)
                read()
            }
            "update" -> {
                dbConnectionsKT.update(employee)
                read()
            }
            "delete" -> {
                dbConnectionsKT.delete(employee)
                read()
            }
            else -> read()
        }
    }

    private fun read(): JSONObject {
        val result = JSONObject()
        val list: MutableList<JSONObject> = mutableListOf()

        dbConnectionsKT.read().mapTo(list) { JSONObject(it) }



        result.accumulate("users", list)

        return result
    }

    private fun jsonToObject(jsonObject: JSONObject): EmployeeKT {
        val id = jsonObject.getInt("id").toLong()
        val name = jsonObject.getString("name")
        val position = jsonObject.getString("position")
        val office = jsonObject.getString("office")
        val age = jsonObject.getInt("age")
        val startDate = jsonObject.getString("startDate")
        val salary = jsonObject.getString("salary")
        return EmployeeKT(id, name, position, office, age, startDate, salary)
    }
}

private fun JSONArray.putAll(list: MutableList<JSONObject>) {
    list.forEach { it -> this.put(it) }
}
