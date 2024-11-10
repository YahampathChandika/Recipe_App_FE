import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  useGetFavouriteRecipesQuery,
  useRemoveFavouriteRecipeMutation,
} from "../store/api/favouriteApi";
import Swal from "sweetalert2";
import nodata from "../assets/images/nofav.svg";
import { useGetRecipeByIdQuery } from "../store/api/recipeApi";
import { Box, CircularProgress, Modal } from "@mui/material";

export default function Favourites() {
  const [removeFavourites] = useRemoveFavouriteRecipeMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const {
    data: recipes,
    isLoading,
    error,
    refetch,
  } = useGetFavouriteRecipesQuery();
  const { data: recData } = useGetRecipeByIdQuery(selectedRecipeId, {
    skip: !selectedRecipeId,
  });

  const recipeDataById = recData?.meals[0] || [];

  useEffect(() => {
    document.title = "Favourites | Cook";
  }, []);

  const handleCardClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRecipeId(null);
  };

  const toggleInstructions = () => {
    setShowFullInstructions((prev) => !prev);
  };

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
              key={recipe.recipeId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => handleCardClick(recipe.recipeId)}
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

      {/* Modal */}
      {recData && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 650,
              bgcolor: "white",
              borderRadius: 3,
              boxShadow: 24,
              px: 4,
              py: 5,
              maxHeight: "80vh",
              overflowY: "auto",
              outline: "none",
              "@media (max-width: 768px)": { width: "90%", px: 2, py: 4 },
              "@media (max-width: 480px)": { width: "95%", px: 2, py: 4 },
            }}
            className="text-dark-pink"
          >
            <h2 className="text-center text-3xl font-bold mb-3">
              {recipeDataById.strMeal}
            </h2>
            <div className="flex items-center justify-center w-full my-5">
              <img
                src={recipeDataById.strMealThumb}
                alt={recipeDataById.strMeal}
                className="w-96 h-36 md:h-auto object-cover mb-5 rounded-lg"
              />
            </div>
            <div className="flex justify-between mb-6 md:text-xl">
              <div className="flex items-center">
                <i className="fas fa-utensils"></i>
                <p className="font-semibold ml-2 md:ml-3">
                  {recipeDataById.strCategory}
                </p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-globe"></i>
                <p className="font-semibold ml-2 md:ml-3">
                  {recipeDataById.strArea}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <p className="md:text-lg font-semibold">Instructions: </p>
              <p className="text-gray-600">
                {showFullInstructions
                  ? recipeDataById.strInstructions
                  : `${recipeDataById?.strInstructions?.slice(0, 200)}...`}
                <span
                  className="text-blue-500 cursor-pointer ml-2"
                  onClick={toggleInstructions}
                >
                  {showFullInstructions ? "Read Less" : "Read More"}
                </span>
              </p>
            </div>

            <div className="mb-6">
              <p className="md:text-lg font-semibold mb-2">Ingredients: </p>
              {Array.from({ length: 20 }, (_, i) => {
                const ingredient = recipeDataById[`strIngredient${i + 1}`];
                const measure = recipeDataById[`strMeasure${i + 1}`];
                return (
                  ingredient && (
                    <li key={i} className="text-gray-600">
                      {ingredient} {measure && `(${measure})`}
                    </li>
                  )
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-4">
              <a
                href={recipeDataById.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center space-x-1 hover:text-blue-700 transition-all"
              >
                <i className="fas fa-link"></i>
                <span className="hidden md:block">View Recipe Source</span>
                <span className="md:hidden">Source</span>
              </a>
              <a
                href={recipeDataById.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 flex items-center space-x-1 hover:text-red-700 transition-all"
              >
                <i className="fab fa-youtube"></i>
                <span className="hidden md:block">Watch on YouTube</span>
                <span className="md:hidden">YouTube</span>
              </a>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
