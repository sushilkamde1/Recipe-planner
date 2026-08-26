import { useRecipe } from "@/store/RecipeContext";
import { Recipe } from "@/types/recipe.types";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { toast } from "react-toastify";

function FavoriteButton({ recipe }: { recipe: Recipe }) {
  const { addFavorite, removeFavorite, isFavorite } = useRecipe();
  const handleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
      toast.info(`${recipe.name} removed from favorites.`);
    } else {
      addFavorite(recipe);
      toast.success(`${recipe.name} added to favorites!`);
    }
  };
  return (
    <button
      type="button"
      className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg text-primary transition hover:bg-white"
      aria-label={`${isFavorite(recipe.id) ? "Remove from" : "Add to"} favorites`}
      aria-pressed={isFavorite(recipe.id)}
      onClick={() => handleFavorite(recipe)}
    >
      {isFavorite(recipe.id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
    </button>
  );
}

export default FavoriteButton;
