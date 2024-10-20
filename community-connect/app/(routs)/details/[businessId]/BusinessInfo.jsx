import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import Image from "next/image";
import React from "react";

function BusinessInfo({ business }) {
  return (
    business?.name && (
      <div className="md:flex items-center gap-4">
        <Image
          src={business?.images[0]?.url}
          alt={business?.name}
          width={150}
          height={200}
          className="rounded-full h-[150px] object-cover"
        />
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-baseline gap-2 mt-4 md:mt-0">
            <h2 className="text-primary bg-green-100 text-lg font-bold rounded-full py-1 px-3">
              🏷️{business?.category?.name}
            </h2>
            <h1 className="text-[40px] font-bold">{business?.name}</h1>
            <h2 className="flex gap-2 text-lg text-gray-500 font-bold">
              <MapPin />
              {business?.address}
            </h2>
            <h2 className="flex gap-2 text-lg text-gray-600 font-bold">
              <Mail />
              {business?.email}
            </h2>
          </div>
          <div className="flex flex-col gap-5 mt-5 items-end">
            <Button>
              <Share />
            </Button>
            <h2 className="flex gap-2 text-lg text-primary font-bold">
              <User />
              {business?.contactPerson}
            </h2>
            <h2 className="flex gap-2 text-lg text-primary font-bold">
              <Clock /> Avaliable from 8:00 AM to 5:00 PM
            </h2>
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessInfo;
