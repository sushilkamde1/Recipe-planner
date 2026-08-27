import { Recipe } from "@/types/recipe.types";

function RecipeInstruction({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-7">
      {recipe.instructions.map((instruction: string, index: number) => (
        <div key={instruction} className="flex gap-5">
          <div className="relative">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary-200 text-sm font-bold text-white">
              {index + 1}
            </span>

            {index !== recipe.instructions.length - 1 && (
              <span className="absolute left-1/2 top-10 h-full w-px -translate-x-1/2 bg-[#e9e6df]" />
            )}
          </div>

          <p className="pt-2 text-[0.938rem] leading-7 text-[#53645c]">
            {instruction}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RecipeInstruction;
