import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          404 error
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold text-secondary-200 sm:text-5xl">
          Recipe not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-tertiary">
          This page may have been moved, or the recipe you are looking for does
          not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-secondary-200 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-100"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
