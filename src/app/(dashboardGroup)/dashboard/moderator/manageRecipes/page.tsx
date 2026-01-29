"use client";
import RecipeCard from '@/app/(dashboardGroup)/components/RecipeCard';
import { TRecipe } from '@/types/recipe';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageRecipe = () => {
    const [recipes, setRecipes] = useState<TRecipe[]>([]);

    const handleDelete = (id: string) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${id}`, {
                    method: 'DELETE',
                }).then(res => res.json())
                    .then(data => {
                        const remainCategory = recipes.filter(singleData => singleData._id !== id);
                        setRecipes(remainCategory);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });

                    })
            }
        });

    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`)
            .then(res => res.json())
            .then(data => setRecipes(data))
    }, [])
    return (
        <div>
            <h3 className="text-center text-2xl font-bold mb-4">Manage Recipe</h3>

            {/* card */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    recipes.map(recipe => <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                        handleDelete={ handleDelete}
                    />)
                }
            </div>


        </div>
    );
};

export default ManageRecipe;