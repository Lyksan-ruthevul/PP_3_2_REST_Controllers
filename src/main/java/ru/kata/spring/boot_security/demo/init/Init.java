package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.HashSet;
import java.util.Set;

@Component
public class Init {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private User user1;
    private User user2;

    @Autowired
    public Init(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init() {
        Role role1 = roleRepository.findByRoleName("ROLE_ADMIN");
        if (role1 == null) {
            role1 = new Role("ROLE_ADMIN");
            roleRepository.save(role1);
        }

        Role role2 = roleRepository.findByRoleName("ROLE_USER");
        if (role2 == null) {
            role2 = new Role("ROLE_USER");
            roleRepository.save(role2);
        }
        //password - admin = admin, user = user
        user1 = new User("admin@mail.ru", "$2a$10$pQHAL3nF4iwu6k9jwHeg5u520N66WmVDiu2bK03WdfGvpFF3QNP92", "admin", "admin", 1);
        user2 = new User("user@mail.ru", "$2a$10$ACmxffNNV33Ybg5.g3n3y.cu1QHp6AvmDWHU9TeKGvn1oUf7Grt7K", "user", "user", 2);

        Set<Role> roles1 = new HashSet<>();
        roles1.add(role1);
        roles1.add(role2);

        Set<Role> roles2 = new HashSet<>();
        roles2.add(role2);

        user1.setRoles(roles1);
        user2.setRoles(roles2);

        userRepository.save(user1);
        userRepository.save(user2);
    }

    @PreDestroy
    public void destroy() {
        userRepository.delete(user1);
        userRepository.delete(user2);
    }
}