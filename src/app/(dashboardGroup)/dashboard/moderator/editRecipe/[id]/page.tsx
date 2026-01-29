"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Recipe {
    _id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    category: string;
    cuisine: string;
    cookingTime: number;
    calories: number;
    image: string;
}

interface Category {
    _id: string;
    category: string;
}

export default function EditRecipe() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState<Recipe | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    // Fetch recipe
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${id}`)
            .then(res => res.json())
            .then(data => setFormData(data));
    }, [id]);

    // Fetch categories
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    if (!formData) return <p>Loading...</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedRecipe = {
            ...formData,
            ingredients: formData.ingredients.toString().split(",").map(i => i.trim()),
            cookingTime: Number(formData.cookingTime),
            calories: Number(formData.calories),
        };


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedRecipe)
        });

        const data = await res.json();

        if (data.modifiedCount) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Category added successfully",
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/dashboard/moderator/manageRecipes");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">

            {/* Name */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Ingredients */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Ingredients (comma separated)</label>
                <input
                    name="ingredients"
                    value={formData.ingredients.join(",")}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Instructions */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Instructions</label>
                <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
            </div>

            {/* Category select */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat.category}>
                            {cat.category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Cuisine */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Cuisine</label>
                <input
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Cooking Time */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Cooking Time (minutes)</label>
                <input
                    type="number"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Calories */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Calories</label>
                <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Image */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Image URL</label>
                <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Submit Button */}
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Update Recipe
            </button>

        </form>
    );
}
