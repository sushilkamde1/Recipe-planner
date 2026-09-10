import type { Metadata } from "next";
import recipes from "@/data/recipe.json";
import Recipes from "@/components/recipe-details/Recipes";
import type { Recipe } from "@/types/recipe.types";

type Props = {
  params: Promise<{ recipeId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { recipeId } = await params;
  const recipe = (recipes as Recipe[]).find((item) => item.id === Number(recipeId));

  if (!recipe) {
    return {
      title: "Recipe not found | Recipe Planner",
      description: "The requested recipe could not be found.",
    };
  }

  return {
    title: `${recipe.name} | Recipe Planner`,
    description: `Ingredients and instructions for ${recipe.name}.`,
  };
}

async function RecipeDetailsPage({ params }: Props) {
  const { recipeId } = await params;
  return <Recipes recipeId={recipeId} />;
}

export default RecipeDetailsPage;
