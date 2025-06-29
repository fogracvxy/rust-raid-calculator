import type { Item } from "../../types/item.types";

export type AmmunitionItemCategory = "ammunition";
export type AmmunitionItemShortname =
  | "ammo.grenadelauncher.buckshot"
  | "ammo.grenadelauncher.he"
  | "ammo.grenadelauncher.smoke"
  | "ammo.handmade.shell"
  | "ammo.nailgun.nails"
  | "ammo.pistol"
  | "ammo.pistol.fire"
  | "ammo.pistol.hv"
  | "ammo.rifle"
  | "ammo.rifle.explosive"
  | "ammo.rifle.hv"
  | "ammo.rifle.incendiary"
  | "ammo.rocket.basic"
  | "ammo.rocket.fire"
  | "ammo.rocket.hv"
  | "ammo.rocket.mlrs"
  | "ammo.rocket.sam"
  | "ammo.rocket.seeker"
  | "ammo.shotgun"
  | "ammo.shotgun.fire"
  | "ammo.shotgun.slug"
  | "arrow.bone"
  | "arrow.fire"
  | "arrow.hv"
  | "arrow.wooden"
  | "ballista.bolt.hammerhead"
  | "ballista.bolt.incendiary"
  | "ballista.bolt.piercer"
  | "ballista.bolt.pitchfork"
  | "catapult.ammo.bee"
  | "catapult.ammo.boulder"
  | "catapult.ammo.explosive"
  | "catapult.ammo.incendiary"
  | "dart.incapacitate"
  | "dart.radiation"
  | "dart.scatter"
  | "dart.wood"
  | "speargun.spear"
  | "submarine.torpedo.straight";

export const ammunitionItems: {
  [K in AmmunitionItemShortname]: Item<K> & { category: AmmunitionItemCategory };
} = {
  "ammo.grenadelauncher.buckshot": {
    shortname: "ammo.grenadelauncher.buckshot",
    name: "40mm Shotgun Round",
    category: "ammunition",
    image: "/images/ammunition/ammo.grenadelauncher.buckshot.png",
  },
  "ammo.grenadelauncher.he": {
    shortname: "ammo.grenadelauncher.he",
    name: "40mm HE Grenade",
    category: "ammunition",
    image: "/images/ammunition/ammo.grenadelauncher.he.png",
  },
  "ammo.grenadelauncher.smoke": {
    shortname: "ammo.grenadelauncher.smoke",
    name: "40mm Smoke Grenade",
    category: "ammunition",
    image: "/images/ammunition/ammo.grenadelauncher.smoke.png",
  },
  "ammo.handmade.shell": {
    shortname: "ammo.handmade.shell",
    name: "Handmade Shell",
    category: "ammunition",
    image: "/images/ammunition/ammo.handmade.shell.png",
    crafting: {
      yield: 2,
      ingredients: [
        {
          shortname: "stones",
          amount: 5,
        },
        {
          shortname: "gunpowder",
          amount: 5,
        },
      ],
    },
  },
  "ammo.nailgun.nails": {
    shortname: "ammo.nailgun.nails",
    name: "Nailgun Nails",
    category: "ammunition",
    image: "/images/ammunition/ammo.nailgun.nails.png",
    crafting: {
      yield: 5,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 8,
        },
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
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "gunpowder",
          amount: 5,
        },
      ],
    },
  },
  "ammo.pistol.fire": {
    shortname: "ammo.pistol.fire",
    name: "Incendiary Pistol Bullet",
    category: "ammunition",
    image: "/images/ammunition/ammo.pistol.fire.png",
    crafting: {
      workbenchLevel: 2,
      yield: 3,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "gunpowder",
          amount: 10,
        },
        {
          shortname: "sulfur",
          amount: 5,
        },
      ],
    },
  },
  "ammo.pistol.hv": {
    shortname: "ammo.pistol.hv",
    name: "HV Pistol Ammo",
    category: "ammunition",
    image: "/images/ammunition/ammo.pistol.hv.png",
    crafting: {
      workbenchLevel: 2,
      yield: 4,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "gunpowder",
          amount: 10,
        },
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
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "gunpowder",
          amount: 5,
        },
      ],
    },
  },
  "ammo.rifle.explosive": {
    shortname: "ammo.rifle.explosive",
    name: "Explosive 5.56 Rifle Ammo",
    category: "ammunition",
    image: "/images/ammunition/ammo.rifle.explosive.png",
    crafting: {
      workbenchLevel: 3,
      yield: 2,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "gunpowder",
          amount: 20,
        },
        {
          shortname: "sulfur",
          amount: 10,
        },
      ],
    },
  },
  "ammo.rifle.hv": {
    shortname: "ammo.rifle.hv",
    name: "HV 5.56 Rifle Ammo",
    category: "ammunition",
    image: "/images/ammunition/ammo.rifle.hv.png",
    crafting: {
      workbenchLevel: 3,
      yield: 3,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "gunpowder",
          amount: 10,
        },
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
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "gunpowder",
          amount: 10,
        },
        {
          shortname: "sulfur",
          amount: 5,
        },
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
        {
          shortname: "metalpipe",
          amount: 2,
        },
        {
          shortname: "gunpowder",
          amount: 150,
        },
        {
          shortname: "explosives",
          amount: 10,
        },
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
        {
          shortname: "metalpipe",
          amount: 2,
        },
        {
          shortname: "gunpowder",
          amount: 150,
        },
        {
          shortname: "lowgradefuel",
          amount: 75,
        },
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
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "gunpowder",
          amount: 100,
        },
      ],
    },
  },
  "ammo.rocket.mlrs": {
    shortname: "ammo.rocket.mlrs",
    name: "MLRS Rocket",
    category: "ammunition",
    image: "/images/ammunition/ammo.rocket.mlrs.png",
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
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
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
        {
          shortname: "metalpipe",
          amount: 2,
        },
        {
          shortname: "gunpowder",
          amount: 100,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
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
        {
          shortname: "metal.fragments",
          amount: 5,
        },
        {
          shortname: "gunpowder",
          amount: 10,
        },
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
        {
          shortname: "metal.fragments",
          amount: 5,
        },
        {
          shortname: "gunpowder",
          amount: 10,
        },
        {
          shortname: "sulfur",
          amount: 20,
        },
      ],
    },
  },
  "ammo.shotgun.slug": {
    shortname: "ammo.shotgun.slug",
    name: "12 Gauge Slug",
    category: "ammunition",
    image: "/images/ammunition/ammo.shotgun.slug.png",
    crafting: {
      workbenchLevel: 2,
      yield: 2,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 5,
        },
        {
          shortname: "gunpowder",
          amount: 10,
        },
      ],
    },
  },
  "arrow.bone": {
    shortname: "arrow.bone",
    name: "Bone Arrow",
    category: "ammunition",
    image: "/images/ammunition/arrow.bone.png",
    crafting: {
      yield: 3,
      ingredients: [
        {
          shortname: "wood",
          amount: 25,
        },
        {
          shortname: "bone.fragments",
          amount: 10,
        },
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
        {
          shortname: "wood",
          amount: 20,
        },
        {
          shortname: "cloth",
          amount: 2,
        },
        {
          shortname: "lowgradefuel",
          amount: 10,
        },
      ],
    },
  },
  "arrow.hv": {
    shortname: "arrow.hv",
    name: "High Velocity Arrow",
    category: "ammunition",
    image: "/images/ammunition/arrow.hv.png",
    crafting: {
      workbenchLevel: 1,
      yield: 2,
      ingredients: [
        {
          shortname: "wood",
          amount: 20,
        },
        {
          shortname: "metal.fragments",
          amount: 5,
        },
      ],
    },
  },
  "arrow.wooden": {
    shortname: "arrow.wooden",
    name: "Wooden Arrow",
    category: "ammunition",
    image: "/images/ammunition/arrow.wooden.png",
    crafting: {
      yield: 2,
      ingredients: [
        {
          shortname: "wood",
          amount: 25,
        },
        {
          shortname: "stones",
          amount: 10,
        },
      ],
    },
  },
  "ballista.bolt.hammerhead": {
    shortname: "ballista.bolt.hammerhead",
    name: "Hammerhead Bolt",
    category: "ammunition",
    image: "/images/ammunition/ballista.bolt.hammerhead.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
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
        {
          shortname: "metal.fragments",
          amount: 50,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "lowgradefuel",
          amount: 20,
        },
      ],
    },
  },
  "ballista.bolt.piercer": {
    shortname: "ballista.bolt.piercer",
    name: "Piercer Bolt",
    category: "ammunition",
    image: "/images/ammunition/ballista.bolt.piercer.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "ballista.bolt.pitchfork": {
    shortname: "ballista.bolt.pitchfork",
    name: "Pitchfork Bolt",
    category: "ammunition",
    image: "/images/ammunition/ballista.bolt.pitchfork.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "catapult.ammo.bee": {
    shortname: "catapult.ammo.bee",
    name: "Bee Catapult Bomb",
    category: "ammunition",
    image: "/images/ammunition/catapult.ammo.bee.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "grenade.bee",
          amount: 3,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  "catapult.ammo.boulder": {
    shortname: "catapult.ammo.boulder",
    name: "Scattershot",
    category: "ammunition",
    image: "/images/ammunition/catapult.ammo.boulder.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 200,
        },
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
        {
          shortname: "propanetank",
          amount: 1,
        },
        {
          shortname: "gunpowder",
          amount: 450,
        },
        {
          shortname: "lowgradefuel",
          amount: 20,
        },
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
        {
          shortname: "gunpowder",
          amount: 150,
        },
        {
          shortname: "lowgradefuel",
          amount: 50,
        },
        {
          shortname: "rope",
          amount: 2,
        },
      ],
    },
  },
  "dart.incapacitate": {
    shortname: "dart.incapacitate",
    name: "Incapacitate Dart",
    category: "ammunition",
    image: "/images/ammunition/dart.incapacitate.png",
    crafting: {
      workbenchLevel: 1,
      yield: 2,
      ingredients: [
        {
          shortname: "wood",
          amount: 5,
        },
        {
          shortname: "venom.snake",
          amount: 1,
        },
      ],
    },
  },
  "dart.radiation": {
    shortname: "dart.radiation",
    name: "Radiation Dart",
    category: "ammunition",
    image: "/images/ammunition/dart.radiation.png",
    crafting: {
      workbenchLevel: 1,
      yield: 2,
      ingredients: [
        {
          shortname: "wood",
          amount: 25,
        },
        {
          shortname: "metal.fragments",
          amount: 5,
        },
      ],
    },
  },
  "dart.scatter": {
    shortname: "dart.scatter",
    name: "Scatter Dart",
    category: "ammunition",
    image: "/images/ammunition/dart.scatter.png",
    crafting: {
      workbenchLevel: 1,
      yield: 2,
      ingredients: [
        {
          shortname: "wood",
          amount: 25,
        },
        {
          shortname: "stones",
          amount: 10,
        },
      ],
    },
  },
  "dart.wood": {
    shortname: "dart.wood",
    name: "Wood Dart",
    category: "ammunition",
    image: "/images/ammunition/dart.wood.png",
    crafting: {
      workbenchLevel: 1,
      yield: 2,
      ingredients: [
        {
          shortname: "wood",
          amount: 25,
        },
      ],
    },
  },
  "speargun.spear": {
    shortname: "speargun.spear",
    name: "Speargun Spear",
    category: "ammunition",
    image: "/images/ammunition/speargun.spear.png",
    crafting: {
      workbenchLevel: 1,
      yield: 3,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
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
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
      ],
    },
  },
};
