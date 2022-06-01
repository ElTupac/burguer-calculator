const ingredients = {
  vetegables: [
    "tomato",
    "onion",
    "lettuce",
    "eggplant",
    "mushrooms",
    "bellpepper",
  ],
  proteins: ["beef", "chicken", "pork", "lentils", "chickpeas"],
  cheeses: ["cheddar", "gouda", "parmesan", "mozzarella"],
  breads: ["potato bread", "white bread", "sesame bread"],
};

const rules = [];

rules.push((burguer) => {
  //Tiene pan arriba y abajo
  return true || false;
});

rules.push((burguer) => {
  //Tiene al menos dos verduras
  return true || false;
});

rules.push((burguer) => {
  //Tiene 1 sola salsa
  return true || false;
});

rules.push((burguer) => {
  //Tiene 2 o menos proteinas
  return true || false;
});

rules.push((burguer) => {
  //Tiene queso en la posicion anterior a cualquier proteina
  return false;
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
      if (!func(burguer["ingredients"])) score -= 1;
    });
    return score;
  }
}

const burguer_ingredients = ["bread"];
console.log("The score is: " + Burguer.calculateScore(burguer_ingredients));
