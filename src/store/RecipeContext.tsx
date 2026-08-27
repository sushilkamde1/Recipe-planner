"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import recipesData from "@/data/recipe.json";
import { usePersistentArrayState } from "@/store/usePersistentArrayState";

import {
  DayName,
  MealSlot,
  PlannedMeal,
  Recipe,
  RecipeContextType,
} from "@/types/recipe.types";

const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined,
);

export function RecipeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const recipes = recipesData as Recipe[];

  const [searchResults, setSearchResults] =
    useState<Recipe[]>(recipes);

  const [isSearchingRecipes, setIsSearchingRecipes] =
    useState(false);

  const [favorites, setFavorites] =
    usePersistentArrayState<Recipe>("favorites", []);

  const [plannedMeals, setPlannedMeals] =
    usePersistentArrayState<PlannedMeal>("mealPlan", []);

  const [selectedIngredients, setSelectedIngredients] =
    usePersistentArrayState<string>(
      "selectedIngredients",
      [],
      "checkedCartItems",
    );

  /*
   * Search
   */
  const searchRecipes = useCallback(
    (query: string) => {
      setIsSearchingRecipes(true);

      const trimmedQuery = query.trim().toLowerCase();

      window.setTimeout(() => {
        if (!trimmedQuery) {
          setSearchResults(recipes);
          setIsSearchingRecipes(false);
          return;
        }

        const results = recipes.filter((recipe) => {
          const searchableText = [
            recipe.name,
            recipe.cuisine,
            recipe.difficulty,
            ...recipe.tags,
            ...recipe.mealType,
            ...recipe.ingredients,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(trimmedQuery);
        });

        setSearchResults(results);
        setIsSearchingRecipes(false);
      }, 250);
    },
    [recipes],
  );

  /*
   * Favorites
   */
  const addFavorite = useCallback(
    (recipe: Recipe) => {
      setFavorites((previous) => {
        if (
          previous.some(
            (item) => item.id === recipe.id,
          )
        ) {
          return previous;
        }

        return [...previous, recipe];
      });
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (id: number) => {
      setFavorites((previous) =>
        previous.filter(
          (recipe) => recipe.id !== id,
        ),
      );
    },
    [setFavorites],
  );

  const isFavorite = useCallback(
    (id: number) => {
      return favorites.some(
        (recipe) => recipe.id === id,
      );
    },
    [favorites],
  );

  /*
   * Planner
   */
  const addToPlanner = useCallback(
    (
      recipeId: number,
      day?: DayName,
      slot?: MealSlot,
    ) => {
      setPlannedMeals((previous) => [
        ...previous,
        {
          id: `${Date.now()}-${recipeId}`,
          recipeId,
          day,
          slot,
        },
      ]);
    },
    [setPlannedMeals],
  );

  const updatePlannedMeal = useCallback(
    (
      id: string,
      day: DayName,
      slot?: MealSlot,
    ) => {
      setPlannedMeals((previous) =>
        previous.map((meal) =>
          meal.id === id
            ? { ...meal, day, slot }
            : meal,
        ),
      );
    },
    [setPlannedMeals],
  );

  const removeFromPlanner = useCallback(
    (id: string) => {
      setPlannedMeals((previous) =>
        previous.filter(
          (meal) => meal.id !== id,
        ),
      );
    },
    [setPlannedMeals],
  );

  /*
   * Shopping List
   */
  const toggleIngredient = useCallback(
    (label: string) => {
      const key = label.trim().toLowerCase();

      setSelectedIngredients((previous) =>
        previous.includes(key)
          ? previous.filter(
              (ingredient) =>
                ingredient !== key,
            )
          : [...previous, key],
      );
    },
    [setSelectedIngredients],
  );

  const clearSelectedIngredients = useCallback(() => {
    setSelectedIngredients([]);
  }, [setSelectedIngredients]);

  /*
   * Context value
   */
  const contextValue = useMemo(
    () => ({
      recipes,
      favorites,
      searchResults,
      searchRecipes,
      isSearchingRecipes,

      addFavorite,
      removeFavorite,
      isFavorite,

      plannedMeals,
      addToPlanner,
      updatePlannedMeal,
      removeFromPlanner,

      selectedIngredients,
      toggleIngredient,
      clearSelectedIngredients,
    }),
    [
      recipes,
      favorites,
      searchResults,
      searchRecipes,
      isSearchingRecipes,
      addFavorite,
      removeFavorite,
      isFavorite,
      plannedMeals,
      addToPlanner,
      updatePlannedMeal,
      removeFromPlanner,
      selectedIngredients,
      toggleIngredient,
      clearSelectedIngredients,
    ],
  );

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error(
      "useRecipe must be used inside RecipeProvider",
    );
  }

  return context;
}