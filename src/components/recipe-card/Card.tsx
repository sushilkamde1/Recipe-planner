import { Recipe } from "@/types/recipe.types";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FavoriteButton from "../custom-ui/FavoriteButton";

function Card({
  filteredRecipes,
  activeCategory,
}: {
  filteredRecipes: Recipe[];
  activeCategory: string;
}) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      {filteredRecipes.map((recipe: Recipe) => (
        <article
          key={recipe.id}
          className="group overflow-hidden rounded-[22px] border border-[#e9e6df] bg-white shadow-[0_8px_30px_rgba(53,71,64,0.04)]"
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            {!loadedImages.has(recipe.id) && (
              <div
                className="absolute inset-0 animate-pulse bg-[#ebe9df]"
                aria-label="Loading recipe image"
              />
            )}
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              onLoad={() =>
                setLoadedImages((previous) => {
                  const next = new Set(previous);
                  next.add(recipe.id);
                  return next;
                })
              }
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition duration-500 group-hover:scale-105 ${loadedImages.has(recipe.id) ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
            />

            {/* Meal Type */}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              {recipe.mealType.join(", ")}
            </span>

            {/* Favorite Button */}
            <FavoriteButton recipe={recipe} />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="font-serif text-xl font-bold text-secondary-200">
              {recipe.name}
            </h3>
            <div className="flex items-center justify-between mt-2">
              {/* Cuisine + Difficulty */}
              <div className="mt-2 flex items-center gap-2 text-sm text-tertiary">
                <span>{recipe.cuisine}</span>
                <span>•</span>
                <span>{recipe.difficulty}</span>
              </div>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <FaStar className="text-sm text-primary" />
                <span className="text-sm text-primary">{recipe.rating}</span>

                <span className="text-xs text-tertiary">
                  ({recipe.reviewCount} reviews)
                </span>
              </div>
            </div>
            {/* Recipe Details */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-y border-[#eeeae3] py-3 text-center">
              <div>
                <p className="text-xs text-tertiary">Prep</p>
                <p className="mt-1 text-sm font-bold text-secondary-200">
                  {recipe.prepTimeMinutes} min
                </p>
              </div>

              <div>
                <p className="text-xs text-tertiary">Cook</p>
                <p className="mt-1 text-sm font-bold text-secondary-200">
                  {recipe.cookTimeMinutes} min
                </p>
              </div>

              <div>
                <p className="text-xs text-tertiary">Calories</p>
                <p className="mt-1 text-sm font-bold text-secondary-200">
                  {recipe.caloriesPerServing}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="my-4 flex flex-wrap gap-2">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f7f3ed] px-2.5 py-1 text-[11px] font-medium text-tertiary"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* View More */}
            <Link
              href={`/recipes/${recipe.id}`}
              className="text-sm font-bold text-primary hover:text-primary-hover transition hover:underline "
            >
              View more
            </Link>
          </div>
        </article>
      ))}
      {filteredRecipes.length === 0 && (
        <p className="col-span-full py-12 text-center text-sm text-tertiary">
          No {activeCategory.toLowerCase()} recipes found.
        </p>
      )}
    </div>
  );
}

export default Card;
