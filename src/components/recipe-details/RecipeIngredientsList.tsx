import { Recipe } from "@/types/recipe.types";
import React from "react";

function RecipeIngredientsList({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-3">
      {recipe.ingredients.map((ingredient: string, index: number) => (
        <div
          key={ingredient}
          className="flex items-center gap-4 rounded-xl bg-yellow-300 px-4 py-3"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f2e4dc] text-xs font-bold text-primary">
            {index + 1}
          </span>

          <span className="text-sm text-[#53645c]">{ingredient}</span>
        </div>
      ))}
    </div>
  );
}

export default RecipeIngredientsList;
