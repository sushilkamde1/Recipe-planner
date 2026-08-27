"use client";

import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRecipe } from "@/store/RecipeContext";

function SearchInput() {
  const [query, setQuery] = useState("");
  const { searchRecipes, isSearchingRecipes } = useRecipe();

  const handleSearch = () => {
    searchRecipes(query);

    requestAnimationFrame(() => {
      document.getElementById("recipe-cards")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-[#e5e1d8] bg-white p-2 shadow-[0_0.5rem_1.875rem_rgba(53,71,64,0.06)]"
    >
      <IoSearchOutline className="ml-3 shrink-0 text-2xl text-[#8a9890]" />

      <input
        className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-green-50"
        placeholder="Search recipes, ingredients, cuisines..."
        aria-label="Search recipes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        type="submit"
        disabled={isSearchingRecipes}
        className="shrink-0 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-hover"
      >
        {isSearchingRecipes ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchInput;