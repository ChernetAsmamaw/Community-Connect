import Image from "next/image";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className="mx-4 my-4 md:mx-20 lg:mx-30 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 py-12">
      {categoryList.length > 0
        ? categoryList.map((category, index) => (
            <div
              key={index}
              style={{ backgroundColor: category.bgColor.hex }}
              className={`flex flex-col items-center justify-center rounded-lg px-6 py-4 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out`}
            >
              <Image
                src={category.icon.url}
                alt={category.name}
                width={50}
                height={50}
              />
              <h2 className="text-primary text-center pt-4">{category.name}</h2>
            </div>
          ))
        : /* This is a fallback skeleton element in case the categoryList is empty */
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center bg-gray-200 rounded-lg p-5 animate-pulse`}
            >
              <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
              <div className="w-20 h-5 bg-gray-300 mt-2"></div>
            </div>
          ))}
    </div>
  );
}

export default CategoryList;
