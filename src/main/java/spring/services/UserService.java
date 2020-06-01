package spring.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import spring.model.User;
import spring.repository.UsersRepository;

import java.util.List;

@Service
public class UserService {

    final UsersRepository usersRepository;

    public UserService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }


    public void deleteById(int id) {
        usersRepository.deleteById(id);
    }

    public void saveAndFlush(User user) {
        usersRepository.saveAndFlush(user);
    }

    public List<User> findAll() {
        return usersRepository.findAll();
    }

    public List<User> findByName(String name) {
        return usersRepository.findByName(name);
    }

    public User findById(int id) {
        return usersRepository.findById(id);
    }

    public PageContainer getPage(int pageNumber, int pageSize) {
        Page<User> userPage = usersRepository.findAll(
                PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, "id")));
        return new PageContainer(userPage.getTotalElements(), userPage.getTotalPages(), userPage.getContent());
    }
}
