let nextId = 1;
const ingredientExtent = [];

class Ingredient {
    constructor(name, isAlc, isGas, price, taste, vol, id) {
        this.name = name;
        this.isAlc = isAlc;
        this.isGas = isGas;
        this.price = price;
        this.taste = taste;
        this.vol = vol;
        this.id = id;
    }

    //dodawanie obiektu do bazy
    static add(ingredient) {
        console.log('dodajemy skladnik')
        ingredient.id = nextId++;
        ingredientExtent.push(ingredient);
        return ingredient;
    }

    static list() {
        return ingredientExtent;
    }
    static getIngredient(ingredientId) {
        let res =  ingredientExtent.filter(i => {
             return i.id === parseFloat(ingredientId);
         });
 
         return res;
     }

    static editIngredient(ingredient) {
        let res =  ingredientExtent.filter(i => {
            return i.id === parseFloat(ingredient.id);
        });

        res[0].name = ingredient.name;
        res[0].isAlc = ingredient.isAlc;
        res[0].isGas = ingredient.isGas;
        res[0].price = ingredient.price;
        res[0].taste = ingredient.taste;
        res[0].vol = ingredient.vol;

        return res;
    }
    //usuwanie obiektu po id
    static delete(id) {
        let ingIndex = ingredientExtent.findIndex(i => { return i.id === id})
        ingredientExtent.splice(ingIndex, 1);
    } 
    static details(id) {
        //FIXME
    }

    static initData() {
        ingredientExtent.splice(0, ingredientExtent.length);
        Ingredient.add(new Ingredient('Pepsi', false, true, 3, 'slodki'));
        Ingredient.add(new Ingredient('Mirinda', false, true, 3, 'slodki'));
        Ingredient.add(new Ingredient('Vodka', true, false, 20, 'gorzki', 40));
    }
}

Ingredient.initData();

module.exports = Ingredient;