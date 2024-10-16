"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Details from "./_components/Details";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.categories);
      console.log(res.categories);
    });
  };
  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
    </div>
  );
}
