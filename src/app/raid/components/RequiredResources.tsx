import React from "react";
import Image from "next/image";
import { Resource } from "../types";

interface RequiredResourcesProps {
  resources: Resource[];
}

const RequiredResources: React.FC<RequiredResourcesProps> = ({ resources }) => {
  const totalQuantity = resources.reduce(
    (sum, resource) => sum + resource.quantity,
    0
  );
  if (totalQuantity === 0) {
    return null; // If totalQuantity is 0, return nothing
  }
  return (
    <div className="mt-8 ml-10">
      {totalQuantity > 0 && (
        <h2 className="text-xl font-bold mb-2">
          Required Resources (choose one){" "}
        </h2>
      )}
      <div className="flex flex-wrap">
        {resources.map((resource) => (
          <div
            key={resource.name}
            className="flex items-center mr-4 mb-4 relative"
          >
            <div className="relative">
              <Image
                src={resource.image}
                height={50}
                width={50}
                alt={resource.name}
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                {resource.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredResources;
