package spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.model.User;

import java.util.List;

public interface UsersRepository extends JpaRepository<User, Integer> {
    List<User> findByName(String name);

    User findById(int id);
}
