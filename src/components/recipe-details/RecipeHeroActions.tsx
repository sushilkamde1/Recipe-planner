"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRecipe } from "@/store/RecipeContext";
import { Recipe } from "@/types/recipe.types";

function RecipeHeroActions({ recipe }: { recipe: Recipe }) {
  const [isAddedToPlanner, setIsAddedToPlanner] = useState(false);

  const {
    favorites,
    isFavorite,
    removeFavorite,
    addFavorite,
    addToPlanner,
  } = useRecipe();

  const router = useRouter();

  const handleFavoriteClick = () => {
    if (favorites.some((fav) => fav.id === recipe.id)) {
      removeFavorite(recipe.id);

      toast.info(`${recipe.name} removed from favorites.`);
    } else {
      addFavorite(recipe);

      toast.success(`${recipe.name} added to favorites.`);
    }
  };

  const handlePlannerClick = () => {
    if (isAddedToPlanner) {
      router.push("/planner"); 
      return;
    }

    addToPlanner(recipe.id);
    setIsAddedToPlanner(true);

    toast.success(`${recipe.name} added to your planner list.`);
  };

  return (
    <div className="mt-5 flex gap-2">
      <button
        type="button"
        onClick={handlePlannerClick}
        className="rounded-full bg-secondary-200 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-green-100"
      >
        {isAddedToPlanner ? "Go to planner" : "Add to planner"}
      </button>

      <button
        type="button"
        onClick={handleFavoriteClick}
        className={`rounded-full border border-yellow-100 bg-white px-4 py-2.5 text-xs font-bold text-secondary-200 transition hover:border-primary hover:text-primary ${
          isFavorite(recipe.id)
            ? "border-primary! bg-primary text-primary!"
            : ""
        }`}
      >
        {isFavorite(recipe.id) ? "Saved" : "Save"}
      </button>
    </div>
  );
}

export default RecipeHeroActions;
