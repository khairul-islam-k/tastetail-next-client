"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface TCategory {
  _id: string;
  category: string;
}

export default function RecipeForm() {
  const [allCategory, setAllCategory] = useState<TCategory[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    cuisine: "",
    cookingTime: "",
    calories: "",
    image: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipe = {
      name: formData.name,
      ingredients: formData.ingredients.split(",").map(i => i.trim()),
      instructions: formData.instructions,
      category: formData.category,
      cuisine: formData.cuisine,
      cookingTime: Number(formData.cookingTime),
      calories: Number(formData.calories),
      image: formData.image
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`, {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => res.json())
      .then(data => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })

  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      .then(res => res.json())
      .then(data => setAllCategory(data));
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl bg-white p-6 rounded shadow space-y-4 mx-auto"
    >
      <h2 className="text-lg font-semibold">Add Recipe</h2>

      <input
        name="name"
        placeholder="Recipe Name"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <textarea
        name="instructions"
        placeholder="Instructions"
        className="w-full border p-2 rounded"
        rows={3}
        onChange={handleChange}
      />

      {/* CATEGORY SELECT */}

      <select
        name="category"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {
          allCategory.map(SingleData => <option
            key={SingleData._id}
            value={SingleData.category}>{SingleData.category}</option>)
        }
      </select>

      <input
        name="cuisine"
        placeholder="Cuisine"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <input
        type="number"
        name="cookingTime"
        placeholder="Cooking Time (minutes)"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <input
        type="number"
        name="calories"
        placeholder="Calories"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
