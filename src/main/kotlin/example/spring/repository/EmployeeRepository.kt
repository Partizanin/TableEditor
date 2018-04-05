package repository

import model.Employee
import org.springframework.data.jpa.repository.JpaRepository


interface EmployeeRepository: JpaRepository<Employee,Long>