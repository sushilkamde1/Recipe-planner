import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { Recipe } from "@/types/recipe.types";
import RecipeHeroActions from "./RecipeHeroActions";

function RecipeHero({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <section className="mx-auto max-w-7xl px-6 py-7">
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_0.625rem_1.875rem_rgba(53,71,64,0.06)] md:grid-cols-[0.85fr_1.15fr]">
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
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.563rem] font-bold uppercase tracking-widest text-primary">
            {recipe.mealType.join(", ")}
          </span>
        </div>

        {/* Recipe information */}
        <div className="flex flex-col justify-center p-5 sm:p-6">
          {/* Category */}
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-primary">
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
              <p className="text-[0.625rem] text-tertiary">Prep</p>
              <p className="mt-0.5 text-xs font-bold text-secondary-200">
                {recipe.prepTimeMinutes}m
              </p>
            </div>

            <div className="rounded-xl bg-yellow-200 px-2 py-2.5 text-center">
              <p className="text-[0.625rem] text-tertiary">Cook</p>
              <p className="mt-0.5 text-xs font-bold text-secondary-200">
                {recipe.cookTimeMinutes}m
              </p>
            </div>

            <div className="rounded-xl bg-yellow-200 px-2 py-2.5 text-center">
              <p className="text-[0.625rem] text-tertiary">Serves</p>
              <p className="mt-0.5 text-xs font-bold text-secondary-200">
                {recipe.servings}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-200 px-2 py-2.5 text-center">
              <p className="text-[0.625rem] text-tertiary">Calories</p>
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

          {/* Client-side actions */}
          <RecipeHeroActions recipe={recipe} />
        </div>
      </div>
    </section>
  );
}

export default RecipeHero;
