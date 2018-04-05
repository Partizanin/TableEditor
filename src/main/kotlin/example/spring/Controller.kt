
import model.Employee
import repository.EmployeeRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller(val repository: EmployeeRepository) {
    @GetMapping("/")
    fun findAll(): MutableList<Employee> = repository.findAll()

    @GetMapping("/api/all")
    fun findAllApi(): MutableList<Employee> = repository.findAll()

}