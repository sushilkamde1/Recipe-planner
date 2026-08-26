export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export type DayName =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type MealSlot = "Breakfast" | "Lunch" | "Dinner";

export type PlannedMeal = {
  id: string;
  recipeId: number;
  day?: DayName;
  slot?: MealSlot;
};

export type RecipeContextType = {
  recipes: Recipe[];
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  searchResults: Recipe[];
  searchRecipes: (query: string) => void;
  plannedMeals: PlannedMeal[];
  addToPlanner: (recipeId: number, day?: DayName, slot?: MealSlot) => void;
  updatePlannedMeal: (id: string, day: DayName, slot?: MealSlot) => void;
  removeFromPlanner: (id: string) => void;
  selectedIngredients: string[];
  toggleIngredient: (label: string) => void;
  clearSelectedIngredients: () => void;
};
export type PaginationProps<T> = {
  items: T[];
  itemsPerPage?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};