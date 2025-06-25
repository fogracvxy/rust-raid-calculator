import type { Item } from "../../types/item.types";

export type WeaponItemCategory = "weapon";
export type WeaponItemShortname =
  | "grenade.beancan"
  | "grenade.f1"
  | "grenade.flashbang"
  | "grenade.molotov"
  | "rocket.launcher"
  | "homingmissile.launcher"
  | "spear.wooden"
  | "spear.stone"
  | "rifle.semiauto";

export const weaponItems: {
  [K in WeaponItemShortname]: Item<K> & { category: WeaponItemCategory };
} = {
  "grenade.beancan": {
    shortname: "grenade.beancan",
    name: "Beancan Grenade",
    category: "weapon",
    image: "/images/weapon/grenade.beancan.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 20 },
        { shortname: "gunpowder", amount: 60 },
      ],
    },
  },
  "grenade.f1": {
    shortname: "grenade.f1",
    name: "F1 Grenade",
    category: "weapon",
    image: "/images/weapon/grenade.f1.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 25 },
        { shortname: "gunpowder", amount: 30 },
      ],
    },
  },
  "grenade.flashbang": {
    shortname: "grenade.flashbang",
    name: "Flashbang",
    category: "weapon",
    image: "/images/weapon/grenade.flashbang.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 50 },
        { shortname: "gunpowder", amount: 25 },
      ],
    },
  },
  "grenade.molotov": {
    shortname: "grenade.molotov",
    name: "Molotov Cocktail",
    category: "weapon",
    image: "/images/weapon/grenade.molotov.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "cloth", amount: 10 },
        { shortname: "lowgradefuel", amount: 50 },
      ],
    },
  },
  "rocket.launcher": {
    shortname: "rocket.launcher",
    name: "Rocket Launcher",
    category: "weapon",
    image: "/images/weapon/rocket.launcher.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metal.refined", amount: 40 },
        { shortname: "metalpipe", amount: 4 },
      ],
    },
  },
  "homingmissile.launcher": {
    shortname: "homingmissile.launcher",
    name: "Homing Missile Launcher",
    category: "weapon",
    image: "/images/weapon/homingmissile.launcher.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metal.refined", amount: 20 },
        { shortname: "metalpipe", amount: 3 },
        { shortname: "techparts", amount: 1 },
        { shortname: "cctv.camera", amount: 1 },
      ],
    },
  },
  "spear.wooden": {
    shortname: "spear.wooden",
    name: "Wooden Spear",
    category: "weapon",
    image: "/images/weapon/spear.wooden.png",
    crafting: {
      yield: 1,
      ingredients: [{ shortname: "wood", amount: 300 }],
    },
  },
  "spear.stone": {
    shortname: "spear.stone",
    name: "Stone Spear",
    category: "weapon",
    image: "/images/weapon/spear.stone.png",
    crafting: {
      yield: 1,
      ingredients: [
        { shortname: "stones", amount: 20 },
        { shortname: "spear.wooden", amount: 1 },
      ],
    },
  },
  "rifle.semiauto": {
    shortname: "rifle.semiauto",
    name: "Semi-Automatic Rifle",
    category: "weapon",
    image: "/images/weapon/rifle.semiauto.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metal.refined", amount: 4 },
        { shortname: "metal.fragments", amount: 450 },
        { shortname: "metalspring", amount: 1 },
        { shortname: "semibody", amount: 1 },
      ],
    },
  },
};
