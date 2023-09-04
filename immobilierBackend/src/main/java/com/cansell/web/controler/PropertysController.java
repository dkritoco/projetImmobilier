package com.cansell.web.controler;

import com.cansell.web.dao.PropertysDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class PropertysController {
        @Autowired
        private PropertysDao propertysDao;

        @GetMapping("/chercherLivingPlace")
        public ResponseEntity<List<Object[]>> getCustomPropertyData() {
            System.out.println("propertysDao Entre = " + propertysDao);
            List<Object[]> customData = propertysDao.getCustomPropertyData();
            System.out.println("customData = " + customData);
            return ResponseEntity.ok(customData);
        }
        @GetMapping("/chercherLivingPlace/{typePhoto}")
        public ResponseEntity<List<Object[]>> getCustomPropertyData(@PathVariable String typePhoto) {
            System.out.println("propertysDao Entre parametro hola hola = " + propertysDao);
            List<Object[]> customData = propertysDao.getCustomPropertyDataParameter(typePhoto);
            System.out.println("customData = " + customData);
            return ResponseEntity.ok(customData);
        }

        @GetMapping("/chercherLivingPlace/{ville}/{typePhoto}")
        public ResponseEntity<List<Object[]>> getCustomPropertyData(@PathVariable String typePhoto, @PathVariable String ville) {
            System.out.println("propertysDao Entre parametro hola hola22222 = " + propertysDao);
            List<Object[]> properties = propertysDao.getCustomPropertyDataParameterAll(ville, typePhoto);
             return ResponseEntity.ok(properties);
        }




    ;

}
