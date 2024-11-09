// import React, { useState } from "react";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   const [selectedType, setSelectedType] = useState("");
//   const recipeTypes = [
//     "Appetizer",
//     "Main Course",
//     "Dessert",
//     "Snack",
//     "Beverage",
//   ];
//   const recipes = [
//     {
//       id: 1,
//       image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
//       category: "Appetizer",
//       name: "Bruschetta",
//     },
//     {
//       id: 2,
//       image:
//         "https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg",
//       category: "Main Course",
//       name: "Pasta Carbonara",
//     },
//     {
//       id: 3,
//       image:
//         "https://www.themealdb.com/images/media/meals/lpd4wy1614347943.jpg",
//       category: "Dessert",
//       name: "Chocolate Cake",
//     },
//     {
//       id: 4,
//       image: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
//       category: "Snack",
//       name: "Nachos",
//     },
//     {
//       id: 5,
//       image:
//         "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
//       category: "Beverage",
//       name: "Smoothie",
//     },
//   ];

//   const filteredRecipes = selectedType
//     ? recipes.filter((recipe) => recipe.category === selectedType)
//     : recipes;

//   return (
//     <div className="bg-blush-white min-h-screen">
//       <Navbar userName="User Name" />
//       <div className="px-4 md:px-24">
//         <div className="flex flex-wrap justify-center space-x-2 md:space-x-10 py-6 md:py-12">
//           {recipeTypes.map((type) => (
//             <button
//               key={type}
//               onClick={() => setSelectedType(selectedType === type ? "" : type)}
//               className={`px-4 py-2 md:px-12 md:py-4 mb-2 md:mb-0 rounded-full font-medium transition duration-300 ${
//                 selectedType === type
//                   ? "bg-rose-pink text-white"
//                   : "bg-transparent border border-rose-pink text-rose-pink"
//               } hover:bg-rose-pink hover:text-white`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-2 py-4">
//           {filteredRecipes.map((recipe) => (
//             <div
//               key={recipe.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
//             >
//               <img
//                 src={recipe.image}
//                 alt={recipe.name}
//                 className="w-full h-36 md:h-48 object-cover"
//               />
//               <div className="p-4">
//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-500">{recipe.category}</p>
//                   <button className="mt-2 text-dark-pink hover:text-rose-pink">
//                     <span className="material-symbols-outlined">favorite</span>
//                   </button>
//                 </div>
//                 <h3 className="text-lg font-semibold text-dark-pink">
//                   {recipe.name}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Modal, Box } from "@mui/material";

export default function Home() {
  const [selectedType, setSelectedType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipeTypes = [
    "Appetizer",
    "Main Course",
    "Dessert",
    "Snack",
    "Beverage",
  ];

  const recipes = [
    {
      id: 1,
      image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      category: "Appetizer",
      name: "Bruschetta",
      strMeal: "Bruschetta",
      strCategory: "Appetizer",
      strArea: "Italy",
      strInstructions: "Preheat oven to 375°F. Toast slices of baguette.",
      strYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      strIngredient1: "Baguette , Tortilla Chips",
      strMeasure1: "1 loaf , 2 kg",
      strSource: "https://www.themealdb.com/recipe.php?id=1",
    },
    {
      id: 2,
      image:
        "https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg",
      category: "Main Course",
      name: "Pasta Carbonara",
      strMeal: "Pasta Carbonara",
      strCategory: "Main Course",
      strArea: "Italy",
      strInstructions: "Boil pasta, fry bacon, mix with eggs and cheese.",
      strYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      strIngredient1: "Spaghetti",
      strMeasure1: "200g",
      strSource: "https://www.themealdb.com/recipe.php?id=2",
    },
    {
      id: 3,
      image:
        "https://www.themealdb.com/images/media/meals/lpd4wy1614347943.jpg",
      category: "Dessert",
      name: "Chocolate Cake",
      strMeal: "Chocolate Cake",
      strCategory: "Dessert",
      strArea: "Worldwide",
      strInstructions:
        "Preheat oven, mix dry ingredients, bake for 30 minutes.",
      strYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      strIngredient1: "Flour",
      strMeasure1: "2 cups",
      strSource: "https://www.themealdb.com/recipe.php?id=3",
    },
    {
      id: 4,
      image: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
      category: "Snack",
      name: "Nachos",
      strMeal: "Nachos",
      strCategory: "Snack",
      strArea: "Mexico",
      strInstructions: "Layer chips with cheese and bake until melted.",
      strYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      strIngredient1: "Tortilla Chips",
      strMeasure1: "2 cups",
      strSource: "https://www.themealdb.com/recipe.php?id=4",
    },
    {
      id: 5,
      image:
        "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
      category: "Beverage",
      name: "Smoothie",
      strMeal: "Smoothie",
      strCategory: "Beverage",
      strArea: "Worldwide",
      strInstructions: "Blend fruits with yogurt and serve chilled.",
      strYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      strIngredient1: "Banana",
      strMeasure1: "1",
      strSource: "https://www.themealdb.com/recipe.php?id=5",
    },
  ];

  const filteredRecipes = selectedType
    ? recipes.filter((recipe) => recipe.category === selectedType)
    : recipes;

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="bg-blush-white min-h-screen">
      <Navbar userName="User Name" />
      <div className="px-4 md:px-24">
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-10 py-6 md:py-12">
          {recipeTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? "" : type)}
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-2 py-4">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => handleCardClick(recipe)}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-36 md:h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">{recipe.category}</p>
                  <button className="mt-2 text-dark-pink hover:text-rose-pink">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-dark-pink">
                  {recipe.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
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
              p: 4,
              maxHeight: "80vh",
              overflowY: "auto",
              outline: "none",

              // Responsive styles
              "@media (max-width: 768px)": {
                width: "90%",
                p: 2,
              },
              "@media (max-width: 480px)": {
                width: "95%",
                p: 2,
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
                <p className=" font-semibold ml-2 md:ml-3">{selectedRecipe.strArea}</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="md:text-lg font-semibold">Instructions: </p >
              <p>{selectedRecipe.strInstructions}</p>
            </div>
            <div className="mb-6">
              <p className="md:text-lg font-semibold">Ingredients: </p >
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
