let nextId = 1;
const drinkExtent = [];


class Drink {
    constructor(name, vol, taste, price, desc, photoPath, id) {
        this.name = name;
        this.vol = vol;
        this.taste = taste;
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
        let drinkIndex = drinkExtent.findIndex(d => { return d.id === parseFloat(id)})
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
        Drink.add(new Drink('Drink1', 25, 'slodki',  23, 'przykładowy opis drinka', `../img/mohito.jpg`))
        Drink.add(new Drink('Drnink2', 30, 'slodki', 15, 'przykładowy opis drinka', `../img/sotb.jpg`))
        Drink.add(new Drink('Drnink3', 25, 'slodki', 23, 'przykładowy opis drinka', `../img/mohito.jpg`))
        Drink.add(new Drink('Drink4', 30, 'slodki',  15, 'przykładowy opis drinka', `../img/sotb.jpg`))
    }
}



module.exports = Drink;

const testRoun = () => {

    let num = Math.round(4.2348952345*1000) / 1000
    console.log(num);
}

testRoun()

