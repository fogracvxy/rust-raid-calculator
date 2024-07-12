export interface Item {
  name: string;
  image: string;
  destructionOptions: {
    c4: number;
    bullets: number;
    rockets: number;
    satchel: number;
  };
  category: string;
  bestOption?: {
    c4: number;
    bullets: number;
    rockets: number;
    satchel: number;
  };
}

export interface CollectionItem {
  item: Item;
  quantity: number;
}

export interface SortedSulfurCost {
  item: string;
  quantity: number;
}
export interface Resource {
  name: string;
  image: string;
  quantity: number;
}
