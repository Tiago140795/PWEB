const { Menu, predefinedDrinks, predefinedDishes } = require('./menuModel');

// Define the orderMenuService function
async function saveDishesMenuService(selectedDishesData){
    //console.log(JSON.stringify(selectedDishesData) + ',selectedDishes -> menuService');
    return new Promise(async (resolve, reject) => {
        try {
            const selectedFoodItems = selectedDishesData.selectedFoodItems;
            const savedDishes = [];

            for (const selectedDish of selectedFoodItems) {
                const predefinedDish = predefinedDishes.find(dish => dish.name === selectedDish.name);

                if (predefinedDish) {
                    const newMenu = new Menu({
                            name: selectedDish.name,
                            price: predefinedDish.price,
                            quantity: selectedDish.number
                    });

                    const savedDish = await newMenu.save();
                    savedDishes.push(savedDish);
                }
            }

            resolve(savedDishes); // Resolve the promise with the array of saved dishes
        } catch (error) {
            console.error('Error ordering menu:', error);
            reject(error); // Reject the promise with the error
        }
    });
}

async function saveDrinksMenuService(selectedDrinksData){
    //console.log(JSON.stringify(selectedDishesData) + ',selectedDishes -> menuService');
    return new Promise(async (resolve, reject) => {
        try {
            const selectedDrinkItems = selectedDrinksData.selectedDrinkItems;
            const savedDrinks = [];

            for (const selectedDrink of selectedDrinkItems) {
                const predefinedDrink = predefinedDishes.find(drink => drink.name === selectedDrink.name);
               
                if (predefinedDrink) {
                    const newMenu = new Menu({
                            name: selectedDrink.name,
                            price: predefinedDrink.price,
                            quantity: selectedDrink.number
                    });

                    const savedDrink = await newMenu.save();
                    savedDrinks.push(savedDrink);
                }
            }

            resolve(savedDrinks); // Resolve the promise with the array of saved dishes
        } catch (error) {
            console.error('Error ordering drink:', error);
            reject(error); // Reject the promise with the error
        }
    });
};

async function searchfoodNameMenuService(req){
    const foodName = req;
    console.log(JSON.stringify(req) + ',req-> getThisFoodMenuService');
    try {
        const foundFood = predefinedDishes.find(food => food.name === foodName); // Use a different variable name
        if(foundFood){
            console.log(JSON.stringify(foundFood) + ', foodName -> getThisFoodMenuService');
            return foundFood;
        }else{
            return [];
        }
    } catch (error) {
        console.error('Error fetching food:', error);
        return { status: 500, message: 'Internal server error' };
    }
}

// Export the orderMenuService function
module.exports = {
    saveDishesMenuService, saveDrinksMenuService, searchfoodNameMenuService
}; 