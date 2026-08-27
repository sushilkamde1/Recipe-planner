import { Recipe } from "@/types/recipe.types";
import RecipeHero from "./RecipeHero";
import RecipeIngredientsList from "./RecipeIngredientsList";
import RecipeInstruction from "./RecipeInstruction";
import BackButton from "../custom-ui/BackButton";

function RecipeDetails({ recipe }: { recipe: Recipe | undefined }) {
  if (!recipe) {
    return (
      <main className="min-h-screen bg-yellow-300 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-secondary-200">
            Recipe not found
          </h1>
          <BackButton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-yellow-300">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <BackButton />
      </div>
      {/* Hero */}
      <RecipeHero recipe={recipe} />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Ingredients */}
        <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_0.5rem_1.875rem_rgba(53,71,64,0.04)] sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What you&apos;ll need
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-secondary-200">
              Ingredients
            </h2>

            <p className="mt-2 text-sm text-tertiary">
              Serves {recipe.servings} people
            </p>
          </div>
          <RecipeIngredientsList recipe={recipe} />
        </div>

        {/* Instructions */}
        <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_0.5rem_1.875rem_rgba(53,71,64,0.04)] sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Let&apos;s get cooking
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-secondary-200">
              Instructions
            </h2>
          </div>

          <RecipeInstruction recipe={recipe} />
        </div>
      </section>

      {/* Tags */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[1.75rem] bg-secondary-200 p-8 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-200">
            Recipe tags
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/90"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetails;
