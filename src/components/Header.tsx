import Image from "next/image";
import RecipeHero from "@/assets/recipe-hero.webp";
import SearchInput from "./custom-ui/SearchInput";

function Header() {
  return (
    <section className="mx-auto max-w-345 px-5 pb-8 pt-8 sm:px-8 lg:px-12 lg:pb-14 lg:pt-16">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_26.875rem]">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Your week, made delicious
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-7xl">
            Make room for
            <br />
            <em className="font-normal text-primary">good food.</em>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#68766f]">
            Plan thoughtful meals, find new favorites, and take the guesswork
            out of what&apos;s for dinner.
          </p>
          <SearchInput />
        </div>
        <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-[#d6e3d7] sm:h-80 lg:h-78.75">
          <Image
            src={RecipeHero}
            alt="Delicious food"
            fill
            className="absolute inset-0 bg-cover bg-center object-cover"
          />
          <div className="absolute bottom-5 left-5 rounded-xl bg-white/90 px-4 py-3 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Seasonal note
            </p>
            <p className="mt-1 font-serif text-lg font-bold">
              Fresh starts here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
