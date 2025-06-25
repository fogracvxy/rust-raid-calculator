import type { Item } from "../../types/item.types";

export type AmmunitionItemCategory = "ammunition";
export type AmmunitionItemShortname =
  | "ammo.rifle.explosive"
  | "ammo.shotgun"
  | "ammo.shotgun.fire"
  | "ammo.rifle"
  | "arrow.fire"
  | "catapult.ammo.incendiary"
  | "ammo.handmade.shell"
  | "ammo.rocket.hv"
  | "ammo.rocket.seeker"
  | "ammo.rifle.incendiary"
  | "ballista.bolt.incendiary"
  | "ammo.rocket.fire"
  | "ammo.pistol"
  | "catapult.ammo.explosive"
  | "ammo.rocket.basic"
  | "ammo.rocket.sam"
  | "submarine.torpedo.straight";

export const ammunitionItems: {
  [K in AmmunitionItemShortname]: Item<K> & { category: AmmunitionItemCategory };
} = {
  "ammo.rifle.explosive": {
    shortname: "ammo.rifle.explosive",
    name: "Explosive 5.56 Rifle Ammo",
    category: "ammunition",
    image: "/images/bullets.png",
    crafting: {
      workbenchLevel: 3,
      yield: 2,
      ingredients: [
        { shortname: "sulfur", amount: 10 },
        { shortname: "gunpowder", amount: 20 },
        { shortname: "metal.fragments", amount: 10 },
      ],
    },
  },
  "ammo.shotgun": {
    shortname: "ammo.shotgun",
    name: "12 Gauge Buckshot",
    category: "ammunition",
    image: "/images/ammunition/ammo.shotgun.png",
    crafting: {
      workbenchLevel: 2,
      yield: 2,
      ingredients: [
        { shortname: "metal.fragments", amount: 5 },
        { shortname: "gunpowder", amount: 10 },
      ],
    },
  },
  "ammo.shotgun.fire": {
    shortname: "ammo.shotgun.fire",
    name: "12 Gauge Incendiary Shell",
    category: "ammunition",
    image: "/images/ammunition/ammo.shotgun.fire.png",
    crafting: {
      workbenchLevel: 2,
      yield: 2,
      ingredients: [
        { shortname: "metal.fragments", amount: 5 },
        { shortname: "gunpowder", amount: 10 },
        { shortname: "sulfur", amount: 20 },
      ],
    },
  },
  "ammo.rifle": {
    shortname: "ammo.rifle",
    name: "5.56 Rifle Ammo",
    category: "ammunition",
    image: "/images/ammunition/ammo.rifle.png",
    crafting: {
      workbenchLevel: 2,
      yield: 3,
      ingredients: [
        { shortname: "metal.fragments", amount: 10 },
        { shortname: "gunpowder", amount: 5 },
      ],
    },
  },
  "arrow.fire": {
    shortname: "arrow.fire",
    name: "Fire Arrow",
    category: "ammunition",
    image: "/images/ammunition/arrow.fire.png",
    crafting: {
      workbenchLevel: 1,
      yield: 2,
      ingredients: [
        { shortname: "wood", amount: 20 },
        { shortname: "cloth", amount: 2 },
        { shortname: "lowgradefuel", amount: 10 },
      ],
    },
  },
  "catapult.ammo.incendiary": {
    shortname: "catapult.ammo.incendiary",
    name: "Firebomb",
    category: "ammunition",
    image: "/images/ammunition/catapult.ammo.incendiary.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "gunpowder", amount: 150 },
        { shortname: "lowgradefuel", amount: 50 },
        { shortname: "rope", amount: 2 },
      ],
    },
  },
  "ammo.handmade.shell": {
    shortname: "ammo.handmade.shell",
    name: "Handmade Shell",
    category: "ammunition",
    image: "/images/ammunition/ammo.handmade.shell.png",
    crafting: {
      yield: 2,
      ingredients: [
        { shortname: "stones", amount: 5 },
        { shortname: "gunpowder", amount: 5 },
      ],
    },
  },
  "ammo.rocket.hv": {
    shortname: "ammo.rocket.hv",
    name: "High Velocity Rocket",
    category: "ammunition",
    image: "/images/ammunition/ammo.rocket.hv.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metalpipe", amount: 1 },
        { shortname: "gunpowder", amount: 100 },
      ],
    },
  },
  "ammo.rocket.seeker": {
    shortname: "ammo.rocket.seeker",
    name: "Homing Missile",
    category: "ammunition",
    image: "/images/ammunition/ammo.rocket.seeker.png",
    crafting: {
      workbenchLevel: 2,
      yield: 2,
      ingredients: [
        { shortname: "metalpipe", amount: 2 },
        { shortname: "gunpowder", amount: 100 },
        { shortname: "techparts", amount: 1 },
      ],
    },
  },
  "ammo.rifle.incendiary": {
    shortname: "ammo.rifle.incendiary",
    name: "Incendiary 5.56 Rifle Ammo",
    category: "ammunition",
    image: "/images/ammunition/ammo.rifle.incendiary.png",
    crafting: {
      workbenchLevel: 3,
      yield: 2,
      ingredients: [
        { shortname: "metal.fragments", amount: 10 },
        { shortname: "gunpowder", amount: 10 },
        { shortname: "sulfur", amount: 5 },
      ],
    },
  },
  "ballista.bolt.incendiary": {
    shortname: "ballista.bolt.incendiary",
    name: "Incendiary Bolt",
    category: "ammunition",
    image: "/images/ammunition/ballista.bolt.incendiary.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 50 },
        { shortname: "cloth", amount: 10 },
        { shortname: "lowgradefuel", amount: 20 },
      ],
    },
  },
  "ammo.rocket.fire": {
    shortname: "ammo.rocket.fire",
    name: "Incendiary Rocket",
    category: "ammunition",
    image: "/images/ammunition/ammo.rocket.fire.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metalpipe", amount: 2 },
        { shortname: "gunpowder", amount: 150 },
        { shortname: "lowgradefuel", amount: 75 },
      ],
    },
  },
  "ammo.pistol": {
    shortname: "ammo.pistol",
    name: "Pistol Bullet",
    category: "ammunition",
    image: "/images/ammunition/ammo.pistol.png",
    crafting: {
      workbenchLevel: 1,
      yield: 4,
      ingredients: [
        { shortname: "metal.fragments", amount: 10 },
        { shortname: "gunpowder", amount: 5 },
      ],
    },
  },
  "catapult.ammo.explosive": {
    shortname: "catapult.ammo.explosive",
    name: "Propane Explosive Bomb",
    category: "ammunition",
    image: "/images/ammunition/catapult.ammo.explosive.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "gunpowder", amount: 450 },
        { shortname: "lowgradefuel", amount: 20 },
        { shortname: "propanetank", amount: 1 },
      ],
    },
  },
  "ammo.rocket.basic": {
    shortname: "ammo.rocket.basic",
    name: "Rocket",
    category: "ammunition",
    image: "/images/ammunition/ammo.rocket.basic.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        { shortname: "metalpipe", amount: 2 },
        { shortname: "gunpowder", amount: 150 },
        { shortname: "explosives", amount: 10 },
      ],
    },
  },
  "ammo.rocket.sam": {
    shortname: "ammo.rocket.sam",
    name: "SAM Ammo",
    category: "ammunition",
    image: "/images/ammunition/ammo.rocket.sam.png",
    crafting: {
      workbenchLevel: 2,
      yield: 6,
      ingredients: [
        { shortname: "metalpipe", amount: 1 },
        { shortname: "gunpowder", amount: 30 },
      ],
    },
  },
  "submarine.torpedo.straight": {
    shortname: "submarine.torpedo.straight",
    name: "Torpedo",
    category: "ammunition",
    image: "/images/ammunition/submarine.torpedo.straight.png",
    crafting: {
      workbenchLevel: 2,
      yield: 5,
      ingredients: [
        { shortname: "metalpipe", amount: 1 },
        { shortname: "gunpowder", amount: 30 },
      ],
    },
  },
};
