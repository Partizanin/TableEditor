package spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import spring.model.User;
import spring.services.PageContainer;
import spring.services.UserService;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {

    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") int id) {
        System.out.println("Delete user " + id);
        userService.deleteById(id);
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") int id, @RequestBody User user) {
        System.out.println("Update user " + id);
        userService.saveAndFlush(user);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void create(@RequestBody User user) {
        System.out.println("Create user " + user.getId());
        userService.saveAndFlush(user);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public PageContainer getUserByPageAndLength(@Positive @RequestParam(name = "page") int pageNumber, @RequestParam(name = "size") int pageSize) {
        System.out.println("get page with users");
        System.out.println("pageNumber: " + pageNumber);
        System.out.println("pageSize: " + pageSize);
        return userService.getPage(pageNumber - 1, pageSize);
    }

    @GetMapping("/name/{name}")
    public List<User> getUser(@PathVariable("name") final String name) {
        return userService.findByName(name);
    }

    @GetMapping("/id/{id}")
    public User getUser(@PathVariable("id") final int id) {
        System.out.println("get user by id: " + id);
        return userService.findById(id);
    }
}
