"use client";
import BackButton from "@/components/custom-ui/BackButton";
import { useRecipe } from "@/store/RecipeContext";
import { IngredientsList } from "./IngredientsList";

function ShoppingList() {
  const { recipes, plannedMeals } = useRecipe();
  const ingredientCounts = new Map<string, { label: string; count: number }>();

  plannedMeals.forEach((meal) => {
    const recipe = recipes.find((item) => item.id === meal.recipeId);
    recipe?.ingredients.forEach((ingredient) => {
      const label = ingredient.trim();
      const key = label.toLowerCase();
      const current = ingredientCounts.get(key);

      ingredientCounts.set(key, {
        label: current?.label ?? label,
        count: (current?.count ?? 0) + 1,
      });
    });
  });

  const ingredients = Array.from(ingredientCounts.values()).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  return (
    <main className="min-h-screen bg-yellow-300 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <BackButton label="Back to planner" />
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Everything in one place
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-secondary-200">
            Shopping list
          </h1>
          <p className="mt-2 text-tertiary">
            {plannedMeals.length
              ? `Ingredients for ${plannedMeals.length} planned ${plannedMeals.length === 1 ? "meal" : "meals"}.`
              : "Add recipes to your week to build a list."}
          </p>
        </div>
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-[0_0.5rem_1.875rem_rgba(53,71,64,0.05)] sm:p-8">
          <div className="flex items-center justify-between border-b border-primary-light pb-4">
            <h2 className="font-serif text-2xl font-bold text-secondary-200">
              Ingredients
            </h2>
            <span className="text-sm text-tertiary">
              {ingredients.length} items
            </span>
          </div>
          <IngredientsList ingredients={ingredients} />
        </section>
      </div>
    </main>
  );
}

export default ShoppingList;
