import React, { useEffect, useState } from "react";
import {
  useGetRecipeByCategoryQuery,
  useGetRecipeByIdQuery,
} from "../store/api/recipeApi";
import Navbar from "../components/Navbar";
import { Box, CircularProgress, Modal } from "@mui/material";
import {
  useAddFavouriteRecipeMutation,
  useGetFavouriteRecipesQuery,
} from "../store/api/favouriteApi";
import Swal from "sweetalert2";

export default function Home() {
  const [selectedType, setSelectedType] = useState("Chicken");
  const [favorites, setFavorites] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const { data, isLoading, error } = useGetRecipeByCategoryQuery(selectedType);
  const { data: recData } = useGetRecipeByIdQuery(selectedRecipeId, {
    skip: !selectedRecipeId,
  });
  const [addFavoriteRecipe] = useAddFavouriteRecipeMutation();
  const { refetch: refetchFavourites } = useGetFavouriteRecipesQuery();

  const recipeData = data?.meals || [];
  const recipeDataById = recData?.meals[0] || [];

  const recipeTypes = ["Chicken", "Pork", "Seafood", "Pasta", "Dessert"];

  const handleCardClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setOpenModal(true);
  };

  const toggleInstructions = () => {
    setShowFullInstructions((prev) => !prev);
  };

  const handleFavoriteClick = async (recipe) => {
    const {
      idMeal: recipeId,
      strMeal: recipeTitle,
      strCategory: recipeCategory,
      strMealThumb: recipeImgURL,
    } = recipe;

    try {
      const response = await addFavoriteRecipe({
        recipeId,
        recipeTitle,
        recipeCategory: selectedType,
        recipeImgURL,
      });

      setFavorites((prevFavorites) =>
        prevFavorites.includes(recipeId)
          ? prevFavorites.filter((id) => id !== recipeId)
          : [...prevFavorites, recipeId]
      );

      refetchFavourites();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      if (response.error) {
        Toast.fire({
          icon: "warning",
          title:
            response.error.data?.message || "Recipe already in favourites.",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: response.data?.message || "Recipe added to favourites!",
        });
      }
    } catch (error) {
      console.error("Error adding recipe to favourites:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add recipe to favourites.",
        text: "Please try again later.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRecipeId(null);
    setShowFullInstructions(false);
  };

  useEffect(() => {
    document.title = "Home | Cook";
  }, []);

  return (
    <div className="bg-blush-white min-h-screen">
      <Navbar />
      <div className="px-4 md:px-24">
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-10 py-6 md:py-12">
          {recipeTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 md:px-12 md:py-4 mb-2 md:mb-0 rounded-full font-medium transition duration-300 ${
                selectedType === type
                  ? "bg-rose-pink text-white"
                  : "bg-transparent border border-rose-pink text-rose-pink"
              } hover:bg-rose-pink hover:text-white`}
            >
              {type}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[500px]">
            <CircularProgress color="error" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center text-red-500 min-h-[500px] md:text-lg">
            Error loading recipes. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 px-2 py-4">
            {recipeData.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => handleCardClick(recipe.idMeal)}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-36 md:h-48 object-cover"
                />
                <div className="flex justify-between p-4">
                  <div className="flex flex-col justify-between items-left">
                    <p className="text-gray-500">{selectedType}</p>
                    <h3 className="text-lg font-semibold text-dark-pink">
                      {recipe.strMeal}
                    </h3>
                  </div>

                  <button
                    className="mt-2 text-dark-pink hover:text-rose-pink"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(recipe);
                    }}
                  >
                    {favorites.includes(recipe.idMeal) ? (
                      <i className="fas fa-heart text-xl"></i>
                    ) : (
                      <i className="far fa-heart text-xl"></i>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
                  : `${recipeDataById.strInstructions.slice(0, 200)}...`}
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
