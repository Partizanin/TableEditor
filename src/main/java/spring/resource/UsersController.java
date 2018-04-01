package spring.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.model.User;
import spring.repository.UsersRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {

    @Autowired
    UsersRepository usersRepository;

    @GetMapping("/all")
    public List<User> getAll() {
        return usersRepository.findAll();
    }

    @GetMapping("/name/{name}")
    public List<User> getUser(@PathVariable("name") final String name) {
        return usersRepository.findByName(name);
    }

    @GetMapping("/id/{id}")
    public User getUser(@PathVariable("id") final int id) {
        return usersRepository.findById(id);
    }
}
