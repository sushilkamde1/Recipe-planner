"use client";

import Checkbox from "../custom-ui/Checkbox";
import Pagination from "../custom-ui/Pagination";
import { useRecipe } from "@/store/RecipeContext";

export function IngredientsList({
  ingredients,
}: {
  ingredients: { label: string; count: number }[];
}) {
  const { selectedIngredients, toggleIngredient } = useRecipe();

  return (
    <>
      <Pagination
        items={ingredients}
        itemsPerPage={6}
        renderItem={(ingredient) => (
          <li
            key={ingredient.label}
            className="flex items-center justify-between gap-4 border-b border-primary-light px-4 py-4"
          >
            <Checkbox
              label={ingredient.label}
              checked={selectedIngredients.includes(
                ingredient.label.toLowerCase(),
              )}
              onChange={() => toggleIngredient(ingredient.label)}
            />

            {ingredient.count > 1 && (
              <span className="shrink-0 rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold text-secondary-150">
                {ingredient.count} recipes
              </span>
            )}
          </li>
        )}
      />
    </>
  );
}
