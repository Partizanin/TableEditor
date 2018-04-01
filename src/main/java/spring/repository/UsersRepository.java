package spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.model.Users;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    List<Users> findByName(String name);

}
