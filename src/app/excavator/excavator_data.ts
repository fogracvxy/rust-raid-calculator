// Excavator data
export const excavatorTimePerFuelInSeconds = 120;
export const excavatorData: { name: string; amount: number; image: string }[] =
  [
    {
      name: "Diesel Fuel",
      amount: 1,
      image: "/images/resources/diesel_barrel.png",
    },
    {
      name: "High Quality Metal",
      amount: 100,
      image: "/images/resources/hqore.png",
    },
    {
      name: "Sulfur Ore",
      amount: 2000,
      image: "/images/resources/sulfur.ore.png",
    },
    {
      name: "Metal Fragments",
      amount: 5000,
      image: "/images/resources/metal.fragments.png",
    },
    {
      name: "Stones",
      amount: 10000,
      image: "/images/resources/stones.png",
    },
    {
      name: "Airdrop",
      amount: 0,
      image: "/images/resources/supply-drop.png",
    },
  ];

// Quarry data for different types of quarries
export const quarryData: {
  type: string;
  yield: { name: string; amount: number; image: string }[];
  timePerFuelInSeconds: number;
  fuel: string;
}[] = [
  {
    type: "HQM Quarry",
    yield: [
      {
        name: "High Quality Metal",
        amount: 50,
        image: "/images/resources/hqore.png",
      },
    ],
    timePerFuelInSeconds: 130, // 2 minutes 10 seconds per diesel fuel
    fuel: "/images/resources/diesel_barrel.png",
  },
  {
    type: "Sulfur Quarry",
    yield: [
      {
        name: "Sulfur Ore",
        amount: 1000,
        image: "/images/resources/sulfur.ore.png",
      },
    ],
    timePerFuelInSeconds: 130,
    fuel: "/images/resources/diesel_barrel.png",
  },
  {
    type: "Stone Quarry",
    yield: [
      {
        name: "Metal Fragments",
        amount: 1000,
        image: "/images/resources/metal.fragments.png",
      },
      {
        name: "Stones",
        amount: 5000,
        image: "/images/resources/stones.png",
      },
    ],
    timePerFuelInSeconds: 130,
    fuel: "/images/resources/diesel_barrel.png",
  },
];
