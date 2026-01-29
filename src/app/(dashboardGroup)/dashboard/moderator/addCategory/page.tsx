"use client";
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';

const AddCategory = () => {

    const handleCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const category = e.currentTarget.category.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
            method: 'POST',
            body: JSON.stringify({
                category
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        console.log(data);
        if (data?.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Category added successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <div className="bg-white p-5 rounded-2xl">
            <h3 className="text-center text-2xl font-bold">Add New Category</h3>
            <form onSubmit={handleCategory}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-name">Category name</FieldLabel>
                        <Input
                            name="category"
                            id="fieldgroup-name" placeholder="Enter category" required />
                    </Field>

                    <Field orientation="horizontal">
                        <Button
                            className="w-full rounded-lg bg-green-600 py-2 cursor-pointer text-white font-semibold hover:bg-green-700 transition"
                            type="submit">Add Category</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default AddCategory;