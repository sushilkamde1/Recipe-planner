"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  ReactNode,
  useState,
  useSyncExternalStore,
} from "react";

import recipesData from "@/data/recipe.json";
import {
  DayName,
  MealSlot,
  PlannedMeal,
  Recipe,
  RecipeContextType,
} from "@/types/recipe.types";

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

function usePersistentArrayState<T>(
  key: string,
  fallback: T[],
  legacyKey?: string,
): [T[], Dispatch<SetStateAction<T[]>>] {
  const storageEvent = `recipe-planner:${key}`;
  const subscribe = (onStoreChange: () => void) => {
    const handleStorageChange = (event: Event) => {
      if (event.type === "storage" || event.type === storageEvent) {
        onStoreChange();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(storageEvent, handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(storageEvent, handleStorageChange);
    };
  };
  const getSnapshot = () =>
    window.localStorage.getItem(key) ??
    (legacyKey ? window.localStorage.getItem(legacyKey) : null);
  const rawValue = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const parseValue = (raw: string | null) => {
    try {
      const parsedValue = raw ? JSON.parse(raw) : undefined;
      return Array.isArray(parsedValue) ? parsedValue : fallback;
    } catch {
      return fallback;
    }
  };
  const value = parseValue(rawValue);

  const setValue: Dispatch<SetStateAction<T[]>> = (nextValue) => {
    const currentValue = parseValue(getSnapshot());
    const resolvedValue =
      typeof nextValue === "function" ? nextValue(currentValue) : nextValue;

    window.localStorage.setItem(key, JSON.stringify(resolvedValue));
    window.dispatchEvent(new Event(storageEvent));
  };

  return [value, setValue];
}

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes] = useState<Recipe[]>(recipesData);
  const [searchResults, setSearchResults] = useState<Recipe[]>(recipesData);
  const [favorites, setFavorites] = usePersistentArrayState<Recipe>(
    "favorites",
    [],
  );
  const [plannedMeals, setPlannedMeals] = usePersistentArrayState<PlannedMeal>(
    "mealPlan",
    [],
  );
  const [selectedIngredients, setSelectedIngredients] =
    usePersistentArrayState<string>("selectedIngredients", [], "checkedCartItems");
  // Search recipes
  const searchRecipes = (query: string) => {

    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setSearchResults(recipes);
      return;
    }
    const results = recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(trimmedQuery) ||
        recipe.cuisine.toLowerCase().includes(trimmedQuery) ||
        recipe.difficulty.toLowerCase().includes(trimmedQuery) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(trimmedQuery)) ||
        recipe.mealType.some((meal) =>
          meal.toLowerCase().includes(trimmedQuery),
        ) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(trimmedQuery),
        )
      );
    });

    setSearchResults(results);
  };
  const addFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      // Don't add duplicate
      if (prev.some((item) => item.id === recipe.id)) {
        return prev;
      }

      return [...prev, recipe];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((recipe) => recipe.id === id);
  };

  const addToPlanner = (recipeId: number, day?: DayName, slot?: MealSlot) => {
    setPlannedMeals((previous) => [
      ...previous,
      { id: `${Date.now()}-${recipeId}`, recipeId, day, slot },
    ]);
  };

  const updatePlannedMeal = (id: string, day: DayName, slot?: MealSlot) => {
    setPlannedMeals((previous) =>
      previous.map((meal) =>
        meal.id === id ? { ...meal, day, slot } : meal,
      ),
    );
  };

  const removeFromPlanner = (id: string) => {
    setPlannedMeals((previous) => previous.filter((meal) => meal.id !== id));
  };

  const toggleIngredient = (label: string) => {
    const key = label.trim().toLowerCase();
    setSelectedIngredients((previous) =>
      previous.includes(key)
        ? previous.filter((ingredient) => ingredient !== key)
        : [...previous, key],
    );
  };

  const clearSelectedIngredients = () => setSelectedIngredients([]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        searchResults,
        searchRecipes,
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
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipe must be used inside RecipeProvider");
  }

  return context;
}
