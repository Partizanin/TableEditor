package example.spring.repository

import example.spring.model.Employee
import org.springframework.data.jpa.repository.JpaRepository


interface EmployeeRepository : JpaRepository<Employee, Long>