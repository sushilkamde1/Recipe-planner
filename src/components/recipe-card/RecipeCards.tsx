import { Recipe } from "@/types/recipe.types";
import Card from "./Card";
import { VirtuosoGrid } from "react-virtuoso";

function RecipeCards({
  filteredRecipes,
  activeCategory,
}: {
  filteredRecipes: Recipe[];
  activeCategory: string;
}) {
  if (filteredRecipes.length === 0) {
    return (
      <p className="mt-8 py-12 text-center text-sm text-tertiary">
        No {activeCategory.toLowerCase()} recipes found.
      </p>
    );
  }

  return (
    <VirtuosoGrid
      useWindowScroll
      totalCount={filteredRecipes.length}
      listClassName="mt-8 grid gap-5 md:grid-cols-3"
      itemClassName="min-w-0"
      itemContent={(index) => <Card recipe={filteredRecipes[index]} />}
    />
  );
}

export default RecipeCards;
