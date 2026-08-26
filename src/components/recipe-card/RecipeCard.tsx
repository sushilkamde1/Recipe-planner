"use client";

import { useState } from "react";
import { Recipe } from "@/types/recipe.types";
import Card from "./Card";
import { useRecipe } from "@/store/RecipeContext";

function RecipeCard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { recipes, searchResults } = useRecipe();
  const categories = ["All", "Easy", "Medium", "Hard"];
  const categoryRecipes =
    activeCategory === "All"
      ? searchResults
      : searchResults.filter(
          (recipe: Recipe) => recipe.difficulty === activeCategory,
        );

  return (
    <section
      id="recipe-cards"
      className="scroll-mt-6 mx-auto max-w-345 px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Curated for you
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight">
            Find your next favorite
          </h2>
        </div>
        <div className="flex gap-2 rounded-full bg-[#ebe9df] p-1 text-sm font-semibold">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full px-3 py-2 transition ${activeCategory === category ? "bg-white text-[#20332f] shadow-sm" : "text-[#7d8a82]"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {recipes.length === 0 ? (
        <p className="text-center text-lg text-tertiary">No recipes found.</p>
      ) : (
        <Card
          filteredRecipes={categoryRecipes}
          activeCategory={activeCategory}
        />
      )}
    </section>
  );
}

export default RecipeCard;
