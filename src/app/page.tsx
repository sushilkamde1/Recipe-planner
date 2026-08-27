import dynamic from "next/dynamic";
import Header from "@/components/Header";

const RecipeCard = dynamic(
  () => import("@/components/recipe-card/RecipeCard"),
  {
    loading: () => (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    ),
  },
);

export default function Home() {
  return (
    <>
      <Header />
      <RecipeCard />
    </>
  );
}
