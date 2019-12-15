const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Ingredient = require ('../model/ingredient');
const Drink = require('../model/drink');

router.get('/ingredient', (req, res, next) => {
    const ingredients = Ingredient.list();
    res.json(ingredients);
});

router.post('/ingredient', (req, res, next) => {
    const newIngredient = req.body;
    const createdIngredient = Ingredient.add(newIngredient);
    res.status(201).json(createdIngredient);
})


router.get('/drink', (req, res, next) => {
    const drinks = Drink.list();
    res.json(drinks);
});

router.get('/drink/:drinkId', (req, res, next) => {
    const drinkId = req.params.drinkId
    const drink = Drink.getDrink(drinkId)
    res.json(drink);
})

router.get('/ingredient/:drinkId', (req, res, next) => {
    const ingredientId = req.params.drinkId
    const ingredient = Ingredient.getIngredient(ingredientId)
    res.json(ingredient);
})

router.put('/drink/update', (req, res, next) => {
    const drinkData = req.body;
    const drink = Drink.editDrink(drinkData);
    res.json(drink);
})

router.delete('/ingredient/:ingredientId', (req, res, next) => {
    const ingredientId = req.params.ingredientId
    Ingredient.delete(ingredientId)
    res.json(null);
})

router.put('/ingredient/update', (req, res, next) => {
    const ingredientData = req.body;
    const ingredient = Ingredient.editIngredient(ingredientData);
    res.json(ingredient);
})

router.post('/drink', (req, res, next) => {
    const newDrink = req.body;
    const createdDrink = Drink.add(newDrink);
    res.status(201).json(createdDrink);
})

router.delete('/drink/:drinkId', (req, res, next) => {
    const ingredientId = req.params.drinkId
    Drink.delete(ingredientId)
    res.json(null);
})

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };

const upload = multer({
    dest: "../public/img"
  });
  

router.post("/upload", upload.single("file"),(req, res) => {
    console.log(req);
    const tempPath = req.file.path;
    const photoName = req.body.photoname;

    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
    const targetPath = path.join(__dirname, `../public/img/${photoName}.jpg`);
    fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res.status(201).end();
    });
    } else {
    fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
        .status(403)
        .contentType("text/plain")
        .end("Only .png files are allowed!");
    });
    }
});

module.exports.route = router;