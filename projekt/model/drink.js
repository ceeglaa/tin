let nextId = 1;
const drinkExtent = [];

const ing = require('./ingredient');

class Drink {
    constructor(name, vol, taste, ingredients, price, desc, photoPath, id) {
        this.name = name;
        this.vol = vol;
        this.taste = taste;
        this.ingredients = ingredients;
        this.price = price;
        this.desc = desc;
        this.photoPath = photoPath;
        this.id = id;
    }

    static add(drink) {
        drink.id = nextId++;
        drinkExtent.push(drink);
        return drink;
    }

    static list() {
        return drinkExtent;
    }

    static getDrink(drinkId) {
       let res =  drinkExtent.filter(d => {
            return d.id === parseFloat(drinkId);
        });

        return res;
    }

    static delete(id) {
        console.log(id);
        let drinkIndex = drinkExtent.findIndex(d => {d.id === parseFloat(id)})
        console.log(drinkIndex);
        drinkExtent.splice(drinkIndex, 1);
    } 

    static editDrink(drink) {
        let res =  drinkExtent.filter(d => {
            return d.id === parseFloat(drink.id);
        });
        res[0].name = drink.name;
        res[0].vol = drink.vol;
        res[0].taste = drink.taste;
        res[0].ingredients = drink.ingredients;
        res[0].price = drink.price;
        res[0].desc = drink.desc;


        return res;
    }

    static initData() {
        let allIngredients = ing.list();
        let ing1 = allIngredients[0];
        let ing2 = allIngredients[1];
        let ing3 = allIngredients[2];
        Drink.add(new Drink('Drink1', 25, 'slodki', [{ingredient: ing1, quantity: 34}, {ingredient: ing2, quantity: 36}], 23, 'przykładowy opis drinka', `../img/mohito.jpg`))
        Drink.add(new Drink('Drnink2', 30, 'slodki', [{ingredient: ing2, quantity: 50}, {ingredient: ing3, quantity: 100}], 15, 'przykładowy opis drinka', `../img/sotb.jpg`))
        Drink.add(new Drink('Drnink3', 25, 'slodki', [{ingredient: ing1, quantity: 34}, {ingredient: ing2, quantity: 36}], 23, 'przykładowy opis drinka', `../img/mohito.jpg`))
        Drink.add(new Drink('Drink4', 30, 'slodki', [{ingredient: ing2, quantity: 50}, {ingredient: ing3, quantity: 100}], 15, 'przykładowy opis drinka', `../img/sotb.jpg`))
    }
}

Drink.initData();

module.exports = Drink;