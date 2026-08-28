
export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export const estimateIngredientPrice = (ingredient: string) => {
  const name = ingredient.toLowerCase();

  if (
    name.includes("meat") ||
    name.includes("chicken") ||
    name.includes("beef")
  ) {
    return 8.5;
  }
  if (name.includes("cheese") || name.includes("mozzarella")) {
    return 5.5;
  }
  if (name.includes("oil") || name.includes("sauce")) {
    return 4.25;
  }
  if (
    name.includes("rice") ||
    name.includes("pasta") ||
    name.includes("dough")
  ) {
    return 3.75;
  }
  if (
    name.includes("vegetable") ||
    name.includes("broccoli") ||
    name.includes("carrot")
  ) {
    return 2.75;
  }

  return 2.5;
};
