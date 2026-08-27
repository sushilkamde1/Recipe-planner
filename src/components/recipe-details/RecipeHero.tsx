import { useRecipe } from "@/store/RecipeContext";
import { Recipe } from "@/types/recipe.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";

function RecipeHero({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const router = useRouter();
  const [isAddedToPlanner, setIsAddedToPlanner] = useState(false);
  const { favorites, isFavorite, removeFavorite, addFavorite, addToPlanner } =
    useRecipe();
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
    <section className="mx-auto max-w-7xl px-6 py-7">
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(53,71,64,0.06)] md:grid-cols-[0.85fr_1.15fr]">
        {/* Image */}
        <div className="relative h-70 md:h-90">
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={600}
            height={400}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* Meal type */}
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-primary">
            {recipe.mealType.join(", ")}
          </span>
        </div>

        {/* Recipe information */}
        <div className="flex flex-col justify-center p-5 sm:p-6">
          {/* Category */}
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            {recipe.cuisine} Cuisine
          </p>

          {/* Title */}
          <h1 className="mt-2 font-serif text-2xl font-bold leading-tight text-secondary-200 sm:text-3xl">
            {recipe.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-primary">
              <FaStar className="text-sm text-primary" />
              <span className="font-bold">{recipe.rating}</span>
            </div>

            <span className="text-xs text-tertiary">
              ({recipe.reviewCount})
            </span>
          </div>

          {/* Description */}
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6f7d76]">
            A delicious {recipe.cuisine.toLowerCase()} recipe made with fresh
            ingredients. Perfect for a satisfying{" "}
            {recipe.mealType.join(" and ").toLowerCase()} meal.
          </p>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            <div className="rounded-xl bg-yellow-200 px-2 py-2.5 text-center">
              <p className="text-[10px] text-tertiary">Prep</p>
              <p className="mt-0.5 text-xs font-bold text-secondary-200">
                {recipe.prepTimeMinutes}m
              </p>
            </div>

            <div className="rounded-xl bg-yellow-200 px-2 py-2.5 text-center">
              <p className="text-[10px] text-tertiary">Cook</p>
              <p className="mt-0.5 text-xs font-bold text-secondary-200">
                {recipe.cookTimeMinutes}m
              </p>
            </div>

            <div className="rounded-xl bg-yellow-200 px-2 py-2.5 text-center">
              <p className="text-[10px] text-tertiary">Serves</p>
              <p className="mt-0.5 text-xs font-bold text-secondary-200">
                {recipe.servings}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-200 px-2 py-2.5 text-center">
              <p className="text-[10px] text-tertiary">Calories</p>
              <p className="mt-0.5 text-xs font-bold text-secondary-200">
                {recipe.caloriesPerServing}
              </p>
            </div>
          </div>

          {/* Difficulty */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="text-tertiary">Difficulty:</span>

            <span className="rounded-full bg-secondary-100 px-2.5 py-1 font-bold text-secondary-150">
              {recipe.difficulty}
            </span>

            <div className="text-tertiary">
              <span className="inline-block align-middle">
                <GoDotFill />
              </span>{" "}
              {totalTime} min
            </div>
          </div>

          {/* Actions */}
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
              className={`rounded-full border border-yellow-100 bg-white px-4 py-2.5 text-xs font-bold text-secondary-200 transition hover:text-primary hover:border-primary ${isFavorite(recipe.id) ? "bg-primary text-primary border border-primary!" : ""}`}
              onClick={handleFavoriteClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeHero;
