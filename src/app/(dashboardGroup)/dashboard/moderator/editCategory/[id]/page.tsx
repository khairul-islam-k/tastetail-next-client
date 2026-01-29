"use client";
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';

interface TCategory {
    _id: string;
    category: string;
}
const EditCategory = () => {
    const { id } = useParams();
    const router = useRouter();
    const [category, SetCategory] = useState<TCategory>();

    const handleCategory = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const category = e.currentTarget.category.value;
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    category
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await res.json();

            if (data?.modifiedCount) {
                router.push("/dashboard/moderator/manageCategory");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
    
        }


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoryOne/${id}`)
            .then(res => res.json())
            .then(data => SetCategory(data))
    }, [id])
    return (
        <div className="bg-white p-5 rounded-2xl">
            <h3 className="text-center text-2xl font-bold">Update Category</h3>
            <form onSubmit={handleCategory}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-name">Category name</FieldLabel>
                        <Input
                            name="category"
                            defaultValue={category?.category}
                            id="fieldgroup-name" placeholder="Enter category" required />
                    </Field>

                    <Field orientation="horizontal">
                        <Button
                            className="w-full rounded-lg bg-green-600 py-2 cursor-pointer text-white font-semibold hover:bg-green-700 transition"
                            type="submit">Update Category</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default EditCategory;