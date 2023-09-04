package com.cansell.web.controler;

import com.cansell.web.dao.UserDao;
import com.cansell.web.model.User;
import com.cansell.web.security.JwtUtils;
import com.cansell.web.security.UserDetailsImpl;
import com.cansell.web.security.UserDetailsServiceImpl;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin( origins = "http://localhost:4200/")
@RestController
public class ConnexionController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    UserDao userDao;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/login")
    public ResponseEntity<String> connexion(@RequestBody User user){
        System.out.println("user.toString() = ingrese a la conexion" + user.toString());
        UserDetailsImpl userDetails;
        try {
            userDetails = (UserDetailsImpl)authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    )
            ).getPrincipal();
            System.out.println("userDetails = " + userDetails);
        } catch (AuthenticationException e){
            System.out.println("e = " + e);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        System.out.println("userDetails = " + userDetails);
        return new ResponseEntity<>(jwtUtils.generateJwt(userDetails), HttpStatus.OK);
    }

    @GetMapping("/profil")
    public ResponseEntity<User> getProfil(@RequestHeader("Authorization") String bearer){
        System.out.println(" ingrese al profil " );
        String jwt = bearer.substring(7);

        Claims donnees = jwtUtils.getData(jwt);

        Optional<User> utilisateur = userDao.findByEmail(donnees.getSubject());

        if (utilisateur.isPresent()){
            System.out.println("hola hola" );
            return new ResponseEntity<>(utilisateur.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
