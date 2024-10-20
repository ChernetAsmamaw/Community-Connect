"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getReviews, postReview } from "@/app/_services/GlobalApi";
import { Star } from "lucide-react";

function BusinessReviews({ business }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Fetch existing reviews
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews(business.id);
        console.log("Fetched reviews:", reviewsData); // Log the fetched reviews
        setReviews(reviewsData);

        // Calculate the average rating
        const totalRating = reviewsData.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        // Avoid division by zero
        const avgRating = reviewsData.length
          ? totalRating / reviewsData.length
          : 0;
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [business.id]);

  const handlePostReview = async () => {
    if (!session || !session.user?.email) {
      console.error("User email not found, cannot post review.");
      return;
    }

    try {
      const newReviewData = await postReview(
        business.id,
        newRating,
        newReview,
        newCustomerName
      );
      setReviews([...reviews, newReviewData]);
      setNewReview("");
      setNewRating(0);
      setNewCustomerName("");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} />
    ));
  };

  return (
    <div className="mt-10 p-6 bg-white border rounded-lg shadow-md w-full">
      <h2 className="text-2xl text-primary font-bold mb-4">
        Reviews for {business.name}
      </h2>

      {/* Section 1: Average Rating */}
      <div className="mb-6">
        <h3 className="text-xl text-green-950 font-semibold">Ratings</h3>
        <div className="flex items-center">
          {renderStars(Math.round(averageRating))}
          <p className="ml-2 text-lg">({averageRating.toFixed(1)} / 5)</p>
        </div>
      </div>

      {/* Section 2: List of Past Reviews */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          {" "}
          Here is what our clients say:
        </h3>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              console.log(`Rendering review ${index + 1}`, review);
              return (
                <div
                  key={review.id || index}
                  className="p-4 bg-gray-100 rounded-lg"
                >
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="mt-2">{review.review}</p>
                    <p className="mt-2 text-md text-gray-500 italic">
                      ~ {review.userFullName}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </div>

      {/* Section 3: Post a Review */}
      {session && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Leave us a review </h3>
          <textarea
            className="w-full p-2 border rounded-lg mb-2"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here"
          />
          <input
            className="w-full p-2 border rounded-lg mb-2"
            type="number"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            placeholder="Rating (0 to 5)"
            min="0"
            max="5"
          />
          <input
            className="w-full p-2 border rounded-lg mb-2"
            type="text"
            value={newCustomerName}
            onChange={(e) => setNewCustomerName(e.target.value)}
            placeholder="Your Name"
          />
          <button
            className="w-full bg-primary text-white p-2 rounded-lg"
            onClick={handlePostReview}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default BusinessReviews;
