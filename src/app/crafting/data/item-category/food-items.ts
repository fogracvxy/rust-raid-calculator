import type { Item } from "../../types/item.types";

export type FoodItemCategory = "food";
export type FoodItemShortname =
  | "advancedcoolingtea"
  | "advancedcraftingtea_quality"
  | "advancedwarmingtea"
  | "advanceharvestingtea"
  | "apple"
  | "apple.spoiled"
  | "bearmeat"
  | "bearmeat.burned"
  | "bearmeat.cooked"
  | "bearmeat.spoiled"
  | "bigcatmeat"
  | "bigcatmeat.cooked"
  | "bigcatmeat.spoiled"
  | "black.berry"
  | "black.raspberries"
  | "blue.berry"
  | "blueberries"
  | "bottle.vodka"
  | "bread.loaf"
  | "cactusflesh"
  | "can.beans"
  | "can.tuna"
  | "candycane"
  | "chicken.burned"
  | "chicken.cooked"
  | "chicken.raw"
  | "chicken.spoiled"
  | "chocolate"
  | "clone.black.berry"
  | "clone.blue.berry"
  | "clone.corn"
  | "clone.green.berry"
  | "clone.hemp"
  | "clone.orchid"
  | "clone.potato"
  | "clone.pumpkin"
  | "clone.red.berry"
  | "clone.rose"
  | "clone.sunflower"
  | "clone.wheat"
  | "clone.white.berry"
  | "clone.yellow.berry"
  | "coolingtea"
  | "corn"
  | "craftingtea_quality"
  | "crocodilemeat"
  | "crocodilemeat.cooked"
  | "crocodilemeat.spoiled"
  | "deermeat.burned"
  | "deermeat.cooked"
  | "deermeat.raw"
  | "deermeat.spoiled"
  | "egg"
  | "fish.anchovy"
  | "fish.catfish"
  | "fish.cooked"
  | "fish.herring"
  | "fish.minnows"
  | "fish.orangeroughy"
  | "fish.raw"
  | "fish.salmon"
  | "fish.sardine"
  | "fish.smallshark"
  | "fish.spoiled"
  | "fish.troutsmall"
  | "fish.yellowperch"
  | "granolabar"
  | "green.berry"
  | "grub"
  | "harvestingtea"
  | "healingtea"
  | "healingtea.advanced"
  | "healingtea.pure"
  | "honey"
  | "honeycomb"
  | "horsemeat.burned"
  | "horsemeat.cooked"
  | "horsemeat.raw"
  | "horsemeat.spoiled"
  | "humanmeat.burned"
  | "humanmeat.cooked"
  | "humanmeat.raw"
  | "humanmeat.spoiled"
  | "jar.pickle"
  | "maxhealthtea"
  | "maxhealthtea.advanced"
  | "maxhealthtea.pure"
  | "meat.boar"
  | "meat.pork.burned"
  | "meat.pork.cooked"
  | "mushroom"
  | "orchid"
  | "oretea"
  | "oretea.advanced"
  | "oretea.pure"
  | "pie.apple"
  | "pie.bear"
  | "pie.bigcat"
  | "pie.chicken"
  | "pie.crocodile"
  | "pie.fish"
  | "pie.hunters"
  | "pie.pork"
  | "pie.pumpkin"
  | "pie.survivors"
  | "porkmeat.spoiled"
  | "potato"
  | "pumpkin"
  | "purecoolingtea"
  | "purecraftingtea_quality"
  | "pureharvestingtea"
  | "purewarmingtea"
  | "radiationresisttea"
  | "radiationresisttea.advanced"
  | "radiationresisttea.pure"
  | "red.berry"
  | "rose"
  | "scraptea"
  | "scraptea.advanced"
  | "scraptea.pure"
  | "seed.black.berry"
  | "seed.blue.berry"
  | "seed.corn"
  | "seed.green.berry"
  | "seed.hemp"
  | "seed.orchid"
  | "seed.potato"
  | "seed.pumpkin"
  | "seed.red.berry"
  | "seed.rose"
  | "seed.sunflower"
  | "seed.wheat"
  | "seed.white.berry"
  | "seed.yellow.berry"
  | "smallwaterbottle"
  | "snakemeat"
  | "snakemeat.cooked"
  | "snakemeat.spoiled"
  | "spoiled.produce"
  | "sunflower"
  | "supertea"
  | "warmingtea"
  | "waterjug"
  | "wheat"
  | "white.berry"
  | "wolfmeat.burned"
  | "wolfmeat.cooked"
  | "wolfmeat.raw"
  | "wolfmeat.spoiled"
  | "woodtea"
  | "woodtea.advanced"
  | "woodtea.pure"
  | "worm"
  | "yellow.berry";

export const foodItems: {
  [K in FoodItemShortname]: Item<K> & { category: FoodItemCategory };
} = {
  advancedcoolingtea: {
    name: "Advanced Cooling Tea",
    shortname: "advancedcoolingtea",
    category: "food",
    image: "/images/food/advancedcoolingtea.png",
  },
  advancedcraftingtea_quality: {
    name: "Advanced Crafting Quality Tea",
    shortname: "advancedcraftingtea_quality",
    category: "food",
    image: "/images/food/advancedcraftingtea_quality.png",
  },
  advancedwarmingtea: {
    name: "Advanced Warming Tea",
    shortname: "advancedwarmingtea",
    category: "food",
    image: "/images/food/advancedwarmingtea.png",
  },
  advanceharvestingtea: {
    name: "Advanced Harvesting Tea",
    shortname: "advanceharvestingtea",
    category: "food",
    image: "/images/food/advanceharvestingtea.png",
  },
  apple: {
    name: "Apple",
    shortname: "apple",
    category: "food",
    image: "/images/food/apple.png",
  },
  "apple.spoiled": {
    name: "Rotten Apple",
    shortname: "apple.spoiled",
    category: "food",
    image: "/images/food/apple.spoiled.png",
  },
  bearmeat: {
    name: "Raw Bear Meat",
    shortname: "bearmeat",
    category: "food",
    image: "/images/food/bearmeat.png",
  },
  "bearmeat.burned": {
    name: "Burnt Bear Meat",
    shortname: "bearmeat.burned",
    category: "food",
    image: "/images/food/bearmeat.burned.png",
  },
  "bearmeat.cooked": {
    name: "Cooked Bear Meat",
    shortname: "bearmeat.cooked",
    category: "food",
    image: "/images/food/bearmeat.cooked.png",
  },
  "bearmeat.spoiled": {
    name: "Spoiled Bear Meat",
    shortname: "bearmeat.spoiled",
    category: "food",
    image: "/images/food/bearmeat.spoiled.png",
  },
  bigcatmeat: {
    name: "Raw Big Cat Meat",
    shortname: "bigcatmeat",
    category: "food",
    image: "/images/food/bigcatmeat.png",
  },
  "bigcatmeat.cooked": {
    name: "Cooked Big Cat Meat",
    shortname: "bigcatmeat.cooked",
    category: "food",
    image: "/images/food/bigcatmeat.cooked.png",
  },
  "bigcatmeat.spoiled": {
    name: "Spoiled Big Cat Meat",
    shortname: "bigcatmeat.spoiled",
    category: "food",
    image: "/images/food/bigcatmeat.spoiled.png",
  },
  "black.berry": {
    name: "Black Berry",
    shortname: "black.berry",
    category: "food",
    image: "/images/food/black.berry.png",
  },
  "black.raspberries": {
    name: "Black Raspberries",
    shortname: "black.raspberries",
    category: "food",
    image: "/images/food/black.raspberries.png",
  },
  "blue.berry": {
    name: "Blue Berry",
    shortname: "blue.berry",
    category: "food",
    image: "/images/food/blue.berry.png",
  },
  blueberries: {
    name: "Blueberries",
    shortname: "blueberries",
    category: "food",
    image: "/images/food/blueberries.png",
  },
  "bottle.vodka": {
    name: "Vodka Bottle",
    shortname: "bottle.vodka",
    category: "food",
    image: "/images/food/bottle.vodka.png",
  },
  "bread.loaf": {
    name: "Bread Loaf",
    shortname: "bread.loaf",
    category: "food",
    image: "/images/food/bread.loaf.png",
  },
  cactusflesh: {
    name: "Cactus Flesh",
    shortname: "cactusflesh",
    category: "food",
    image: "/images/food/cactusflesh.png",
  },
  "can.beans": {
    name: "Can of Beans",
    shortname: "can.beans",
    category: "food",
    image: "/images/food/can.beans.png",
  },
  "can.tuna": {
    name: "Can of Tuna",
    shortname: "can.tuna",
    category: "food",
    image: "/images/food/can.tuna.png",
  },
  candycane: {
    name: "Candy Cane",
    shortname: "candycane",
    category: "food",
    image: "/images/food/candycane.png",
  },
  "chicken.burned": {
    name: "Burnt Chicken",
    shortname: "chicken.burned",
    category: "food",
    image: "/images/food/chicken.burned.png",
  },
  "chicken.cooked": {
    name: "Cooked Chicken",
    shortname: "chicken.cooked",
    category: "food",
    image: "/images/food/chicken.cooked.png",
  },
  "chicken.raw": {
    name: "Raw Chicken Breast",
    shortname: "chicken.raw",
    category: "food",
    image: "/images/food/chicken.raw.png",
  },
  "chicken.spoiled": {
    name: "Spoiled Chicken",
    shortname: "chicken.spoiled",
    category: "food",
    image: "/images/food/chicken.spoiled.png",
  },
  chocolate: {
    name: "Chocolate Bar",
    shortname: "chocolate",
    category: "food",
    image: "/images/food/chocolate.png",
  },
  "clone.black.berry": {
    name: "Black Berry Clone",
    shortname: "clone.black.berry",
    category: "food",
    image: "/images/food/clone.black.berry.png",
  },
  "clone.blue.berry": {
    name: "Blue Berry Clone",
    shortname: "clone.blue.berry",
    category: "food",
    image: "/images/food/clone.blue.berry.png",
  },
  "clone.corn": {
    name: "Corn Clone",
    shortname: "clone.corn",
    category: "food",
    image: "/images/food/clone.corn.png",
  },
  "clone.green.berry": {
    name: "Green Berry Clone",
    shortname: "clone.green.berry",
    category: "food",
    image: "/images/food/clone.green.berry.png",
  },
  "clone.hemp": {
    name: "Hemp Clone",
    shortname: "clone.hemp",
    category: "food",
    image: "/images/food/clone.hemp.png",
  },
  "clone.orchid": {
    name: "Orchid Clone",
    shortname: "clone.orchid",
    category: "food",
    image: "/images/food/clone.orchid.png",
  },
  "clone.potato": {
    name: "Potato Clone",
    shortname: "clone.potato",
    category: "food",
    image: "/images/food/clone.potato.png",
  },
  "clone.pumpkin": {
    name: "Pumpkin Plant Clone",
    shortname: "clone.pumpkin",
    category: "food",
    image: "/images/food/clone.pumpkin.png",
  },
  "clone.red.berry": {
    name: "Red Berry Clone",
    shortname: "clone.red.berry",
    category: "food",
    image: "/images/food/clone.red.berry.png",
  },
  "clone.rose": {
    name: "Rose Clone",
    shortname: "clone.rose",
    category: "food",
    image: "/images/food/clone.rose.png",
  },
  "clone.sunflower": {
    name: "Sunflower Clone",
    shortname: "clone.sunflower",
    category: "food",
    image: "/images/food/clone.sunflower.png",
  },
  "clone.wheat": {
    name: "Wheat Clone",
    shortname: "clone.wheat",
    category: "food",
    image: "/images/food/clone.wheat.png",
  },
  "clone.white.berry": {
    name: "White Berry Clone",
    shortname: "clone.white.berry",
    category: "food",
    image: "/images/food/clone.white.berry.png",
  },
  "clone.yellow.berry": {
    name: "Yellow Berry Clone",
    shortname: "clone.yellow.berry",
    category: "food",
    image: "/images/food/clone.yellow.berry.png",
  },
  coolingtea: {
    name: "Basic Cooling Tea",
    shortname: "coolingtea",
    category: "food",
    image: "/images/food/coolingtea.png",
  },
  corn: {
    name: "Corn",
    shortname: "corn",
    category: "food",
    image: "/images/food/corn.png",
  },
  craftingtea_quality: {
    name: "Basic Crafting Quality Tea",
    shortname: "craftingtea_quality",
    category: "food",
    image: "/images/food/craftingtea_quality.png",
  },
  crocodilemeat: {
    name: "Raw Crocodile Meat",
    shortname: "crocodilemeat",
    category: "food",
    image: "/images/food/crocodilemeat.png",
  },
  "crocodilemeat.cooked": {
    name: "Cooked Crocodile Meat",
    shortname: "crocodilemeat.cooked",
    category: "food",
    image: "/images/food/crocodilemeat.cooked.png",
  },
  "crocodilemeat.spoiled": {
    name: "Spoiled Crocodile Meat",
    shortname: "crocodilemeat.spoiled",
    category: "food",
    image: "/images/food/crocodilemeat.spoiled.png",
  },
  "deermeat.burned": {
    name: "Burnt Deer Meat",
    shortname: "deermeat.burned",
    category: "food",
    image: "/images/food/deermeat.burned.png",
  },
  "deermeat.cooked": {
    name: "Cooked Deer Meat",
    shortname: "deermeat.cooked",
    category: "food",
    image: "/images/food/deermeat.cooked.png",
  },
  "deermeat.raw": {
    name: "Raw Deer Meat",
    shortname: "deermeat.raw",
    category: "food",
    image: "/images/food/deermeat.raw.png",
  },
  "deermeat.spoiled": {
    name: "Spoiled Deer Meat",
    shortname: "deermeat.spoiled",
    category: "food",
    image: "/images/food/deermeat.spoiled.png",
  },
  egg: {
    name: "Egg",
    shortname: "egg",
    category: "food",
    image: "/images/food/egg.png",
  },
  "fish.anchovy": {
    name: "Anchovy",
    shortname: "fish.anchovy",
    category: "food",
    image: "/images/food/fish.anchovy.png",
  },
  "fish.catfish": {
    name: "Catfish",
    shortname: "fish.catfish",
    category: "food",
    image: "/images/food/fish.catfish.png",
  },
  "fish.cooked": {
    name: "Cooked Fish",
    shortname: "fish.cooked",
    category: "food",
    image: "/images/food/fish.cooked.png",
  },
  "fish.herring": {
    name: "Herring",
    shortname: "fish.herring",
    category: "food",
    image: "/images/food/fish.herring.png",
  },
  "fish.minnows": {
    name: "Minnows",
    shortname: "fish.minnows",
    category: "food",
    image: "/images/food/fish.minnows.png",
  },
  "fish.orangeroughy": {
    name: "Orange Roughy",
    shortname: "fish.orangeroughy",
    category: "food",
    image: "/images/food/fish.orangeroughy.png",
  },
  "fish.raw": {
    name: "Raw Fish",
    shortname: "fish.raw",
    category: "food",
    image: "/images/food/fish.raw.png",
  },
  "fish.salmon": {
    name: "Salmon",
    shortname: "fish.salmon",
    category: "food",
    image: "/images/food/fish.salmon.png",
  },
  "fish.sardine": {
    name: "Sardine",
    shortname: "fish.sardine",
    category: "food",
    image: "/images/food/fish.sardine.png",
  },
  "fish.smallshark": {
    name: "Small Shark",
    shortname: "fish.smallshark",
    category: "food",
    image: "/images/food/fish.smallshark.png",
  },
  "fish.spoiled": {
    name: "Spoiled Fish Meat",
    shortname: "fish.spoiled",
    category: "food",
    image: "/images/food/fish.spoiled.png",
  },
  "fish.troutsmall": {
    name: "Small Trout",
    shortname: "fish.troutsmall",
    category: "food",
    image: "/images/food/fish.troutsmall.png",
  },
  "fish.yellowperch": {
    name: "Yellow Perch",
    shortname: "fish.yellowperch",
    category: "food",
    image: "/images/food/fish.yellowperch.png",
  },
  granolabar: {
    name: "Granola Bar",
    shortname: "granolabar",
    category: "food",
    image: "/images/food/granolabar.png",
  },
  "green.berry": {
    name: "Green Berry",
    shortname: "green.berry",
    category: "food",
    image: "/images/food/green.berry.png",
  },
  grub: {
    name: "Grub",
    shortname: "grub",
    category: "food",
    image: "/images/food/grub.png",
  },
  harvestingtea: {
    name: "Basic Harvesting Tea",
    shortname: "harvestingtea",
    category: "food",
    image: "/images/food/harvestingtea.png",
  },
  healingtea: {
    name: "Basic Healing Tea",
    shortname: "healingtea",
    category: "food",
    image: "/images/food/healingtea.png",
  },
  "healingtea.advanced": {
    name: "Advanced Healing Tea",
    shortname: "healingtea.advanced",
    category: "food",
    image: "/images/food/healingtea.advanced.png",
  },
  "healingtea.pure": {
    name: "Pure Healing Tea",
    shortname: "healingtea.pure",
    category: "food",
    image: "/images/food/healingtea.pure.png",
  },
  honey: {
    name: "Jar of Honey",
    shortname: "honey",
    category: "food",
    image: "/images/food/honey.png",
  },
  honeycomb: {
    name: "Honeycomb",
    shortname: "honeycomb",
    category: "food",
    image: "/images/food/honeycomb.png",
  },
  "horsemeat.burned": {
    name: "Burnt Horse Meat",
    shortname: "horsemeat.burned",
    category: "food",
    image: "/images/food/horsemeat.burned.png",
  },
  "horsemeat.cooked": {
    name: "Cooked Horse Meat",
    shortname: "horsemeat.cooked",
    category: "food",
    image: "/images/food/horsemeat.cooked.png",
  },
  "horsemeat.raw": {
    name: "Raw Horse Meat",
    shortname: "horsemeat.raw",
    category: "food",
    image: "/images/food/horsemeat.raw.png",
  },
  "horsemeat.spoiled": {
    name: "Spoiled Horse Meat",
    shortname: "horsemeat.spoiled",
    category: "food",
    image: "/images/food/horsemeat.spoiled.png",
  },
  "humanmeat.burned": {
    name: "Burnt Human Meat",
    shortname: "humanmeat.burned",
    category: "food",
    image: "/images/food/humanmeat.burned.png",
  },
  "humanmeat.cooked": {
    name: "Cooked Human Meat",
    shortname: "humanmeat.cooked",
    category: "food",
    image: "/images/food/humanmeat.cooked.png",
  },
  "humanmeat.raw": {
    name: "Raw Human Meat",
    shortname: "humanmeat.raw",
    category: "food",
    image: "/images/food/humanmeat.raw.png",
  },
  "humanmeat.spoiled": {
    name: "Spoiled Human Meat",
    shortname: "humanmeat.spoiled",
    category: "food",
    image: "/images/food/humanmeat.spoiled.png",
  },
  "jar.pickle": {
    name: "Pickles",
    shortname: "jar.pickle",
    category: "food",
    image: "/images/food/jar.pickle.png",
  },
  maxhealthtea: {
    name: "Basic Max Health Tea",
    shortname: "maxhealthtea",
    category: "food",
    image: "/images/food/maxhealthtea.png",
  },
  "maxhealthtea.advanced": {
    name: "Advanced Max Health Tea",
    shortname: "maxhealthtea.advanced",
    category: "food",
    image: "/images/food/maxhealthtea.advanced.png",
  },
  "maxhealthtea.pure": {
    name: "Pure Max Health Tea",
    shortname: "maxhealthtea.pure",
    category: "food",
    image: "/images/food/maxhealthtea.pure.png",
  },
  "meat.boar": {
    name: "Raw Pork",
    shortname: "meat.boar",
    category: "food",
    image: "/images/food/meat.boar.png",
  },
  "meat.pork.burned": {
    name: "Burnt Pork",
    shortname: "meat.pork.burned",
    category: "food",
    image: "/images/food/meat.pork.burned.png",
  },
  "meat.pork.cooked": {
    name: "Cooked Pork",
    shortname: "meat.pork.cooked",
    category: "food",
    image: "/images/food/meat.pork.cooked.png",
  },
  mushroom: {
    name: "Mushroom",
    shortname: "mushroom",
    category: "food",
    image: "/images/food/mushroom.png",
  },
  orchid: {
    name: "Orchid",
    shortname: "orchid",
    category: "food",
    image: "/images/food/orchid.png",
  },
  oretea: {
    name: "Basic Ore Tea",
    shortname: "oretea",
    category: "food",
    image: "/images/food/oretea.png",
  },
  "oretea.advanced": {
    name: "Advanced Ore Tea",
    shortname: "oretea.advanced",
    category: "food",
    image: "/images/food/oretea.advanced.png",
  },
  "oretea.pure": {
    name: "Pure Ore Tea",
    shortname: "oretea.pure",
    category: "food",
    image: "/images/food/oretea.pure.png",
  },
  "pie.apple": {
    name: "Apple Pie",
    shortname: "pie.apple",
    category: "food",
    image: "/images/food/pie.apple.png",
  },
  "pie.bear": {
    name: "Bear Pie",
    shortname: "pie.bear",
    category: "food",
    image: "/images/food/pie.bear.png",
  },
  "pie.bigcat": {
    name: "Big Cat Pie",
    shortname: "pie.bigcat",
    category: "food",
    image: "/images/food/pie.bigcat.png",
  },
  "pie.chicken": {
    name: "Chicken Pie",
    shortname: "pie.chicken",
    category: "food",
    image: "/images/food/pie.chicken.png",
  },
  "pie.crocodile": {
    name: "Crocodile Pie",
    shortname: "pie.crocodile",
    category: "food",
    image: "/images/food/pie.crocodile.png",
  },
  "pie.fish": {
    name: "Fish Pie",
    shortname: "pie.fish",
    category: "food",
    image: "/images/food/pie.fish.png",
  },
  "pie.hunters": {
    name: "Hunters Pie",
    shortname: "pie.hunters",
    category: "food",
    image: "/images/food/pie.hunters.png",
  },
  "pie.pork": {
    name: "Pork Pie",
    shortname: "pie.pork",
    category: "food",
    image: "/images/food/pie.pork.png",
  },
  "pie.pumpkin": {
    name: "Pumpkin Pie",
    shortname: "pie.pumpkin",
    category: "food",
    image: "/images/food/pie.pumpkin.png",
  },
  "pie.survivors": {
    name: "Survivor's Pie",
    shortname: "pie.survivors",
    category: "food",
    image: "/images/food/pie.survivors.png",
  },
  "porkmeat.spoiled": {
    name: "Spoiled Pork Meat",
    shortname: "porkmeat.spoiled",
    category: "food",
    image: "/images/food/porkmeat.spoiled.png",
  },
  potato: {
    name: "Potato",
    shortname: "potato",
    category: "food",
    image: "/images/food/potato.png",
  },
  pumpkin: {
    name: "Pumpkin",
    shortname: "pumpkin",
    category: "food",
    image: "/images/food/pumpkin.png",
  },
  purecoolingtea: {
    name: "Pure Cooling Tea",
    shortname: "purecoolingtea",
    category: "food",
    image: "/images/food/purecoolingtea.png",
  },
  purecraftingtea_quality: {
    name: "Pure Crafting Quality Tea",
    shortname: "purecraftingtea_quality",
    category: "food",
    image: "/images/food/purecraftingtea_quality.png",
  },
  pureharvestingtea: {
    name: "Pure Harvesting Tea",
    shortname: "pureharvestingtea",
    category: "food",
    image: "/images/food/pureharvestingtea.png",
  },
  purewarmingtea: {
    name: "Pure Warming Tea",
    shortname: "purewarmingtea",
    category: "food",
    image: "/images/food/purewarmingtea.png",
  },
  radiationresisttea: {
    name: "Basic Anti-Rad Tea",
    shortname: "radiationresisttea",
    category: "food",
    image: "/images/food/radiationresisttea.png",
  },
  "radiationresisttea.advanced": {
    name: "Advanced Anti-Rad Tea",
    shortname: "radiationresisttea.advanced",
    category: "food",
    image: "/images/food/radiationresisttea.advanced.png",
  },
  "radiationresisttea.pure": {
    name: "Pure Anti-Rad Tea",
    shortname: "radiationresisttea.pure",
    category: "food",
    image: "/images/food/radiationresisttea.pure.png",
  },
  "red.berry": {
    name: "Red Berry",
    shortname: "red.berry",
    category: "food",
    image: "/images/food/red.berry.png",
  },
  rose: {
    name: "Rose",
    shortname: "rose",
    category: "food",
    image: "/images/food/rose.png",
  },
  scraptea: {
    name: "Basic Scrap Tea",
    shortname: "scraptea",
    category: "food",
    image: "/images/food/scraptea.png",
  },
  "scraptea.advanced": {
    name: "Advanced Scrap Tea",
    shortname: "scraptea.advanced",
    category: "food",
    image: "/images/food/scraptea.advanced.png",
  },
  "scraptea.pure": {
    name: "Pure Scrap Tea",
    shortname: "scraptea.pure",
    category: "food",
    image: "/images/food/scraptea.pure.png",
  },
  "seed.black.berry": {
    name: "Black Berry Seed",
    shortname: "seed.black.berry",
    category: "food",
    image: "/images/food/seed.black.berry.png",
  },
  "seed.blue.berry": {
    name: "Blue Berry Seed",
    shortname: "seed.blue.berry",
    category: "food",
    image: "/images/food/seed.blue.berry.png",
  },
  "seed.corn": {
    name: "Corn Seed",
    shortname: "seed.corn",
    category: "food",
    image: "/images/food/seed.corn.png",
  },
  "seed.green.berry": {
    name: "Green Berry Seed",
    shortname: "seed.green.berry",
    category: "food",
    image: "/images/food/seed.green.berry.png",
  },
  "seed.hemp": {
    name: "Hemp Seed",
    shortname: "seed.hemp",
    category: "food",
    image: "/images/food/seed.hemp.png",
  },
  "seed.orchid": {
    name: "Orchid Seed",
    shortname: "seed.orchid",
    category: "food",
    image: "/images/food/seed.orchid.png",
  },
  "seed.potato": {
    name: "Potato Seed",
    shortname: "seed.potato",
    category: "food",
    image: "/images/food/seed.potato.png",
  },
  "seed.pumpkin": {
    name: "Pumpkin Seed",
    shortname: "seed.pumpkin",
    category: "food",
    image: "/images/food/seed.pumpkin.png",
  },
  "seed.red.berry": {
    name: "Red Berry Seed",
    shortname: "seed.red.berry",
    category: "food",
    image: "/images/food/seed.red.berry.png",
  },
  "seed.rose": {
    name: "Rose Seed",
    shortname: "seed.rose",
    category: "food",
    image: "/images/food/seed.rose.png",
  },
  "seed.sunflower": {
    name: "Sunflower Seed",
    shortname: "seed.sunflower",
    category: "food",
    image: "/images/food/seed.sunflower.png",
  },
  "seed.wheat": {
    name: "Wheat Seed",
    shortname: "seed.wheat",
    category: "food",
    image: "/images/food/seed.wheat.png",
  },
  "seed.white.berry": {
    name: "White Berry Seed",
    shortname: "seed.white.berry",
    category: "food",
    image: "/images/food/seed.white.berry.png",
  },
  "seed.yellow.berry": {
    name: "Yellow Berry Seed",
    shortname: "seed.yellow.berry",
    category: "food",
    image: "/images/food/seed.yellow.berry.png",
  },
  smallwaterbottle: {
    name: "Small Water Bottle",
    shortname: "smallwaterbottle",
    category: "food",
    image: "/images/food/smallwaterbottle.png",
  },
  snakemeat: {
    name: "Raw Snake Meat",
    shortname: "snakemeat",
    category: "food",
    image: "/images/food/snakemeat.png",
  },
  "snakemeat.cooked": {
    name: "Cooked Snake Meat",
    shortname: "snakemeat.cooked",
    category: "food",
    image: "/images/food/snakemeat.cooked.png",
  },
  "snakemeat.spoiled": {
    name: "Spoiled Snake Meat",
    shortname: "snakemeat.spoiled",
    category: "food",
    image: "/images/food/snakemeat.spoiled.png",
  },
  "spoiled.produce": {
    name: "Spoiled Produce",
    shortname: "spoiled.produce",
    category: "food",
    image: "/images/food/spoiled.produce.png",
  },
  sunflower: {
    name: "Sunflower",
    shortname: "sunflower",
    category: "food",
    image: "/images/food/sunflower.png",
  },
  supertea: {
    name: "Super Serum",
    shortname: "supertea",
    category: "food",
    image: "/images/food/supertea.png",
  },
  warmingtea: {
    name: "Basic Warming Tea",
    shortname: "warmingtea",
    category: "food",
    image: "/images/food/warmingtea.png",
  },
  waterjug: {
    name: "Water Jug",
    shortname: "waterjug",
    category: "food",
    image: "/images/food/waterjug.png",
  },
  wheat: {
    name: "Wheat",
    shortname: "wheat",
    category: "food",
    image: "/images/food/wheat.png",
  },
  "white.berry": {
    name: "White Berry",
    shortname: "white.berry",
    category: "food",
    image: "/images/food/white.berry.png",
  },
  "wolfmeat.burned": {
    name: "Burnt Wolf Meat",
    shortname: "wolfmeat.burned",
    category: "food",
    image: "/images/food/wolfmeat.burned.png",
  },
  "wolfmeat.cooked": {
    name: "Cooked Wolf Meat",
    shortname: "wolfmeat.cooked",
    category: "food",
    image: "/images/food/wolfmeat.cooked.png",
  },
  "wolfmeat.raw": {
    name: "Raw Wolf Meat",
    shortname: "wolfmeat.raw",
    category: "food",
    image: "/images/food/wolfmeat.raw.png",
  },
  "wolfmeat.spoiled": {
    name: "Spoiled Wolf Meat",
    shortname: "wolfmeat.spoiled",
    category: "food",
    image: "/images/food/wolfmeat.spoiled.png",
  },
  woodtea: {
    name: "Basic Wood Tea",
    shortname: "woodtea",
    category: "food",
    image: "/images/food/woodtea.png",
  },
  "woodtea.advanced": {
    name: "Advanced Wood Tea",
    shortname: "woodtea.advanced",
    category: "food",
    image: "/images/food/woodtea.advanced.png",
  },
  "woodtea.pure": {
    name: "Pure Wood Tea",
    shortname: "woodtea.pure",
    category: "food",
    image: "/images/food/woodtea.pure.png",
  },
  worm: {
    name: "Worm",
    shortname: "worm",
    category: "food",
    image: "/images/food/worm.png",
  },
  "yellow.berry": {
    name: "Yellow Berry",
    shortname: "yellow.berry",
    category: "food",
    image: "/images/food/yellow.berry.png",
  },
};
