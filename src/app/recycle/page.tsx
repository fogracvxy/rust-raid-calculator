import React from "react";
import { itemsRecycle } from "./items_recyle";
import Image from "next/image";

type OtherType = Record<string, number> | string | null;

interface ItemRecycle {
  name: string;
  yield: {
    scrap: number | null;
    metal: number | null;
    highQualityMetal: number | null;
    other?: OtherType;
    cloth?: number;
    rope?: number;
  };
  image: string;
}

const Recycle: React.FC = () => {
  const renderOther = (other: OtherType | undefined): string => {
    if (typeof other === "object" && other !== null) {
      return Object.entries(other)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    }
    return other ?? "-";
  };

  const TableRow = ({ item, index }: { item: ItemRecycle; index: number }) => (
    <tr className={`bg-gray-${index % 2 === 0 ? "900" : "800"}`}>
      <td className="px-4 py-2 text-center">
        <Image
          src={item.image}
          alt={item.name}
          className="w-8 h-8 rounded-full mx-auto"
          width={32}
          height={32}
        />
      </td>
      <td className="px-4 py-2 text-center">{item.name}</td>
      <td className="px-4 py-2 text-center">{item.yield.scrap ?? "-"}</td>
      <td className="px-4 py-2 text-center">{item.yield.metal ?? "-"}</td>
      <td className="px-4 py-2 text-center">
        {item.yield.highQualityMetal ?? "-"}
      </td>
      <td className="px-4 py-2 text-center hidden sm:table-cell">
        {renderOther(item.yield.other)}
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Recycling Table</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Icon</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Scrap</th>
              <th className="px-4 py-2 text-center">Metal</th>
              <th className="px-4 py-2 text-center">High Quality Metal</th>
              <th className="px-4 py-2 text-center hidden sm:table-cell">
                Other
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsRecycle.map((item, index) => (
              <TableRow key={index} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recycle;
