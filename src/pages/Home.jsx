import React, { useEffect, useState } from "react";
import { useGetRecipeByCategoryQuery } from "../store/api/recipeApi";
import Navbar from "../components/Navbar";
import { Box, CircularProgress, Modal } from "@mui/material";
import { useAddFavouriteRecipeMutation } from "../store/api/favouriteApi";
import Swal from "sweetalert2";

export default function Home() {
  const [selectedType, setSelectedType] = useState("Chicken");
  const [favorites, setFavorites] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const {
    data: recipeData,
    isLoading,
    error,
  } = useGetRecipeByCategoryQuery(selectedType);
  const [addFavoriteRecipe] = useAddFavouriteRecipeMutation();

  const recipeTypes = ["Chicken", "Pork", "Seafood", "Pasta", "Dessert"];

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenModal(true);
  };

  const handleFavoriteClick = async (recipe) => {
    const {
      idMeal: recipeId,
      strMeal: recipeTitle,
      strCategory: recipeCategory,
      strMealThumb: recipeImgURL,
    } = recipe;

    try {
      await addFavoriteRecipe({
        recipeId,
        recipeTitle,
        recipeCategory: selectedType,
        recipeImgURL,
      });

      // Update favorites state to indicate this recipe is now favorited
      setFavorites(
        (prevFavorites) =>
          prevFavorites.includes(recipeId)
            ? prevFavorites.filter((id) => id !== recipeId) // Remove if already in favorites
            : [...prevFavorites, recipeId] // Add if not in favorites
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Recipe added to favourites!",
      });
    } catch (error) {
      console.error("Error adding recipe to favourites:", error);
      alert("Failed to add recipe to favourites.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRecipe(null);
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
            {recipeData?.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => handleCardClick(recipe)}
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
                      e.stopPropagation(); // Prevents opening the modal
                      handleFavoriteClick(recipe);
                    }}
                  >
                    {favorites.includes(recipe.idMeal) ? (
                      <i class="fas fa-heart text-xl"></i>
                    ) : (
                      <i class="far fa-heart text-xl"></i>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "white",
              borderRadius: 3,
              boxShadow: 24,
              px: 4,
              py: 5,
              maxHeight: "80vh",
              overflowY: "auto",
              outline: "none",

              // Responsive styles
              "@media (max-width: 768px)": {
                width: "90%",
                px: 2,
                py: 4,
              },
              "@media (max-width: 480px)": {
                width: "95%",
                px: 2,
                py: 4,
              },
            }}
            className="text-dark-pink"
          >
            <h2 className="text-center text-2xl font-bold mb-3">
              {selectedRecipe.strMeal}
            </h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-36 md:h-48 object-cover mb-5"
            />
            <div className="flex justify-between mb-6 md:text-xl">
              <div className="flex items-center">
                <i class="fas fa-utensils"></i>
                <p className=" font-semibold ml-2 md:ml-3">
                  {selectedRecipe.strCategory}
                </p>
              </div>
              <div className="flex items-center">
                <i class="fas fa-globe"></i>
                <p className=" font-semibold ml-2 md:ml-3">
                  {selectedRecipe.strArea}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <p className="md:text-lg font-semibold">Instructions: </p>
              <p>{selectedRecipe.strInstructions}</p>
            </div>
            <div className="mb-6">
              <p className="md:text-lg font-semibold">Ingredients: </p>
              <p>
                {selectedRecipe.strIngredient1} ({selectedRecipe.strMeasure1})
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <a
                href={selectedRecipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center space-x-1 hover:text-blue-700 transition-all"
              >
                <i className="fas fa-link"></i>
                <span>Source</span>
              </a>
              <a
                href={selectedRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 flex items-center space-x-1 hover:text-red-700 transition-all"
              >
                <i className="fab fa-youtube"></i>
                <span>Youtube</span>
              </a>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
