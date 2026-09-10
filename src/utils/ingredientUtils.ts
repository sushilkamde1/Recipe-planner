import { PlannedMeal, Recipe } from "@/types/recipe.types";

export type IngredientSummary = {
  label: string;
  count: number;
};

export function getIngredientSummary(
  recipes: Recipe[],
  plannedMeals: PlannedMeal[],
): IngredientSummary[] {
  const counts = new Map<string, IngredientSummary>();

  for (const meal of plannedMeals) {
    const recipe = recipes.find((item) => item.id === meal.recipeId);

    for (const ingredient of recipe?.ingredients ?? []) {
      const label = ingredient.trim();
      const key = label.toLowerCase();
      const existing = counts.get(key);

      counts.set(key, {
        label: existing?.label ?? label,
        count: (existing?.count ?? 0) + 1,
      });
    }
  }

  return [...counts.values()].sort((a, b) => a.label.localeCompare(b.label));
}