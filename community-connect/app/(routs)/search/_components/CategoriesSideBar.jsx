"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../../_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CategoriesSideBar() {
  const [categoryList, setCategoryList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get the current path
  const params = usePathname();

  useEffect(() => {
    getCategoryList();
  }, []);

  // When the params change, useEffect will run again
  useEffect(() => {
    // Get the category name from the path
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  /************ Retrieve all categories ************/
  const getCategoryList = async () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.categories);
      console.log(res.categories);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-extrabold text-primary mb-4">Categories</h1>
      <ul className="space-y-3">
        {categoryList.map((category, index) => (
          <Link
            href={`/search/${category.name}`}
            key={index}
            className={`flex gap-3 p-4 items-center cursor-pointer border hover:bg-green-100 hover:text-primary hover:border-primary hover:shadow-md rounded-lg transition-all duration-200
                    ${
                      selectedCategory === category.name
                        ? "bg-green-100 text-primary border-primary shadow-md"
                        : ""
                    }  `}
          >
            <Image
              src={category.icon.url}
              alt={category.name}
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className="text-lg font-medium">{category.name}</h2>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesSideBar;
