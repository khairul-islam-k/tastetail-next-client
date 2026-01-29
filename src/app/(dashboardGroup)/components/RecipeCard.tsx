import { Button } from "@/components/ui/button";
import { TRecipe } from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: TRecipe;
  handleDelete: (id: string) => void;
}

export default function RecipeCard({ recipe, handleDelete }: RecipeCardProps) {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

            {/* Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    height={200}
                    width={300}
                    unoptimized
                    className="object-cover w-full h-52 mx-auto"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold mt-4">{recipe.name}</h3>

                <p className="text-sm text-gray-500">
                    {recipe.category} • {recipe.cuisine}
                </p>

                <div className="flex justify-between text-sm text-gray-600 pt-2">
                    <span>⏱ {recipe.cookingTime} min</span>
                    <span>🔥 {recipe.calories} cal</span>
                </div>

                <div className="flex gap-3">
                    <Link href={`/dashboard/moderator/editRecipe/${recipe._id}`}>
                        <Button className="rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">Edit</Button>
                    </Link>
                    <Button
                    onClick={() => handleDelete(recipe._id)}
                    >Delete</Button>
                </div>


            </div>

        </div>
    );
}
