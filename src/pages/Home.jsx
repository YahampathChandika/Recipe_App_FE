import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [selectedType, setSelectedType] = useState("");
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
    },
    {
      id: 2,
      image:
        "https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg",
      category: "Main Course",
      name: "Pasta Carbonara",
    },
    {
      id: 3,
      image:
        "https://www.themealdb.com/images/media/meals/lpd4wy1614347943.jpg",
      category: "Dessert",
      name: "Chocolate Cake",
    },
    {
      id: 4,
      image: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
      category: "Snack",
      name: "Nachos",
    },
    {
      id: 5,
      image:
        "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
      category: "Beverage",
      name: "Smoothie",
    },
  ];

  const filteredRecipes = selectedType
    ? recipes.filter((recipe) => recipe.category === selectedType)
    : recipes;

  return (
    <div className="bg-blush-white min-h-screen">
      <Navbar userName="User Name" />
      <div className="px-4 md:px-24">
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-10 py-6 md:py-12">
          {recipeTypes.map((type) => (
            <button
              key={type}
              onClick={() =>
                setSelectedType(selectedType === type ? "" : type)
              }
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
    </div>
  );
}
