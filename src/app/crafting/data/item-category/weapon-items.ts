import type { Item } from "../../types/item.types";

export type WeaponItemCategory = "weapon";
export type WeaponItemShortname =
  | "ballista.mounted"
  | "ballista.static"
  | "batteringram"
  | "blowpipe"
  | "bone.club"
  | "boomerang"
  | "bow.compound"
  | "bow.hunting"
  | "candycaneclub"
  | "catapult"
  | "crossbow"
  | "flamethrower"
  | "grenade.beancan"
  | "grenade.bee"
  | "grenade.f1"
  | "grenade.flashbang"
  | "grenade.molotov"
  | "gun.water"
  | "hmlmg"
  | "homingmissile.launcher"
  | "knife.bone"
  | "knife.butcher"
  | "knife.combat"
  | "knife.skinning"
  | "lmg.m249"
  | "longsword"
  | "mace"
  | "machete"
  | "military flamethrower"
  | "minicrossbow"
  | "minigun"
  | "multiplegrenadelauncher"
  | "paddle"
  | "pistol.eoka"
  | "pistol.m92"
  | "pistol.nailgun"
  | "pistol.prototype17"
  | "pistol.python"
  | "pistol.revolver"
  | "pistol.semiauto"
  | "pistol.water"
  | "pitchfork"
  | "revolver.hc"
  | "rifle.ak"
  | "rifle.bolt"
  | "rifle.l96"
  | "rifle.lr300"
  | "rifle.m39"
  | "rifle.semiauto"
  | "rifle.sks"
  | "rocket.launcher"
  | "salvaged.cleaver"
  | "salvaged.sword"
  | "shotgun.double"
  | "shotgun.m4"
  | "shotgun.pump"
  | "shotgun.spas12"
  | "shotgun.waterpipe"
  | "siegetower"
  | "smg.2"
  | "smg.mp5"
  | "smg.thompson"
  | "snowball"
  | "snowballgun"
  | "spear.stone"
  | "spear.wooden"
  | "speargun"
  | "t1_smg"
  | "vampire.stake"
  | "weapon.mod.8x.scope"
  | "weapon.mod.extendedmags"
  | "weapon.mod.flashlight"
  | "weapon.mod.gascompressionovedrive"
  | "weapon.mod.holosight"
  | "weapon.mod.lasersight"
  | "weapon.mod.muzzleboost"
  | "weapon.mod.muzzlebrake"
  | "weapon.mod.oilfiltersilencer"
  | "weapon.mod.silencer"
  | "weapon.mod.simplesight"
  | "weapon.mod.small.scope"
  | "weapon.mod.sodacansilencer"
  | "weapon.mod.targetingattachment";

export const weaponItems: {
  [K in WeaponItemShortname]: Item<K> & { category: WeaponItemCategory };
} = {
  "ballista.mounted": {
    name: "Mounted Ballista",
    shortname: "ballista.mounted",
    category: "weapon",
    image: "/images/weapon/ballista.mounted.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 250,
        },
        {
          shortname: "gears",
          amount: 2,
        },
        {
          shortname: "sheetmetal",
          amount: 2,
        },
      ],
    },
  },
  "ballista.static": {
    name: "Ballista",
    shortname: "ballista.static",
    category: "weapon",
    image: "/images/weapon/ballista.static.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 250,
        },
        {
          shortname: "gears",
          amount: 1,
        },
        {
          shortname: "sheetmetal",
          amount: 2,
        },
      ],
    },
  },
  batteringram: {
    name: "Battering Ram",
    shortname: "batteringram",
    category: "weapon",
    image: "/images/weapon/batteringram.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 500,
        },
        {
          shortname: "sheetmetal",
          amount: 4,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 100,
        },
      ],
    },
  },
  blowpipe: {
    name: "Blow Pipe",
    shortname: "blowpipe",
    category: "weapon",
    image: "/images/weapon/blowpipe.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "cloth",
          amount: 25,
        },
      ],
    },
  },
  "bone.club": {
    name: "Bone Club",
    shortname: "bone.club",
    category: "weapon",
    image: "/images/weapon/bone.club.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "bone.fragments",
          amount: 20,
        },
      ],
    },
  },
  boomerang: {
    name: "Boomerang",
    shortname: "boomerang",
    category: "weapon",
    image: "/images/weapon/boomerang.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
      ],
    },
  },
  "bow.compound": {
    name: "Compound Bow",
    shortname: "bow.compound",
    category: "weapon",
    image: "/images/weapon/bow.compound.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
        {
          shortname: "rope",
          amount: 2,
        },
      ],
    },
  },
  "bow.hunting": {
    name: "Hunting Bow",
    shortname: "bow.hunting",
    category: "weapon",
    image: "/images/weapon/bow.hunting.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "cloth",
          amount: 50,
        },
      ],
    },
  },
  candycaneclub: {
    name: "Candy Cane Club",
    shortname: "candycaneclub",
    category: "weapon",
    image: "/images/weapon/candycaneclub.png",
  },
  catapult: {
    name: "Catapult",
    shortname: "catapult",
    category: "weapon",
    image: "/images/weapon/catapult.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 500,
        },
        {
          shortname: "metal.refined",
          amount: 20,
        },
        {
          shortname: "rope",
          amount: 2,
        },
        {
          shortname: "gears",
          amount: 2,
        },
      ],
    },
  },
  crossbow: {
    name: "Crossbow",
    shortname: "crossbow",
    category: "weapon",
    image: "/images/weapon/crossbow.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
        {
          shortname: "rope",
          amount: 2,
        },
      ],
    },
  },
  flamethrower: {
    name: "Flame Thrower",
    shortname: "flamethrower",
    category: "weapon",
    image: "/images/weapon/flamethrower.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 15,
        },
        {
          shortname: "metalpipe",
          amount: 6,
        },
        {
          shortname: "lowgradefuel",
          amount: 100,
        },
        {
          shortname: "propanetank",
          amount: 2,
        },
      ],
    },
  },
  "grenade.beancan": {
    shortname: "grenade.beancan",
    name: "Beancan Grenade",
    category: "weapon",
    image: "/images/weapon/grenade.beancan.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "gunpowder",
          amount: 60,
        },
        {
          shortname: "metal.fragments",
          amount: 20,
        },
      ],
    },
  },
  "grenade.bee": {
    shortname: "grenade.bee",
    name: "Bee Grenade",
    category: "weapon",
    image: "/images/weapon/grenade.bee.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "nucleus",
          amount: 1,
        },
        {
          shortname: "cloth",
          amount: 30,
        },
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
        {
          shortname: "gunpowder",
          amount: 30,
        },
        {
          shortname: "metal.fragments",
          amount: 25,
        },
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
        {
          shortname: "gunpowder",
          amount: 25,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
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
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "lowgradefuel",
          amount: 50,
        },
      ],
    },
  },
  "gun.water": {
    name: "Water Gun",
    shortname: "gun.water",
    category: "weapon",
    image: "/images/weapon/gun.water.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 125,
        },
      ],
    },
  },
  hmlmg: {
    name: "HMLMG",
    shortname: "hmlmg",
    category: "weapon",
    image: "/images/weapon/hmlmg.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 60,
        },
        {
          shortname: "riflebody",
          amount: 1,
        },
        {
          shortname: "metalspring",
          amount: 3,
        },
        {
          shortname: "gears",
          amount: 2,
        },
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
        {
          shortname: "metal.refined",
          amount: 20,
        },
        {
          shortname: "metalpipe",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
        {
          shortname: "cctv.camera",
          amount: 1,
        },
      ],
    },
  },
  "knife.bone": {
    name: "Bone Knife",
    shortname: "knife.bone",
    category: "weapon",
    image: "/images/weapon/knife.bone.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "bone.fragments",
          amount: 30,
        },
      ],
    },
  },
  "knife.butcher": {
    name: "Butcher Knife",
    shortname: "knife.butcher",
    category: "weapon",
    image: "/images/weapon/knife.butcher.png",
  },
  "knife.combat": {
    name: "Combat Knife",
    shortname: "knife.combat",
    category: "weapon",
    image: "/images/weapon/knife.combat.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "metal.refined",
          amount: 1,
        },
      ],
    },
  },
  "knife.skinning": {
    name: "Skinning Knife",
    shortname: "knife.skinning",
    category: "weapon",
    image: "/images/weapon/knife.skinning.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "lmg.m249": {
    name: "M249",
    shortname: "lmg.m249",
    category: "weapon",
    image: "/images/weapon/lmg.m249.png",
  },
  longsword: {
    name: "Longsword",
    shortname: "longsword",
    category: "weapon",
    image: "/images/weapon/longsword.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metalblade",
          amount: 2,
        },
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  mace: {
    name: "Mace",
    shortname: "mace",
    category: "weapon",
    image: "/images/weapon/mace.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  machete: {
    name: "Machete",
    shortname: "machete",
    category: "weapon",
    image: "/images/weapon/machete.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 40,
        },
      ],
    },
  },
  "military flamethrower": {
    name: "Military Flame Thrower",
    shortname: "military flamethrower",
    category: "weapon",
    image: "/images/weapon/military flamethrower.png",
  },
  minicrossbow: {
    name: "Mini Crossbow",
    shortname: "minicrossbow",
    category: "weapon",
    image: "/images/weapon/minicrossbow.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metal.fragments",
          amount: 150,
        },
        {
          shortname: "rope",
          amount: 1,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  minigun: {
    name: "Minigun",
    shortname: "minigun",
    category: "weapon",
    image: "/images/weapon/minigun.png",
  },
  multiplegrenadelauncher: {
    name: "Multiple Grenade Launcher",
    shortname: "multiplegrenadelauncher",
    category: "weapon",
    image: "/images/weapon/multiplegrenadelauncher.png",
  },
  paddle: {
    name: "Paddle",
    shortname: "paddle",
    category: "weapon",
    image: "/images/weapon/paddle.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 15,
        },
        {
          shortname: "metalblade",
          amount: 1,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  "pistol.eoka": {
    name: "Eoka Pistol",
    shortname: "pistol.eoka",
    category: "weapon",
    image: "/images/weapon/pistol.eoka.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 75,
        },
        {
          shortname: "metal.fragments",
          amount: 30,
        },
      ],
    },
  },
  "pistol.m92": {
    name: "M92 Pistol",
    shortname: "pistol.m92",
    category: "weapon",
    image: "/images/weapon/pistol.m92.png",
  },
  "pistol.nailgun": {
    name: "Nailgun",
    shortname: "pistol.nailgun",
    category: "weapon",
    image: "/images/weapon/pistol.nailgun.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
        {
          shortname: "scrap",
          amount: 15,
        },
      ],
    },
  },
  "pistol.prototype17": {
    name: "Prototype 17",
    shortname: "pistol.prototype17",
    category: "weapon",
    image: "/images/weapon/pistol.prototype17.png",
  },
  "pistol.python": {
    name: "Python Revolver",
    shortname: "pistol.python",
    category: "weapon",
    image: "/images/weapon/pistol.python.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metalpipe",
          amount: 3,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 10,
        },
      ],
    },
  },
  "pistol.revolver": {
    name: "Revolver",
    shortname: "pistol.revolver",
    category: "weapon",
    image: "/images/weapon/pistol.revolver.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "cloth",
          amount: 25,
        },
        {
          shortname: "metal.fragments",
          amount: 125,
        },
      ],
    },
  },
  "pistol.semiauto": {
    name: "Semi-Automatic Pistol",
    shortname: "pistol.semiauto",
    category: "weapon",
    image: "/images/weapon/pistol.semiauto.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "semibody",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 4,
        },
        {
          shortname: "metalpipe",
          amount: 1,
        },
      ],
    },
  },
  "pistol.water": {
    name: "Water Pistol",
    shortname: "pistol.water",
    category: "weapon",
    image: "/images/weapon/pistol.water.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  pitchfork: {
    name: "Pitchfork",
    shortname: "pitchfork",
    category: "weapon",
    image: "/images/weapon/pitchfork.png",
  },
  "revolver.hc": {
    name: "High Caliber Revolver",
    shortname: "revolver.hc",
    category: "weapon",
    image: "/images/weapon/revolver.hc.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metalpipe",
          amount: 4,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
        {
          shortname: "gears",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 6,
        },
      ],
    },
  },
  "rifle.ak": {
    name: "Assault Rifle",
    shortname: "rifle.ak",
    category: "weapon",
    image: "/images/weapon/rifle.ak.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 50,
        },
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "riflebody",
          amount: 1,
        },
        {
          shortname: "metalspring",
          amount: 4,
        },
      ],
    },
  },
  "rifle.bolt": {
    name: "Bolt Action Rifle",
    shortname: "rifle.bolt",
    category: "weapon",
    image: "/images/weapon/rifle.bolt.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 20,
        },
        {
          shortname: "riflebody",
          amount: 1,
        },
        {
          shortname: "metalpipe",
          amount: 3,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
      ],
    },
  },
  "rifle.l96": {
    name: "L96 Rifle",
    shortname: "rifle.l96",
    category: "weapon",
    image: "/images/weapon/rifle.l96.png",
  },
  "rifle.lr300": {
    name: "LR-300 Assault Rifle",
    shortname: "rifle.lr300",
    category: "weapon",
    image: "/images/weapon/rifle.lr300.png",
  },
  "rifle.m39": {
    name: "M39 Rifle",
    shortname: "rifle.m39",
    category: "weapon",
    image: "/images/weapon/rifle.m39.png",
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
        {
          shortname: "semibody",
          amount: 1,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 450,
        },
        {
          shortname: "metal.refined",
          amount: 4,
        },
      ],
    },
  },
  "rifle.sks": {
    name: "SKS",
    shortname: "rifle.sks",
    category: "weapon",
    image: "/images/weapon/rifle.sks.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "semibody",
          amount: 1,
        },
        {
          shortname: "metalspring",
          amount: 2,
        },
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "metal.refined",
          amount: 12,
        },
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
        {
          shortname: "metal.refined",
          amount: 40,
        },
        {
          shortname: "metalpipe",
          amount: 4,
        },
      ],
    },
  },
  "salvaged.cleaver": {
    name: "Salvaged Cleaver",
    shortname: "salvaged.cleaver",
    category: "weapon",
    image: "/images/weapon/salvaged.cleaver.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
        {
          shortname: "roadsigns",
          amount: 1,
        },
      ],
    },
  },
  "salvaged.sword": {
    name: "Salvaged Sword",
    shortname: "salvaged.sword",
    category: "weapon",
    image: "/images/weapon/salvaged.sword.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 15,
        },
        {
          shortname: "metalblade",
          amount: 1,
        },
      ],
    },
  },
  "shotgun.double": {
    name: "Double Barrel Shotgun",
    shortname: "shotgun.double",
    category: "weapon",
    image: "/images/weapon/shotgun.double.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 175,
        },
        {
          shortname: "metalpipe",
          amount: 2,
        },
      ],
    },
  },
  "shotgun.m4": {
    name: "M4 Shotgun",
    shortname: "shotgun.m4",
    category: "weapon",
    image: "/images/weapon/shotgun.m4.png",
  },
  "shotgun.pump": {
    name: "Pump Shotgun",
    shortname: "shotgun.pump",
    category: "weapon",
    image: "/images/weapon/shotgun.pump.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 15,
        },
        {
          shortname: "metalpipe",
          amount: 2,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
      ],
    },
  },
  "shotgun.spas12": {
    name: "Spas-12 Shotgun",
    shortname: "shotgun.spas12",
    category: "weapon",
    image: "/images/weapon/shotgun.spas12.png",
  },
  "shotgun.waterpipe": {
    name: "Waterpipe Shotgun",
    shortname: "shotgun.waterpipe",
    category: "weapon",
    image: "/images/weapon/shotgun.waterpipe.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  siegetower: {
    name: "Siege Tower",
    shortname: "siegetower",
    category: "weapon",
    image: "/images/weapon/siegetower.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 500,
        },
        {
          shortname: "metal.fragments",
          amount: 250,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  "smg.2": {
    name: "Custom SMG",
    shortname: "smg.2",
    category: "weapon",
    image: "/images/weapon/smg.2.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 8,
        },
        {
          shortname: "smgbody",
          amount: 1,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
      ],
    },
  },
  "smg.mp5": {
    name: "MP5A4",
    shortname: "smg.mp5",
    category: "weapon",
    image: "/images/weapon/smg.mp5.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 15,
        },
        {
          shortname: "smgbody",
          amount: 1,
        },
        {
          shortname: "metalspring",
          amount: 2,
        },
      ],
    },
  },
  "smg.thompson": {
    name: "Thompson",
    shortname: "smg.thompson",
    category: "weapon",
    image: "/images/weapon/smg.thompson.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "smgbody",
          amount: 1,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
      ],
    },
  },
  snowball: {
    name: "Snowball",
    shortname: "snowball",
    category: "weapon",
    image: "/images/weapon/snowball.png",
  },
  snowballgun: {
    name: "Snowball Gun",
    shortname: "snowballgun",
    category: "weapon",
    image: "/images/weapon/snowballgun.png",
  },
  "spear.stone": {
    shortname: "spear.stone",
    name: "Stone Spear",
    category: "weapon",
    image: "/images/weapon/spear.stone.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "spear.wooden",
          amount: 1,
        },
        {
          shortname: "stones",
          amount: 20,
        },
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
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
      ],
    },
  },
  speargun: {
    name: "Speargun",
    shortname: "speargun",
    category: "weapon",
    image: "/images/weapon/speargun.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
        {
          shortname: "propanetank",
          amount: 1,
        },
      ],
    },
  },
  t1_smg: {
    name: "Handmade SMG",
    shortname: "t1_smg",
    category: "weapon",
    image: "/images/weapon/t1_smg.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
      ],
    },
  },
  "vampire.stake": {
    name: "Vampire Stake",
    shortname: "vampire.stake",
    category: "weapon",
    image: "/images/weapon/vampire.stake.png",
  },
  "weapon.mod.8x.scope": {
    name: "Variable Zoom Scope",
    shortname: "weapon.mod.8x.scope",
    category: "weapon",
    image: "/images/weapon/weapon.mod.8x.scope.png",
  },
  "weapon.mod.extendedmags": {
    name: "Extended Magazine",
    shortname: "weapon.mod.extendedmags",
    category: "weapon",
    image: "/images/weapon/weapon.mod.extendedmags.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
      ],
    },
  },
  "weapon.mod.flashlight": {
    name: "Weapon flashlight",
    shortname: "weapon.mod.flashlight",
    category: "weapon",
    image: "/images/weapon/weapon.mod.flashlight.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
      ],
    },
  },
  "weapon.mod.gascompressionovedrive": {
    name: "Gas Compression Overdrive",
    shortname: "weapon.mod.gascompressionovedrive",
    category: "weapon",
    image: "/images/weapon/weapon.mod.gascompressionovedrive.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
      ],
    },
  },
  "weapon.mod.holosight": {
    name: "Holosight",
    shortname: "weapon.mod.holosight",
    category: "weapon",
    image: "/images/weapon/weapon.mod.holosight.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 12,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "weapon.mod.lasersight": {
    name: "Weapon Lasersight",
    shortname: "weapon.mod.lasersight",
    category: "weapon",
    image: "/images/weapon/weapon.mod.lasersight.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "weapon.mod.muzzleboost": {
    name: "Muzzle Boost",
    shortname: "weapon.mod.muzzleboost",
    category: "weapon",
    image: "/images/weapon/weapon.mod.muzzleboost.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
      ],
    },
  },
  "weapon.mod.muzzlebrake": {
    name: "Muzzle Brake",
    shortname: "weapon.mod.muzzlebrake",
    category: "weapon",
    image: "/images/weapon/weapon.mod.muzzlebrake.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 8,
        },
      ],
    },
  },
  "weapon.mod.oilfiltersilencer": {
    name: "Oil Filter Silencer",
    shortname: "weapon.mod.oilfiltersilencer",
    category: "weapon",
    image: "/images/weapon/weapon.mod.oilfiltersilencer.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
      ],
    },
  },
  "weapon.mod.silencer": {
    name: "Military Silencer",
    shortname: "weapon.mod.silencer",
    category: "weapon",
    image: "/images/weapon/weapon.mod.silencer.png",
  },
  "weapon.mod.simplesight": {
    name: "Simple Handmade Sight",
    shortname: "weapon.mod.simplesight",
    category: "weapon",
    image: "/images/weapon/weapon.mod.simplesight.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 6,
        },
      ],
    },
  },
  "weapon.mod.small.scope": {
    name: "8x Zoom Scope",
    shortname: "weapon.mod.small.scope",
    category: "weapon",
    image: "/images/weapon/weapon.mod.small.scope.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 50,
        },
      ],
    },
  },
  "weapon.mod.sodacansilencer": {
    name: "Soda Can Silencer",
    shortname: "weapon.mod.sodacansilencer",
    category: "weapon",
    image: "/images/weapon/weapon.mod.sodacansilencer.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 40,
        },
      ],
    },
  },
  "weapon.mod.targetingattachment": {
    name: "Targeting Attachment",
    shortname: "weapon.mod.targetingattachment",
    category: "weapon",
    image: "/images/weapon/weapon.mod.targetingattachment.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
};
