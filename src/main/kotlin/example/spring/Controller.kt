package example.spring

import example.spring.model.Employee
import example.spring.repository.EmployeeRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class Controller(val repository: EmployeeRepository) {

    @GetMapping("/all")
    fun findAll(): MutableList<Employee> = repository.findAll()

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: Long) {
        println("Delet user $id")
        repository.deleteById(id)
    }


    @PutMapping("/{id}")
    fun update(@PathVariable("id") id: Int, @RequestBody employee: Employee) {
        println("Update user $id")
        repository.saveAndFlush(employee)
    }

    @PostMapping("/create")
    fun create(@RequestBody employee: Employee) {
        println("Create user ${employee.id}")
        repository.saveAndFlush(employee)
    }


}