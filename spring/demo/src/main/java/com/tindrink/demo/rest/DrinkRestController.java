package com.tindrink.demo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tindrink.demo.dao.AmountDAO;
import com.tindrink.demo.dao.DrinkDAO;
import com.tindrink.demo.dao.IngredientDAO;
import com.tindrink.demo.entity.Amount;
import com.tindrink.demo.entity.Drink;
import com.tindrink.demo.entity.Ingredient;
import com.tindrink.demo.entity.Views;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DrinkRestController {

    private DrinkDAO drinkDao;
    private IngredientDAO ingredientDao;
    private AmountDAO amountDao;

    @Autowired
    public DrinkRestController(DrinkDAO drinkDao, IngredientDAO ingredientDao, AmountDAO amountDao){
        this.drinkDao = drinkDao;
        this.ingredientDao = ingredientDao;
        this.amountDao = amountDao;
    }

    @GetMapping("/drinks")
    @JsonView(Views.List.class)
    public List<Drink> getDrinkList() {
        return drinkDao.findAll();
    }

    @GetMapping("/drinks/{drinkId}")
    @JsonView(Views.DrinkDetails.class)
    public Drink getDrinkDetail(@PathVariable int drinkId) {
        return drinkDao.findById(drinkId);
    }

    @PostMapping("/drinks")
    public ResponseEntity<String> createDrink(@RequestBody Map<String, Object> body) {

        Map<String, String> drinkMap = (Map<String, String>) body.get("drink");
        Map<String, Integer> amountMap = (Map<String, Integer>) body.get("amount");

        ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper
        Drink drink;
        try {
            drink = mapper.readValue(mapper.writeValueAsString(drinkMap), Drink.class);
            amountMap.entrySet().forEach(entry -> {
                System.out.println("Key : " + entry.getKey());
                Ingredient ing = ingredientDao.findById(Integer.parseInt(entry.getKey()));
                Amount amo = new Amount(entry.getValue());
                drink.addAmount(amo);
                ing.addAmount(amo);
                amountDao.save(amo);
            }); 
            drinkDao.save(drink);
            return new ResponseEntity<>("Drink o nazwie " + drink.getName() + " został dodany", HttpStatus.CREATED);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
            
    }

    @PutMapping("/drinks/{drinkId}")
    public ResponseEntity<String> updateDrink(@PathVariable int drinkId, @RequestBody Map<String, Object> body) {

        Map<String, String> drinkMap = (Map<String, String>) body.get("drink");
        Map<String, Integer> amountMap = (Map<String, Integer>) body.get("amount");

        ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper
        
        try{
            Drink drink = mapper.readValue(mapper.writeValueAsString(drinkMap), Drink.class);
            drink.setId(drinkId);
            drinkDao.save(drink);
            Drink dr = drinkDao.findById(drinkId);
            amountDao.deleteOnDrinkId(drinkId);

            amountMap.entrySet().forEach(entry -> {
                Ingredient ing = ingredientDao.findById(Integer.parseInt(entry.getKey()));
                Amount amo = new Amount(entry.getValue());
                dr.addAmount(amo);
                ing.addAmount(amo);
                amountDao.save(amo);
            }); 
        return new ResponseEntity<String>("Drink został zmieniony pomyślnie", HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
  
    }

    @PostMapping(value = "/drinks/photo")
    public ResponseEntity<String> updateLotImage(@RequestParam("files") MultipartFile[] files,
            RedirectAttributes redirectAttributes, HttpSession session) throws IOException {

                byte[] bytes = files[0].getBytes();
                Path path = Paths.get("./src/main/webapp/WEB-INF/images/" + files[0].getOriginalFilename());
                Files.write(path, bytes);

                return new ResponseEntity<String>("Success", HttpStatus.OK);

    }

    @DeleteMapping("/drinks/{drinkId}")
    public ResponseEntity<String> deleteDrink(@PathVariable int drinkId) {
        try {
            System.out.println("USUWAM DRINKA ");
            amountDao.deleteOnDrinkId(drinkId);
            System.out.println("USUNALEM POWIAZANIA");
            drinkDao.deleteById(drinkId);
            return new ResponseEntity<String>("Drink został usunięty", HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
        
        
    }
}
