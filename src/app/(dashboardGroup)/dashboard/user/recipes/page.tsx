"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TRecipe } from "@/types/recipe";


export default function ManageRecipes() {
  const [recipes, setRecipes] = useState<TRecipe[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Fetch recipes
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`)
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  // Unique categories
  const categories = [...new Set(recipes.map(r => r.category))];

  // Filter logic
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? recipe.category === category : true)
  );

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-6">Manage Recipes</h1>

      {/* Controls */}
      <div className="flex gap-4 mb-6">

        {/* Search */}
        <input
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-40 bg-white"
        />

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 bg-white"
        >
          <option value="">All Categories</option>

          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredRecipes.map(recipe => (

          <div
            key={recipe._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            <Image
              src={recipe.image}
              alt={recipe.name}
              width={400}
              height={250}
              unoptimized
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-2">

              <h3 className="font-semibold text-lg">{recipe.name}</h3>

              <p className="text-sm text-gray-500">
                {recipe.category} • {recipe.cuisine}
              </p>

              <div className="flex justify-between text-sm pt-2">
                <span>⏱ {recipe.cookingTime} min</span>
                <span>🔥 {recipe.calories} cal</span>
              </div>

              <Link
                href={`/dashboard/user/recipeDetails/${recipe._id}`}
                className="block text-center bg-green-600 text-white rounded-lg py-2 mt-3 hover:bg-green-700"
              >
                View Details
              </Link>

            </div>
          </div>

        ))}

      </div>

    </div>
  );
}
