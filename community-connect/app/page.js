"use client";
import { useEffect, useState } from "react";

import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getAllBusinessList();
  }, []);

  /************ Retrieve all categories ************/
  const getCategoryList = async () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.categories);
      console.log(res.categories);
    });
  };

  /************ Retrieve all businesses ************/
  const getAllBusinessList = async () => {
    GlobalApi.getAllBusinessList().then((res) => {
      setBusinessList(res.businessLists);
      console.log(res.businessLists);
    });
  };

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList} />
    </div>
  );
}
