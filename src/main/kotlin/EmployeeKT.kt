data class EmployeeKT(var id: Long, var name: String, val position: String, val office: String, val age: Int, val startDate: String, val salary: String) {
    constructor() : this(0, "", "", "", 0, "", "")
}
