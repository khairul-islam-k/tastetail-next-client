"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface TReview {
    _id: string;
    name: string;
    image: string;
    email: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface Recipe {
    _id: string;
    name: string;
    image: string;
    ingredients: string[];
    instructions: string;
    category: string;
    cuisine: string;
    cookingTime: number;
    calories: number;
}

export default function RecipeDetails() {
    const session = useSession();
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [reviews, setReviews] = useState<TReview[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${id}`)
            .then(res => res.json())
            .then(data => setRecipe(data))
    }, [id])

    // reviews
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [id])

    if (!recipe) return <p>Loading...</p>;

    const submitReview = async () => {
        const review = {
            recipeId: id,
            name: session.data?.user?.name,
            email: session.data?.user?.email,
            image: session.data?.user?.image,
            rating,
            comment,
            status: "pending",
            createdAt: new Date()
        };


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review)
        });

        const data = await res.json();
        console.log(data);

        if (data.insertedId) {
            Swal.fire("Thanks!", "Review added!", "success");
            setComment("");
            setRating(5);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">

            {/* Header */}
            <Image
                src={recipe.image}
                alt={recipe.name}
                width={800}
                height={400}
                unoptimized
                className="rounded-xl w-full h-80 object-cover"
            />

            <h1 className="text-3xl font-bold">{recipe.name}</h1>

            <p className="text-gray-500">
                {recipe.category} • {recipe.cuisine}
            </p>

            <div className="flex gap-6">
                <span>⏱ {recipe.cookingTime} min</span>
                <span>🔥 {recipe.calories} cal</span>
            </div>

            {/* Ingredients */}
            <div>
                <h2 className="font-semibold text-xl mb-2">Ingredients</h2>
                <ul className="list-disc pl-6">
                    {recipe.ingredients.map((i, idx) => (
                        <li key={idx}>{i}</li>
                    ))}
                </ul>
            </div>

            {/* Instructions */}
            <div>
                <h2 className="font-semibold text-xl mb-2">Instructions</h2>
                <p className="leading-relaxed">{recipe.instructions}</p>
            </div>

            {/* Reviews */}
            {reviews.map(review => (
                <div key={review._id} className="border rounded-xl p-4 bg-white shadow-sm space-y-3">

                    {/* User info */}
                    <div className="flex items-center gap-3">

                        <Image
                            src={review.image}
                            alt="user"
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                            unoptimized
                        />

                        <div>
                            <h3 className="font-semibold">{review.name}</h3>
                            <p className="text-xs text-gray-500">{review.email}</p>

                            {/* Stars */}
                            <div className="text-yellow-500 text-sm">
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </div>
                        </div>

                    </div>

                    {/* Comment */}
                    {review.comment && (
                        <p className="text-gray-700">{review.comment}</p>
                    )}

                    {/* Date */}
                    <p className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                    </p>

                </div>
            ))}

            {/* Add Review */}
            <div className="border rounded-lg p-4 space-y-3 bg-white">

                <h3 className="font-semibold">Add Review</h3>

                {/* Stars */}
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border rounded p-2"
                >
                    {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{n} Star</option>
                    ))}
                </select>

                <textarea
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded w-full p-2 mt-2"
                />

                <Button
                    onClick={submitReview}
                    className="bg-green-600 cursor-pointer rounded hover:bg-green-700"
                >
                    Submit Review
                </Button>

            </div>

        </div>
    );
}
