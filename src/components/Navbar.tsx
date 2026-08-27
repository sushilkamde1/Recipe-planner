"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecipe } from "@/store/RecipeContext";

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Favorites", href: "/favorites" },
  { name: "My planner", href: "/planner" },
  { name: "Shopping List", href: "/shopping-list" },
  { name: "Cart", href: "/cart" },
];

function Navbar() {
  const { selectedIngredients } = useRecipe();
  const pathname = usePathname();

  return (
    <header className="mx-auto flex max-w-345 items-center justify-between px-5   py-5 sm:px-8 lg:px-12">
      <Link
        href="/"
        className="flex items-center gap-3"
        aria-label="Recipe Planner home"
      >
        <span className="grid h-10 w-10 place-items-center text-xl">
          <Image
            src="/logo.svg"
            alt="Recipe Planner logo"
            width={45}
            height={45}
          />
        </span>
        <span className="font-serif text-xl font-bold tracking-tight">
          Recipe Planner
        </span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-semibold text-[#66746d] md:flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative hover:text-primary ${isActive ? "text-primary" : ""}`}
            >
              {item.name}
              {item.href === "/cart" && selectedIngredients.length > 0 && (
                <span className="absolute -right-4 -top-3 grid h-5 min-w-5 place-items-center rounded-full bg-primary-200 px-1 text-[10px] font-bold text-secondary-200">
                  {selectedIngredients.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Navbar;
