package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.model.User;
import spring.repository.UsersRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {

    @Autowired
    UsersRepository usersRepository;

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") int id) {
        System.out.println("Delet user " + id);
        usersRepository.deleteById(id);
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
//    public @ResponseBody
    public void update(@PathVariable("id") int id, @RequestBody User user) {
        System.out.println("Update user " + id);
        usersRepository.saveAndFlush(user);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void create(@RequestBody User user) {
        System.out.println("Create user " + user.getId());
        usersRepository.saveAndFlush(user);
    }

    //    @GetMapping("/all")
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<User> read() {
        return usersRepository.findAll();
    }

    @GetMapping("/name/{name}")
    public List<User> getUser(@PathVariable("name") final String name) {
        return usersRepository.findByName(name);
    }

    @GetMapping("/id/{id}")
    public User getUser(@PathVariable("id") final int id) {
        System.out.println("get user by id: " + id);

        return usersRepository.findById(id);
    }
}
