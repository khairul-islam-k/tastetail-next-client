"use client";
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface TCategories {
    _id: string;
    category: string;
}

const ManageCategory = () => {

    const [categories, SetCategories] = useState<TCategories[]>([]);
    console.log(categories);

    const handleEdit = (id: string) => {
        console.log("Edit:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete:", id);
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
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
                    method: 'DELETE',
                }).then(res => res.json())
                    .then(data => {
                        const remainCategory = categories.filter(singleData => singleData._id !== id);
                        SetCategories(remainCategory);
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
            .then((response) => response.json())
            .then((data) => SetCategories(data));
    }, [])
    return (
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-sm">
                    <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((item) => (
                        <tr key={item._id} className="border-t hover:bg-gray-50">
                            <td className="p-3 text-sm">{item._id}</td>

                            <td className="p-3 font-medium">{item.category}</td>

                            <td className="p-3 text-right space-x-2">
                                <Link href={`/dashboard/moderator/editCategory/${item._id}`}>
                                    <button
                                        onClick={() => handleEdit(item._id)}
                                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        <Pencil size={14} />
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCategory;