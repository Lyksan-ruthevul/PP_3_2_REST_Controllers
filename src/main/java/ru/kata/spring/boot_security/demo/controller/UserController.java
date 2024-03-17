package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.security.UserDetailsServiceImpl;


import java.security.Principal;

@Controller
public class UserController {
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    public UserController(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/user")
    public String showUserInfo(Model model, Principal principal) {
        model.addAttribute("user", userDetailsService.findByUsername(principal.getName()));
        return "user";
    }
}