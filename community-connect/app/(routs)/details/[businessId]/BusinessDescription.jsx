import Image from "next/image";
import React from "react";

function BusinessDescription({ business }) {
  return (
    business?.name && (
      <div>
        <div>
          <h2 className="font-bold text-[30px] text-gray-900">Description</h2>
          <p className="text-gray-600 text-lg mt-5">{business?.about}</p>
        </div>
        <div>
          <h2 className="font-bold text-[30px] text-gray-900 mt-10">Gallery</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 mt-5">
            {business?.images?.map((image, index) => (
              <Image
                src={image.url}
                alt={business?.name}
                width={700}
                height={200}
                className="rounded-md object-cover"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDescription;
