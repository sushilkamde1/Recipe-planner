"use client";

import Link from "next/link";
import Card from "@/components/recipe-card/Card";
import { IoMdHeartEmpty } from "react-icons/io";
import { useRecipe } from "@/store/RecipeContext";

function FevoritesRecipes() {
  const { favorites } = useRecipe();

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#20332f]">
      <section className="mx-auto max-w-345 px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-16">
        <div className="flex flex-col justify-between gap-6 border-b border-[#e5e1d8] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Your personal collection
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Favorite recipes
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-tertiary">
              The recipes you want to make again, all in one delicious place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#d6e3d7] px-4 py-2 text-sm font-bold text-[#35564d]">
              {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"}
            </span>
            <Link
              href="/"
              className="rounded-xl bg-[#20332f] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#35564d]"
            >
              Discover recipes
            </Link>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="mx-auto flex max-w-xl flex-col items-center py-24 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#ebe9df] text-3xl text-primary">
              <IoMdHeartEmpty />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold">
              Your collection is waiting
            </h2>
            <p className="mt-2 text-sm leading-6 text-tertiary">
              Tap the heart on any recipe you love and it will show up here.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-hover"
            >
              Find a recipe
            </Link>
          </div>
        ) : (
          <Card filteredRecipes={favorites} activeCategory="favorite" />
        )}
      </section>
    </main>
  );
}

export default FevoritesRecipes;
