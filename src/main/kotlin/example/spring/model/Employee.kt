package model

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "users")
data class Employee(@Id
                    var id: Long, var name: String, val position: String, val office: String, val age: Int, val startDate: String, val salary: String) {
    constructor() : this(0, "", "", "", 0, "", "")
}
