import recipes from "@/data/recipe.json";
import RecipeDetails from "./RecipeDetails";
import { Recipe } from "@/types/recipe.types";

function Recipes({ recipeId }: { recipeId: string }) {
  const recipe = (recipes as Recipe[]).find(
    (recipe) => recipe.id === Number(recipeId),
  );
  return <RecipeDetails recipe={recipe} />;
}

export default Recipes;
