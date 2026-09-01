import { Recipe } from "@/types/recipe.types";
import ShoppingCartClient from "./ShoppingCartClient";
import recipesData from "@/data/recipe.json";

export default function ShoppingCart() {
    const recipes = recipesData as Recipe[];
  return <ShoppingCartClient recipes={recipes} />;
}
