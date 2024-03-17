package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.security.UserDetailsServiceImpl;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;
    private RoleService roleService;
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService, UserDetailsServiceImpl userDetailsService) {
        this.userService = userService;
        this.roleService = roleService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/user")
    public String displayAllUsers(Model model, Principal principal) {
        model.addAttribute("allUsers", userService.displayAllUsers());
        model.addAttribute("user", userDetailsService.findByUsername(principal.getName()));
        model.addAttribute("roles", roleService.getRoles());
        return "all-users";
    }

    @GetMapping("/showAddNewUserForm")
    public String showAddNewUserForm(Model model, Principal principal) {
        model.addAttribute("addUser", new User());
        model.addAttribute("roles", roleService.getRoles());
        model.addAttribute("user", userDetailsService.findByUsername(principal.getName()));
        return "add-user";
    }

    @PostMapping("/addUser")
    public String addUser(@ModelAttribute("addUser") User user) {
        userService.saveUser(user);
        return "redirect:/admin/user";
    }

    @PostMapping("/saveEditUser")
    public String saveEditUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin/user";
    }

    @GetMapping("/deleteUser")
    public String deleteUser(@RequestParam("id") Long id) {
        User user = userService.getUser(id);
        userService.deleteUser(user);
        return "redirect:/admin/user";
    }
}
