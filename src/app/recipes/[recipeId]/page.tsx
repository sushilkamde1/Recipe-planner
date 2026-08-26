import Recipes from "@/components/recipe-details/Recipes";
type Props = {
  params: Promise<{ recipeId: string }>;
};
async function RecipeDetailsPage({ params }: Props) {
  const { recipeId } = await params;
  return <Recipes recipeId={recipeId} />;
}

export default RecipeDetailsPage;
