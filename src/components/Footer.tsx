import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-[#dfe3dc] bg-foreground text-white">
      <div className="mx-auto max-w-345 px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Recipe Planner home"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d6e3d7]">
                <Image
                  src="/Logo.png"
                  alt="Recipe Planner logo"
                  width={20}
                  height={20}
                />
              </span>
              <span className="font-serif text-xl font-bold tracking-tight">
                Recipe Planner
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#b9c7be]">
              Plan thoughtful meals, discover new favorites, and make every week
              taste better.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a47e]">
              Explore
            </h2>
            <nav
              className="mt-4 flex flex-col gap-3 text-sm text-[#d4ddd6]"
              aria-label="Footer navigation"
            >
              <Link className="transition hover:text-white" href="/">
                Discover recipes
              </Link>
              <Link className="transition hover:text-white" href="/planner">
                My planner
              </Link>
              <Link className="transition hover:text-white" href="/favorites">
                Favorites
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a47e]">
              About
            </h2>
            <nav
              className="mt-4 flex flex-col gap-3 text-sm text-[#d4ddd6]"
              aria-label="About navigation"
            >
              <a className="transition hover:text-white" href="#top">
                Contact us
              </a>
              <a className="transition hover:text-white" href="#top">
                Our story
              </a>
              <a className="transition hover:text-white" href="#top">
                Privacy
              </a>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a47e]">
              A little inspiration
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#b9c7be]">
              Get a fresh recipe idea in your inbox each week.
            </p>
            <form className="mt-4 flex rounded-xl bg-white p-1.5">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#20332f] outline-none placeholder:text-[#8a9890]"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition hover:bg-primary-hover"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-[#91a39a] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Recipe Planner. Made for better dinners.</p>
          <p>Cook something you&apos;ll remember.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
