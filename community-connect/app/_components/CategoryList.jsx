import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className="mx-2 my-4 md:mx-20 lg:mx-30 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-12">
      {categoryList.length > 0
        ? categoryList.map((category, index) => (
            <Link
              href={`/search/${category.name}`}
              key={index}
              style={{ backgroundColor: category.bgColor.hex }}
              className={`flex flex-col items-center justify-center rounded-lg px-8 py-6 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out border border-primary`}
            >
              <Image
                src={category.icon.url}
                alt={category.name}
                width={50}
                height={50}
                className="rounded-full pt-2"
              />
              <h2 className="text-primary text-center pt-4">{category.name}</h2>
            </Link>
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
