"use client";
import BusinessList from "@/app/_components/BusinessList";
import GlobalApi from "@/app/_services/GlobalApi";
import React, { useEffect, useState } from "react";

function BusinessByCategory({ params }) {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    // make sure params is not null
    params && getBusinessByCategory();
  }, [params]);

  const getBusinessByCategory = async () => {
    GlobalApi.getBusinessByCategory(params.category).then((res) => {
      setBusinesses(res?.businessLists);
    });
  };

  return (
    <div>
      <BusinessList businessList={businesses} title={params.category} />
    </div>
  );
}

export default BusinessByCategory;
