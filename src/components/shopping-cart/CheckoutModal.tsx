import { Props } from "@/types/recipe.types";
import { formatCurrency } from "@/utils/recipeUtils";
import { FaLock, FaXmark } from "react-icons/fa6";
import { paymentOptions } from "./shopping.config";

function CheckoutModal({
  totalValue,
  setIsCheckoutOpen,
  handleCheckout,
  paymentMethod,
  setPaymentMethod,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-secondary/50 p-0 sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsCheckoutOpen(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex shrink-0 items-start justify-between bg-secondary-200 px-6 py-5 text-white sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-200">
              Almost there
            </p>
            <h2
              id="checkout-title"
              className="mt-1 font-serif text-3xl font-bold"
            >
              Checkout
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close checkout"
            onClick={() => setIsCheckoutOpen(false)}
            className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <FaXmark />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto scrollbar-hide bg-white">
          <form
            onSubmit={handleCheckout}
            className="space-y-6 px-6 py-6 sm:px-8"
          >
            <div>
              <h3 className="mb-3 font-serif text-xl font-bold text-secondary-200">
                Delivery details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold text-secondary-200">
                  Full name
                  <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-primary-light px-4 py-3 font-normal outline-none transition focus:border-primary"
                  />
                </label>
                <label className="text-sm font-bold text-secondary-200">
                  Email address
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-primary-light px-4 py-3 font-normal outline-none transition focus:border-primary"
                  />
                </label>
                <label className="text-sm font-bold text-secondary-200 sm:col-span-2">
                  Delivery address
                  <input
                    required
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    className="mt-2 w-full rounded-xl border border-primary-light px-4 py-3 font-normal outline-none transition focus:border-primary"
                  />
                </label>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-secondary-200">
                  Payment method
                </h3>
                <span className="flex items-center gap-1 text-xs text-tertiary">
                  <FaLock /> Secure checkout
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {paymentOptions.map(({ id, label, icon: Icon }) => (
                  <label
                    key={id}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition ${paymentMethod === id ? "border-primary bg-primary-light text-secondary-200" : "border-primary-light text-tertiary hover:border-primary"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id)}
                      className="accent-primary"
                    />
                    <Icon className="shrink-0 text-primary" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold text-secondary-200 sm:col-span-2">
                  Card number
                  <input
                    required
                    name="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    className="mt-2 w-full rounded-xl border border-primary-light px-4 py-3 font-normal outline-none transition placeholder:text-tertiary/60 focus:border-primary"
                  />
                </label>
                <label className="text-sm font-bold text-secondary-200">
                  Expiry date
                  <input
                    required
                    name="expiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM / YY"
                    className="mt-2 w-full rounded-xl border border-primary-light px-4 py-3 font-normal outline-none transition placeholder:text-tertiary/60 focus:border-primary"
                  />
                </label>
                <label className="text-sm font-bold text-secondary-200">
                  CVC
                  <input
                    required
                    name="cvc"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    className="mt-2 w-full rounded-xl border border-primary-light px-4 py-3 font-normal outline-none transition placeholder:text-tertiary/60 focus:border-primary"
                  />
                </label>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-primary-light pt-5">
              <div>
                <p className="text-sm text-tertiary">Total estimated cost</p>
                <p className="font-serif text-2xl font-bold text-secondary-200">
                  {formatCurrency(totalValue)}
                </p>
              </div>
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary-hover"
              >
                Place order
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CheckoutModal;
