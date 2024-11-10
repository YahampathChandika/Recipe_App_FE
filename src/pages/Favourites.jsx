import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  useGetFavouriteRecipesQuery,
  useRemoveFavouriteRecipeMutation,
} from "../store/api/favouriteApi";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import nodata from "../assets/images/nofav.svg";

export default function Favourites() {
  const {
    data: recipes,
    isLoading,
    error,
    refetch,
  } = useGetFavouriteRecipesQuery();
  const [removeFavourites] = useRemoveFavouriteRecipeMutation();

  useEffect(() => {
    document.title = "Favourites | Cook";
  }, []);

  const handleRemoveFavourites = async (id) => {
    try {
      const response = await removeFavourites(id);
      await refetch();

      if (response.error) {
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.message,
          icon: "error",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: response?.data?.message,
        });
      }
    } catch {
      console.log("Error During the Delete");
    }
  };

  return (
    <div className="bg-blush-white min-h-screen">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[500px]">
          <CircularProgress color="error" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-red-500 min-h-[500px] md:text-lg">
          Error loading recipes. Please try again later.
        </div>
      ) : recipes?.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full text-center pt-24 md:pt-48 px-4">
          <img
            src={nodata}
            alt="No favourites"
            className="w-24 md:w-48 mb-10"
          />
          <p className="text-rose-pink md:text-2xl">
            No favourites yet. Start adding your favorite recipes!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 md:px-24 py-8 md:py-16">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={recipe.recipeImgURL}
                alt={recipe.recipeTitle}
                className="w-full h-36 md:h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">{recipe.recipeCategory}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents opening the modal
                      handleRemoveFavourites(recipe.recipeId);
                    }}
                    className="mt-2 text-rose-pink hover:text-dark-pink"
                  >
                    <i className="fas fa-heart text-xl"></i>
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-dark-pink">
                  {recipe.recipeTitle}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
