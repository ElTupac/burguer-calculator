const ingredients = {
  vegetable: [
    "tomato",
    "onion",
    "lettuce",
    "eggplant",
    "mushrooms",
    "bellpepper",
  ],
  protein: ["beef", "chicken", "pork", "lentils", "chickpeas"],
  cheese: ["cheddar", "gouda", "parmesan", "mozzarella"],
  bread: ["potato bread", "white bread", "sesame bread"],
  sauce: ["mayonnaise", "ketchup", "mustard", "barbaque", "chiplotle", "spicy"],
};

const isWhatIngredient = (ingredient) => {
  for (const possibility in ingredients) {
    if (
      ingredients[possibility].some(
        (possible_ingredient) => possible_ingredient === ingredient
      )
    )
      return possibility;
  }
  return null;
};

const isThisIngredient = (ingredient, guess) =>
  ingredients[guess].some((possibility) => possibility === ingredient);

const rules = [];

rules.push((burguer) => {
  const validation =
    isThisIngredient(burguer[0], "bread") &&
    isThisIngredient(burguer[burguer.length - 1], "bread");
  console.log("Tiene pan arriba y abajo: " + validation);
  return validation;
});

rules.push((burguer) => {
  let vegetableCount = 0;
  burguer.map((ingredient) => {
    if (isThisIngredient(ingredient, "vegetable")) vegetableCount++;
  });
  const validation = vegetableCount >= 2;
  console.log("Tiene al menos dos verduras: " + validation);
  return validation;
});

rules.push((burguer) => {
  let sauceCount = 0;
  burguer.map((ingredient) => {
    if (isThisIngredient(ingredient, "sauce")) sauceCount++;
  });
  const validation = sauceCount === 1;
  console.log("Tiene 1 sola salsa: " + validation);
  return validation;
});

rules.push((burguer) => {
  let proteinCount = 0;
  burguer.map((ingredient) => {
    if (isThisIngredient(ingredient, "protein")) proteinCount++;
  });
  const validation = proteinCount <= 2;
  console.log("Tiene 2 o menos proteinas: " + validation);
  return validation;
});

rules.push((burguer) => {
  const validation = !burguer.some((ingredient, index) => {
    if (isThisIngredient(ingredient, "protein")) {
      if (index === 0) return true;
      return !isThisIngredient(burguer[index - 1], "cheese");
    }
  });
  console.log(
    "Tiene queso en la posicion anterior a cualquier proteina: " + validation
  );
  return validation;
});

class Burguer {
  constructor(ingredients) {
    if (!ingredients || !Array.isArray(ingredients))
      throw "INVALID INGREDIENTS LIST/ARRAY";
    this.ingredients = ingredients;
  }

  get score() {
    return Burguer.calculateScore(this);
  }

  static calculateScore(burguer) {
    let score = 5;
    rules.map((func) => {
      if (!func(burguer)) score -= 1;
    });
    return score;
  }
}

const burguer_ingredients = [
  "white bread",
  "lettuce",
  "eggplant",
  "spicy",
  "cheddar",
  "chicken",
  "cheddar",
  "beef",
  "sesame bread",
];
console.log("The score is: " + Burguer.calculateScore(burguer_ingredients));
