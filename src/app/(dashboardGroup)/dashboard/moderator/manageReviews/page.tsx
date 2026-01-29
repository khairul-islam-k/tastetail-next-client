"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";

interface TReview {
  _id: string;
  recipeId: string;
  name: string;
  email: string;
  image: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: "pending" | "approved";
}

export default function ManageReviews() {
  const [reviews, setReviews] = useState<TReview[]>([]);

  const fetchReviews = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const approveReview = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be approved",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/approve/${id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (data.modifiedCount) {
        Swal.fire("Approved!", "Review is now approved.", "success");
        fetchReviews();
      }
    }
    
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-semibold">Manage Reviews</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded-xl shadow-sm bg-white space-y-3">

            <div className="flex items-center gap-3">
              <Image
                src={review.image}
                width={48}
                height={48}
                alt={review.name}
                className="rounded-full"
                unoptimized
              />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-xs text-gray-500">{review.email}</p>
                <div className="text-yellow-500 text-sm">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </div>

            {review.comment && <p className="text-gray-700">{review.comment}</p>}

            <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>

            {review.status === "pending" && (
              <button
                onClick={() => approveReview(review._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
            )}

            {review.status === "approved" && (
              <span className="text-green-600 font-semibold">Approved</span>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
