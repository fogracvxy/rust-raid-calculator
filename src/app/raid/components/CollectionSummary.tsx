import React from "react";
import BestOptionsList from "./BestOptionsList";
import BestOptionSulfurCost from "./BestOptionSulfurCost";
import RequiredResources from "./RequiredResources";
import SulfurCostsSorted from "./SulfurCostsSorted";
import { CollectionItem, Item, SortedSulfurCost } from "../types";
import { Resource } from "../types";
interface CollectionSummaryProps {
  collection: CollectionItem[];
  handleRemoveItem: (item: Item) => void;
  calculateCost: (option: string, quantity: number) => number;
  resources: Resource[];
  sortedOptions: SortedSulfurCost[];
  handleResetAll: () => void;
}

const CollectionSummary: React.FC<CollectionSummaryProps> = ({
  collection,
  calculateCost,
  resources,
  sortedOptions,
}) => {
  return (
    <>
      <div>
        <BestOptionsList collection={collection} />
      </div>
      <div>
        <BestOptionSulfurCost
          collection={collection}
          calculateCost={calculateCost}
        />
      </div>
      <div>
        <RequiredResources resources={resources} />
      </div>
      <div>
        <SulfurCostsSorted sortedOptions={sortedOptions} />
      </div>
    </>
  );
};

export default CollectionSummary;
