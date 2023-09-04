package com.cansell.web.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;
@Configuration
public class JwtUtils {
    public String generateJwt(UserDetailsImpl userDetails){
        Map<String, Object> donnees = new HashMap<>();
        donnees.put("fistName",userDetails.getUser().getFirstName());
        donnees.put("lastName",userDetails.getUser().getLastName());
        donnees.put("role",userDetails.getUser().getRole());

        return Jwts.builder()
                .setClaims(donnees)
                .setSubject(userDetails.getUsername())
                .signWith(SignatureAlgorithm.HS256,"azerty")
                .compact();
    }
    public Claims getData(String jwt){
        return Jwts.parser()
                .setSigningKey("azerty")
                .parseClaimsJws(jwt)
                .getBody();

    }

    public boolean isTokenValid(String jwt){
        try {
            Claims donnees = getData(jwt);
        } catch (SignatureException e) {
            return false;
        }
        return true;
    }
}
