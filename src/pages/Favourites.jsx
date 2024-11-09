import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Favourites() {
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

  useEffect(() => {
    document.title = "Favourites | Cook";
  }, []);

  return (
    <div className="bg-blush-white min-h-screen">
      <Navbar userName="User Name" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 md:px-24 py-8 md:py-16">
          {recipes.map((recipe) => (
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
  );
}
