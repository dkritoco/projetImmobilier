package com.cansell.web.controler;

import com.cansell.web.dao.RoleDao;
import com.cansell.web.dao.UserDao;
import com.cansell.web.model.Role;
import com.cansell.web.model.User;
import com.cansell.web.security.UserDetailsImpl;
import com.cansell.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class UserControler {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    public UserControler(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user")
    public List<User> getUser(){
        System.out.println("userDao = " + userDao);

        return userDao.findAll();
    }

    @PostMapping("/insert")
    public ResponseEntity<Map<String, Object>> getInsertUser(@RequestBody User user) throws Exception {
        System.out.println("user = " + user);
        // Chiffrer le mot de passe avant de le sauvegarder dans la base de données.
        String encryptedPassword = passwordEncoder.encode(user.getPassword());

        Role roleUtilisateur = roleDao.findByNameRole("role_utilisateur");

        Optional<User> optionalUser = userDao.findByEmail(user.getEmail());
        if(optionalUser.isPresent()){
            System.out.println("optionalUser = " + optionalUser);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        //Créer l'utilisateur avec le mot de passe chiffré.
        User user1 = new User();

        user1.setFirstName(user.getFirstName());
        user1.setLastName(user.getLastName());
        user1.setPhone(user.getPhone());
        user1.setAddress(user.getAddress());
        user1.setEmail(user.getEmail());
        user1.setPassword(encryptedPassword);
        user1.setRole(roleUtilisateur);

        userService.createUser(user1);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente.");
        response.put("userId", user1.getEmail());

        return ResponseEntity.ok(response);

       //return ResponseEntity.ok("usuario registrado");
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        // Verificar si el usuario que realiza la solicitud tiene el rol de administrador


        if (isUserAdmin()) {
            userDao.deleteById(userId);
            return ResponseEntity.ok("Utilisateur supprimé avec succès.");
        } else {
            System.out.println("userId  is= " + userId);
            System.out.println("isUserAdmin() = " + isUserAdmin());
            // Si el usuario no tiene permisos para eliminar usuarios, devolver una respuesta de acceso denegado
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'avez pas les autorisations pour supprimer des utilisateurs.");
        }
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return userDetails.getUser();
        }
        return null;
    }

    private boolean isUserAdmin() {
        User authenticatedUser = getAuthenticatedUser();
        if (authenticatedUser != null && authenticatedUser.getRole() != null) {
            String roleName = authenticatedUser.getRole().getNameRole();
            if (roleName.equals("ROLE_ADMINISTRATEUR")){
                System.out.println(" estoy aqui= ");
                return true;
            }else
                return false;
        }
        return false;
    }



}
