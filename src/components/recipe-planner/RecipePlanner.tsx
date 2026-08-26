"use client";

import Link from "next/link";
import { useState } from "react";
import { useRecipe } from "@/store/RecipeContext";
import { DayName, MealSlot } from "@/types/recipe.types";
import { days, slots } from "./recipe-planner.config";

function RecipePlanner() {
  const {
    recipes,
    plannedMeals,
    addToPlanner,
    updatePlannedMeal,
    removeFromPlanner,
  } = useRecipe();
  const [recipeId, setRecipeId] = useState(recipes[0]?.id.toString() ?? "");
  const [day, setDay] = useState<DayName>("Monday");
  const [slot, setSlot] = useState<MealSlot | "">("");

  const addMeal = () => {
    if (recipeId) {
      addToPlanner(Number(recipeId), day, slot || undefined);
    }
  };
  const unassignedMeals = plannedMeals.filter((meal) => !meal.day);

  return (
    <main className="min-h-screen bg-yellow-300 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Plan ahead
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-secondary-200">
              My weekly planner
            </h1>
            <p className="mt-2 text-tertiary">
              Build your week, one delicious meal at a time.
            </p>
          </div>
          <Link
            href="/shopping-list"
            className="w-fit rounded-full bg-primary-200 px-5 py-3 text-sm font-bold text-secondary-200 transition hover:bg-[#dd9270]"
          >
            View shopping list
          </Link>
        </div>

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(53,71,64,0.05)] sm:p-7">
          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end">
            <label className="text-sm font-semibold text-secondary-200">
              Recipe
              <select
                value={recipeId}
                onChange={(event) => setRecipeId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-yellow-100 bg-yellow-300 p-3 text-sm outline-none focus:border-primary"
              >
                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-secondary-200">
              Day
              <select
                value={day}
                onChange={(event) => setDay(event.target.value as DayName)}
                className="mt-2 w-full rounded-xl border border-yellow-100 bg-yellow-300 p-3 text-sm outline-none focus:border-primary"
              >
                {days.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-secondary-200">
              Meal slot
              <select
                value={slot}
                onChange={(event) =>
                  setSlot(event.target.value as MealSlot | "")
                }
                className="mt-2 w-full rounded-xl border border-yellow-100 bg-yellow-300 p-3 text-sm outline-none focus:border-primary"
              >
                <option value="">Any time</option>
                {slots.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={addMeal}
              className="rounded-xl bg-secondary-200 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#293a34]"
            >
              Add recipe
            </button>
          </div>
        </section>

        {unassignedMeals.length > 0 && (
          <section className="mt-8 rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(53,71,64,0.05)] sm:p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Ready to place
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-secondary-200">
                Planner list
              </h2>
              <p className="mt-2 text-sm text-tertiary">
                Choose a day and meal slot for each saved recipe.
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {unassignedMeals.map((meal) => {
                const recipe = recipes.find(
                  (item) => item.id === meal.recipeId,
                );
                return recipe ? (
                  <div
                    key={meal.id}
                    className="flex flex-col gap-3 rounded-xl bg-yellow-200 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="text-sm font-semibold text-secondary-200 hover:text-primary"
                    >
                      {recipe.name}
                    </Link>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <select
                        defaultValue=""
                        onChange={(event) => {
                          if (event.target.value) {
                            updatePlannedMeal(
                              meal.id,
                              event.target.value as DayName,
                              meal.slot,
                            );
                          }
                        }}
                        className="rounded-lg border border-yellow-100 bg-white p-2 text-sm outline-none focus:border-primary"
                        aria-label={`Choose a day for ${recipe.name}`}
                      >
                        <option value="">Choose day</option>
                        {days.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeFromPlanner(meal.id)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-[#a1aaa4] hover:text-[#c45f4f]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {days.map((currentDay) => {
            const meals = plannedMeals.filter(
              (meal) => meal.day === currentDay,
            );
            return (
              <div
                key={currentDay}
                className="min-h-44 rounded-2xl border border-[#e8e3da] bg-white p-5"
              >
                <h2 className="font-serif text-xl font-bold text-secondary-200">
                  {currentDay}
                </h2>
                <div className="mt-4 space-y-2 h-69 scrollbar-hide overflow-y-auto">
                  {meals.length === 0 ? (
                    <p className="text-sm text-[#a1aaa4]">
                      Nothing planned yet
                    </p>
                  ) : (
                    meals.map((meal) => {
                      const recipe = recipes.find(
                        (item) => item.id === meal.recipeId,
                      );
                      return recipe ? (
                        <div
                          key={meal.id}
                          className="flex items-start justify-between gap-3 rounded-xl bg-yellow-200 p-3"
                        >
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              {meal.slot || "Flexible meal"}
                            </p>
                            <Link
                              href={`/recipes/${recipe.id}`}
                              className="mt-1 block text-sm font-semibold text-secondary-200 hover:text-primary"
                            >
                              {recipe.name}
                            </Link>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromPlanner(meal.id)}
                            aria-label={`Remove ${recipe.name}`}
                            className="text-lg leading-none text-[#a1aaa4] hover:text-[#c45f4f]"
                          >
                            ×
                          </button>
                        </div>
                      ) : null;
                    })
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default RecipePlanner;
