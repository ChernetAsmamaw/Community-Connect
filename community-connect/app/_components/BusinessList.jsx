import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BusinessList({ title, businessList }) {
  return (
    <div className="mt-10 lg:mx-16 md:mx-8 mx-4">
      <h2 className="text-2xl pl-4 text-green-900 py-5 font-extrabold">
        {title || "Services and Businesses"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-5">
        {businessList.length > 0
          ? businessList.map((business, index) => (
              <Link
                href={`/details/${business.id}`}
                key={index}
                className="shadow-md rounded-lg hover:shadow-lg hover:shadow-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <Image
                  src={business?.images[0]?.url}
                  alt={business?.name}
                  width={500}
                  height={200}
                  className="rounded-lg h-[125px] md:h-[200px] object-cover"
                />
                <div className="flex flex-col items-start justify-center p-4 gap-1">
                  <h2 className="p-1 bg-green-300 text-bg-primary rounded-full px-4 text-[12px]">
                    🏷️{business?.category?.name}
                  </h2>
                  <h2 className="font-bold text-md text-gray-900 pt-2">
                    {business.name}
                  </h2>
                  <p className="text-primary">{business?.contactPerson}</p>
                  <p className="text-sm text-gray-500">{business?.address}</p>
                  <Button className="mt-2 rounded-lg">Book Now</Button>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="shadow-md rounded-lg bg-gray-200 animate-pulse"
              >
                <div className="w-full h-[200px] bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="w-20 h-5 bg-gray-300 mt-2"></div>
                  <div className="w-20 h-5 bg-gray-300 mt-2"></div>
                  <div className="w-20 h-5 bg-gray-300 mt-2"></div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BusinessList;
