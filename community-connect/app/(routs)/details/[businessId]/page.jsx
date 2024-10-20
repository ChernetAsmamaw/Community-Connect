"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "./BusinessInfo";
import BusinessList from "@/app/_components/BusinessList";
import BusinessSudgestionList from "./BusinessSudgestionList";
import BusinessDescription from "./BusinessDescription";

function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState({});

  useEffect(() => {
    params && getBusinessById();
  }, [params]);

  const getBusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((res) => {
      setBusiness(res.businessList);
    });
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }
    if (status === "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status === "authenticated" &&
    business && (
      <div className="py-10 md:py-20 px-10 md:px-24">
        <BusinessInfo business={business} />
        <div className="grid grid-cols-3 gap-10 mt-12">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>

          <div className="col-span-1">
            <BusinessSudgestionList business={business} />
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDetail;
