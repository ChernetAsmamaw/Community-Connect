import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BookingSection from "./BookingSection";

function BusinessSudgestionList({ business }) {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    business && getBusinessByCategory();
  }, [business]);

  const getBusinessByCategory = async () => {
    GlobalApi.getBusinessByCategory(business?.category?.name).then((res) => {
      setBusinesses(res?.businessLists);
      console.log(res);
    });
  };

  return (
    <div className="md:pl-5">
      <BookingSection business={business}>
        <Button className="flex items-center gap-2 bg-primary text-white w-full justify-end">
          <PenBox /> Book Now
        </Button>
      </BookingSection>

      <div className="md:block hidden">
        <h2 className="font-bold text-lg text-gray-900 my-5 text-center">
          Similar Businesses in{" "}
          <span className="text-underline"> {business?.category?.name} </span>{" "}
          Category
        </h2>
        <div className="grid grid-cols-1 gap-5">
          {businesses?.map((business, index) => (
            <Link
              href={`/details/${business.id}`}
              key={index}
              className="flex items-center gap-5 mb-4 cursor-pointer
            hover:border border-primary rounded-lg p-3 hover:shadow-md"
            >
              <Image
                src={business?.images[0]?.url}
                alt={business?.name}
                width={100}
                height={150}
                className="rounded-full h-[100px] object-cover"
              />
              <div>
                <h2 className="text-lg font-bold">{business?.name}</h2>
                <h2 className="text-primary">{business?.contactPerson}</h2>
                <h2 className="text-gray-500">{business?.address}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessSudgestionList;
