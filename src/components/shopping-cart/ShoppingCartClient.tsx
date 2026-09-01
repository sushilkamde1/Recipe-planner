"use client";

import { SyntheticEvent, useState } from "react";
import { useRecipe } from "@/store/RecipeContext";
import { toast } from "react-toastify";
import { FaCartShopping } from "react-icons/fa6";
import Checkbox from "../custom-ui/Checkbox";
import { useRouter } from "next/navigation";
import BackButton from "../custom-ui/BackButton";
import CheckoutModal from "./CheckoutModal";
import { PaymentMethod, Recipe } from "@/types/recipe.types";
import { estimateIngredientPrice, formatCurrency } from "@/utils/recipeUtils";

function ShoppingCartClient({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const {
    plannedMeals,
    selectedIngredients,
    toggleIngredient,
    clearSelectedIngredients,
  } = useRecipe();

  const ingredientCounts = new Map<string, { label: string; count: number }>();
  plannedMeals.forEach((meal) => {
    const recipe = recipes.find((item) => item.id === meal.recipeId);
    recipe?.ingredients.forEach((ingredient) => {
      const label = ingredient.trim();
      const key = label.toLowerCase();
      const current = ingredientCounts.get(key);
      ingredientCounts.set(key, {
        label: current?.label ?? label,
        count: (current?.count ?? 0) + 1,
      });
    });
  });

  const ingredients = Array.from(ingredientCounts.values())
    .filter((ingredient) =>
      selectedIngredients.includes(ingredient.label.toLowerCase()),
    )
    .sort((a, b) => a.label.localeCompare(b.label));
  const cartValue = ingredients.reduce(
    (total, ingredient) =>
      total + estimateIngredientPrice(ingredient.label) * ingredient.count,
    0,
  );
  const discount = cartValue * 0.1;
  const totalValue = cartValue - discount;

  const handleCheckout = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsCheckoutOpen(false);
    clearSelectedIngredients();
    toast.success("Order placed! Your ingredients are on their way.");
  };

  return (
    <main className="min-h-screen bg-yellow-300 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <BackButton label="Back to ingredients" />
        <div className="flex flex-col justify-between gap-5 mt-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Ready when you are
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-secondary-200">
              Ingredient cart
            </h1>
            <p className="mt-2 text-tertiary">
              {ingredients.length
                ? `${ingredients.length} selected ${ingredients.length === 1 ? "ingredient" : "ingredients"} in your cart.`
                : "Plan a recipe to start your cart."}
            </p>
          </div>
          {selectedIngredients.length > 0 && (
            <button
              type="button"
              onClick={clearSelectedIngredients}
              className="w-fit rounded-full border border-yellow-100 px-4 py-2 text-sm font-bold text-secondary-200 transition hover:border-primary hover:text-primary"
            >
              Clear checked
            </button>
          )}
        </div>

        <section className="mt-8 overflow-hidden rounded-3xl bg-white shadow-[0_0.5rem_1.875rem_rgba(53,71,64,0.05)]">
          <div className="flex items-center justify-between bg-secondary-200 px-6 py-5 text-white sm:px-8">
            <div className="flex items-center gap-3">
              <FaCartShopping className="text-primary-200 text-2xl" />
              <h2 className="font-serif text-2xl font-bold">
                This week&apos;s cart
              </h2>
            </div>
            <span className="text-sm text-white/70">
              {ingredients.length} items
            </span>
          </div>

          {ingredients.length ? (
            <ul className="divide-y divide-primary-light px-6 sm:px-8">
              {ingredients.map((ingredient) => {
                return (
                  <li
                    key={ingredient.label}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <Checkbox
                      checked={true}
                      onChange={() => toggleIngredient(ingredient.label)}
                      label={ingredient.label}
                    />
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm font-bold text-secondary-200">
                        {formatCurrency(
                          estimateIngredientPrice(ingredient.label) *
                            ingredient.count,
                        )}
                      </span>
                      {ingredient.count > 1 && (
                        <span className="hidden rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold text-secondary-150 sm:inline-block">
                          {ingredient.count} recipes
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-6 py-14 text-center sm:px-8">
              <p className="text-tertiary">
                Your cart is waiting for a recipe.
              </p>
              <button
                className="mt-4 inline-block rounded-full bg-secondary-200 px-5 py-3 text-sm font-bold text-white hover:bg-green-100"
                onClick={() => router.back()}
              >
                Go to ingredients list
              </button>
            </div>
          )}

          {ingredients.length > 0 && (
            <div className="border-t border-primary-light bg-yellow-200 px-6 py-5 sm:px-8">
              <div className="ml-auto max-w-sm space-y-2 text-sm">
                <div className="flex justify-between text-tertiary">
                  <span>Estimated cart value</span>
                  <span>{formatCurrency(cartValue)}</span>
                </div>
                <div className="flex justify-between text-[#c45f4f]">
                  <span>Meal plan discount (10%)</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
                <div className="flex justify-between border-t border-yellow-100 pt-3 text-base font-bold text-secondary-200">
                  <span>Total estimated cost</span>
                  <span>{formatCurrency(totalValue)}</span>
                </div>
              </div>
              <p className="mt-4 text-right text-xs text-tertiary">
                Prices are estimates and may vary by store.
              </p>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-hover"
              >
                Proceed to checkout
              </button>
            </div>
          )}
        </section>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          totalValue={totalValue}
          handleCheckout={handleCheckout}
          paymentMethod={paymentMethod}
          setIsCheckoutOpen={setIsCheckoutOpen}
          setPaymentMethod={setPaymentMethod}
        />
      )}
    </main>
  );
}

export default ShoppingCartClient;
