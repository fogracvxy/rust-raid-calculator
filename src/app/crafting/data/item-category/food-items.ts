import type { Item } from "../../types/item.types";

export type FoodItemCategory = "food";
export type FoodItemShortname =
  | "radiationresisttea.advanced"
  | "advancedcoolingtea"
  | "advancedcraftingtea_quality"
  | "advanceharvestingtea"
  | "healingtea.advanced"
  | "maxhealthtea.advanced"
  | "oretea.advanced"
  | "radiationremovetea.advanced"
  | "scraptea.advanced"
  | "advancedwarmingtea"
  | "woodtea.advanced"
  | "fish.anchovy"
  | "apple"
  | "pie.apple"
  | "radiationresisttea"
  | "coolingtea"
  | "craftingtea_quality"
  | "harvestingtea"
  | "healingtea"
  | "maxhealthtea"
  | "oretea"
  | "scraptea"
  | "warmingtea"
  | "woodtea"
  | "pie.bear"
  | "pie.bigcat"
  | "black.berry"
  | "clone.black.berry"
  | "seed.black.berry"
  | "black.raspberries"
  | "blue.berry"
  | "clone.blue.berry"
  | "seed.blue.berry"
  | "blueberries"
  | "bread.loaf"
  | "bearmeat.burned"
  | "chicken.burned"
  | "deermeat.burned"
  | "horsemeat.burned"
  | "humanmeat.burned"
  | "meat.pork.burned"
  | "wolfmeat.burned"
  | "cactusflesh"
  | "can.beans"
  | "can.tuna"
  | "candycane"
  | "fish.catfish"
  | "pie.chicken"
  | "chocolate"
  | "bearmeat.cooked"
  | "bigcatmeat.cooked"
  | "chicken.cooked"
  | "crocodilemeat.cooked"
  | "deermeat.cooked"
  | "fish.cooked"
  | "horsemeat.cooked"
  | "humanmeat.cooked"
  | "meat.pork.cooked"
  | "snakemeat.cooked"
  | "wolfmeat.cooked"
  | "corn"
  | "clone.corn"
  | "seed.corn"
  | "pie.crocodile"
  | "egg"
  | "pie.fish"
  | "granolabar"
  | "green.berry"
  | "clone.green.berry"
  | "seed.green.berry"
  | "grub"
  | "clone.hemp"
  | "seed.hemp"
  | "fish.herring"
  | "honeycomb"
  | "pie.hunters"
  | "honey"
  | "fish.minnows"
  | "mushroom"
  | "fish.orangeroughy"
  | "orchid"
  | "clone.orchid"
  | "seed.orchid"
  | "jar.pickle"
  | "pie.pork"
  | "potato"
  | "clone.potato"
  | "seed.potato"
  | "pumpkin"
  | "pie.pumpkin"
  | "clone.pumpkin"
  | "seed.pumpkin"
  | "radiationresisttea.pure"
  | "purecoolingtea"
  | "purecraftingtea_quality"
  | "pureharvestingtea"
  | "healingtea.pure"
  | "maxhealthtea.pure"
  | "oretea.pure"
  | "radiationremovetea.pure"
  | "scraptea.pure"
  | "purewarmingtea"
  | "woodtea.pure"
  | "radiationremovetea"
  | "bearmeat"
  | "bigcatmeat"
  | "chicken.raw"
  | "crocodilemeat"
  | "deermeat.raw"
  | "fish.raw"
  | "horsemeat.raw"
  | "humanmeat.raw"
  | "meat.boar"
  | "snakemeat"
  | "wolfmeat.raw"
  | "red.berry"
  | "clone.red.berry"
  | "seed.red.berry"
  | "rose"
  | "clone.rose"
  | "seed.rose"
  | "apple.spoiled"
  | "fish.salmon"
  | "fish.sardine"
  | "fish.smallshark"
  | "fish.troutsmall"
  | "smallwaterbottle"
  | "bearmeat.spoiled"
  | "bigcatmeat.spoiled"
  | "chicken.spoiled"
  | "crocodilemeat.spoiled"
  | "deermeat.spoiled"
  | "fish.spoiled"
  | "horsemeat.spoiled"
  | "humanmeat.spoiled"
  | "porkmeat.spoiled"
  | "spoiled.produce"
  | "snakemeat.spoiled"
  | "wolfmeat.spoiled"
  | "sunflower"
  | "clone.sunflower"
  | "seed.sunflower"
  | "supertea"
  | "pie.survivors"
  | "bottle.vodka"
  | "waterjug"
  | "wheat"
  | "clone.wheat"
  | "seed.wheat"
  | "white.berry"
  | "clone.white.berry"
  | "seed.white.berry"
  | "worm"
  | "yellow.berry"
  | "clone.yellow.berry"
  | "seed.yellow.berry"
  | "fish.yellowperch";

export const foodItems: {
  [K in FoodItemShortname]: Item<K> & { category: FoodItemCategory };
} = {
  "radiationresisttea.advanced": {
    name: "Advanced Anti-Rad Tea",
    shortname: "radiationresisttea.advanced",
    category: "food",
    image: "/images/food/radiationresisttea.advanced.png",
  },
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
  advanceharvestingtea: {
    name: "Advanced Harvesting Tea",
    shortname: "advanceharvestingtea",
    category: "food",
    image: "/images/food/advanceharvestingtea.png",
  },
  "healingtea.advanced": {
    name: "Advanced Healing Tea",
    shortname: "healingtea.advanced",
    category: "food",
    image: "/images/food/healingtea.advanced.png",
  },
  "maxhealthtea.advanced": {
    name: "Advanced Max Health Tea",
    shortname: "maxhealthtea.advanced",
    category: "food",
    image: "/images/food/maxhealthtea.advanced.png",
  },
  "oretea.advanced": {
    name: "Advanced Ore Tea",
    shortname: "oretea.advanced",
    category: "food",
    image: "/images/food/oretea.advanced.png",
  },
  "radiationremovetea.advanced": {
    name: "Advanced Rad. Removal Tea",
    shortname: "radiationremovetea.advanced",
    category: "food",
    image: "/images/food/radiationremovetea.advanced.png",
  },
  "scraptea.advanced": {
    name: "Advanced Scrap Tea",
    shortname: "scraptea.advanced",
    category: "food",
    image: "/images/food/scraptea.advanced.png",
  },
  advancedwarmingtea: {
    name: "Advanced Warming Tea",
    shortname: "advancedwarmingtea",
    category: "food",
    image: "/images/food/advancedwarmingtea.png",
  },
  "woodtea.advanced": {
    name: "Advanced Wood Tea",
    shortname: "woodtea.advanced",
    category: "food",
    image: "/images/food/woodtea.advanced.png",
  },
  "fish.anchovy": {
    name: "Anchovy",
    shortname: "fish.anchovy",
    category: "food",
    image: "/images/food/fish.anchovy.png",
  },
  apple: {
    name: "Apple",
    shortname: "apple",
    category: "food",
    image: "/images/food/apple.png",
  },
  "pie.apple": {
    name: "Apple Pie",
    shortname: "pie.apple",
    category: "food",
    image: "/images/food/pie.apple.png",
  },
  radiationresisttea: {
    name: "Basic Anti-Rad Tea",
    shortname: "radiationresisttea",
    category: "food",
    image: "/images/food/radiationresisttea.png",
  },
  coolingtea: {
    name: "Basic Cooling Tea",
    shortname: "coolingtea",
    category: "food",
    image: "/images/food/coolingtea.png",
  },
  craftingtea_quality: {
    name: "Basic Crafting Quality Tea",
    shortname: "craftingtea_quality",
    category: "food",
    image: "/images/food/craftingtea_quality.png",
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
  maxhealthtea: {
    name: "Basic Max Health Tea",
    shortname: "maxhealthtea",
    category: "food",
    image: "/images/food/maxhealthtea.png",
  },
  oretea: {
    name: "Basic Ore Tea",
    shortname: "oretea",
    category: "food",
    image: "/images/food/oretea.png",
  },
  scraptea: {
    name: "Basic Scrap Tea",
    shortname: "scraptea",
    category: "food",
    image: "/images/food/scraptea.png",
  },
  warmingtea: {
    name: "Basic Warming Tea",
    shortname: "warmingtea",
    category: "food",
    image: "/images/food/warmingtea.png",
  },
  woodtea: {
    name: "Basic Wood Tea",
    shortname: "woodtea",
    category: "food",
    image: "/images/food/woodtea.png",
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
  "black.berry": {
    name: "Black Berry",
    shortname: "black.berry",
    category: "food",
    image: "/images/food/black.berry.png",
  },
  "clone.black.berry": {
    name: "Black Berry Clone",
    shortname: "clone.black.berry",
    category: "food",
    image: "/images/food/clone.black.berry.png",
  },
  "seed.black.berry": {
    name: "Black Berry Seed",
    shortname: "seed.black.berry",
    category: "food",
    image: "/images/food/seed.black.berry.png",
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
  "clone.blue.berry": {
    name: "Blue Berry Clone",
    shortname: "clone.blue.berry",
    category: "food",
    image: "/images/food/clone.blue.berry.png",
  },
  "seed.blue.berry": {
    name: "Blue Berry Seed",
    shortname: "seed.blue.berry",
    category: "food",
    image: "/images/food/seed.blue.berry.png",
  },
  blueberries: {
    name: "Blueberries",
    shortname: "blueberries",
    category: "food",
    image: "/images/food/blueberries.png",
  },
  "bread.loaf": {
    name: "Bread Loaf",
    shortname: "bread.loaf",
    category: "food",
    image: "/images/food/bread.loaf.png",
  },
  "bearmeat.burned": {
    name: "Burnt Bear Meat",
    shortname: "bearmeat.burned",
    category: "food",
    image: "/images/food/bearmeat.burned.png",
  },
  "chicken.burned": {
    name: "Burnt Chicken",
    shortname: "chicken.burned",
    category: "food",
    image: "/images/food/chicken.burned.png",
  },
  "deermeat.burned": {
    name: "Burnt Deer Meat",
    shortname: "deermeat.burned",
    category: "food",
    image: "/images/food/deermeat.burned.png",
  },
  "horsemeat.burned": {
    name: "Burnt Horse Meat",
    shortname: "horsemeat.burned",
    category: "food",
    image: "/images/food/horsemeat.burned.png",
  },
  "humanmeat.burned": {
    name: "Burnt Human Meat",
    shortname: "humanmeat.burned",
    category: "food",
    image: "/images/food/humanmeat.burned.png",
  },
  "meat.pork.burned": {
    name: "Burnt Pork",
    shortname: "meat.pork.burned",
    category: "food",
    image: "/images/food/meat.pork.burned.png",
  },
  "wolfmeat.burned": {
    name: "Burnt Wolf Meat",
    shortname: "wolfmeat.burned",
    category: "food",
    image: "/images/food/wolfmeat.burned.png",
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
  "fish.catfish": {
    name: "Catfish",
    shortname: "fish.catfish",
    category: "food",
    image: "/images/food/fish.catfish.png",
  },
  "pie.chicken": {
    name: "Chicken Pie",
    shortname: "pie.chicken",
    category: "food",
    image: "/images/food/pie.chicken.png",
  },
  chocolate: {
    name: "Chocolate Bar",
    shortname: "chocolate",
    category: "food",
    image: "/images/food/chocolate.png",
  },
  "bearmeat.cooked": {
    name: "Cooked Bear Meat",
    shortname: "bearmeat.cooked",
    category: "food",
    image: "/images/food/bearmeat.cooked.png",
  },
  "bigcatmeat.cooked": {
    name: "Cooked Big Cat Meat",
    shortname: "bigcatmeat.cooked",
    category: "food",
    image: "/images/food/bigcatmeat.cooked.png",
  },
  "chicken.cooked": {
    name: "Cooked Chicken",
    shortname: "chicken.cooked",
    category: "food",
    image: "/images/food/chicken.cooked.png",
  },
  "crocodilemeat.cooked": {
    name: "Cooked Crocodile Meat",
    shortname: "crocodilemeat.cooked",
    category: "food",
    image: "/images/food/crocodilemeat.cooked.png",
  },
  "deermeat.cooked": {
    name: "Cooked Deer Meat",
    shortname: "deermeat.cooked",
    category: "food",
    image: "/images/food/deermeat.cooked.png",
  },
  "fish.cooked": {
    name: "Cooked Fish",
    shortname: "fish.cooked",
    category: "food",
    image: "/images/food/fish.cooked.png",
  },
  "horsemeat.cooked": {
    name: "Cooked Horse Meat",
    shortname: "horsemeat.cooked",
    category: "food",
    image: "/images/food/horsemeat.cooked.png",
  },
  "humanmeat.cooked": {
    name: "Cooked Human Meat",
    shortname: "humanmeat.cooked",
    category: "food",
    image: "/images/food/humanmeat.cooked.png",
  },
  "meat.pork.cooked": {
    name: "Cooked Pork",
    shortname: "meat.pork.cooked",
    category: "food",
    image: "/images/food/meat.pork.cooked.png",
  },
  "snakemeat.cooked": {
    name: "Cooked Snake Meat",
    shortname: "snakemeat.cooked",
    category: "food",
    image: "/images/food/snakemeat.cooked.png",
  },
  "wolfmeat.cooked": {
    name: "Cooked Wolf Meat",
    shortname: "wolfmeat.cooked",
    category: "food",
    image: "/images/food/wolfmeat.cooked.png",
  },
  corn: {
    name: "Corn",
    shortname: "corn",
    category: "food",
    image: "/images/food/corn.png",
  },
  "clone.corn": {
    name: "Corn Clone",
    shortname: "clone.corn",
    category: "food",
    image: "/images/food/clone.corn.png",
  },
  "seed.corn": {
    name: "Corn Seed",
    shortname: "seed.corn",
    category: "food",
    image: "/images/food/seed.corn.png",
  },
  "pie.crocodile": {
    name: "Crocodile Pie",
    shortname: "pie.crocodile",
    category: "food",
    image: "/images/food/pie.crocodile.png",
  },
  egg: {
    name: "Egg",
    shortname: "egg",
    category: "food",
    image: "/images/food/egg.png",
  },
  "pie.fish": {
    name: "Fish Pie",
    shortname: "pie.fish",
    category: "food",
    image: "/images/food/pie.fish.png",
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
  "clone.green.berry": {
    name: "Green Berry Clone",
    shortname: "clone.green.berry",
    category: "food",
    image: "/images/food/clone.green.berry.png",
  },
  "seed.green.berry": {
    name: "Green Berry Seed",
    shortname: "seed.green.berry",
    category: "food",
    image: "/images/food/seed.green.berry.png",
  },
  grub: {
    name: "Grub",
    shortname: "grub",
    category: "food",
    image: "/images/food/grub.png",
  },
  "clone.hemp": {
    name: "Hemp Clone",
    shortname: "clone.hemp",
    category: "food",
    image: "/images/food/clone.hemp.png",
  },
  "seed.hemp": {
    name: "Hemp Seed",
    shortname: "seed.hemp",
    category: "food",
    image: "/images/food/seed.hemp.png",
  },
  "fish.herring": {
    name: "Herring",
    shortname: "fish.herring",
    category: "food",
    image: "/images/food/fish.herring.png",
  },
  honeycomb: {
    name: "Honeycomb",
    shortname: "honeycomb",
    category: "food",
    image: "/images/food/honeycomb.png",
  },
  "pie.hunters": {
    name: "Hunters Pie",
    shortname: "pie.hunters",
    category: "food",
    image: "/images/food/pie.hunters.png",
  },
  honey: {
    name: "Jar of Honey",
    shortname: "honey",
    category: "food",
    image: "/images/food/honey.png",
  },
  "fish.minnows": {
    name: "Minnows",
    shortname: "fish.minnows",
    category: "food",
    image: "/images/food/fish.minnows.png",
  },
  mushroom: {
    name: "Mushroom",
    shortname: "mushroom",
    category: "food",
    image: "/images/food/mushroom.png",
  },
  "fish.orangeroughy": {
    name: "Orange Roughy",
    shortname: "fish.orangeroughy",
    category: "food",
    image: "/images/food/fish.orangeroughy.png",
  },
  orchid: {
    name: "Orchid",
    shortname: "orchid",
    category: "food",
    image: "/images/food/orchid.png",
  },
  "clone.orchid": {
    name: "Orchid Clone",
    shortname: "clone.orchid",
    category: "food",
    image: "/images/food/clone.orchid.png",
  },
  "seed.orchid": {
    name: "Orchid Seed",
    shortname: "seed.orchid",
    category: "food",
    image: "/images/food/seed.orchid.png",
  },
  "jar.pickle": {
    name: "Pickles",
    shortname: "jar.pickle",
    category: "food",
    image: "/images/food/jar.pickle.png",
  },
  "pie.pork": {
    name: "Pork Pie",
    shortname: "pie.pork",
    category: "food",
    image: "/images/food/pie.pork.png",
  },
  potato: {
    name: "Potato",
    shortname: "potato",
    category: "food",
    image: "/images/food/potato.png",
  },
  "clone.potato": {
    name: "Potato Clone",
    shortname: "clone.potato",
    category: "food",
    image: "/images/food/clone.potato.png",
  },
  "seed.potato": {
    name: "Potato Seed",
    shortname: "seed.potato",
    category: "food",
    image: "/images/food/seed.potato.png",
  },
  pumpkin: {
    name: "Pumpkin",
    shortname: "pumpkin",
    category: "food",
    image: "/images/food/pumpkin.png",
  },
  "pie.pumpkin": {
    name: "Pumpkin Pie",
    shortname: "pie.pumpkin",
    category: "food",
    image: "/images/food/pie.pumpkin.png",
  },
  "clone.pumpkin": {
    name: "Pumpkin Plant Clone",
    shortname: "clone.pumpkin",
    category: "food",
    image: "/images/food/clone.pumpkin.png",
  },
  "seed.pumpkin": {
    name: "Pumpkin Seed",
    shortname: "seed.pumpkin",
    category: "food",
    image: "/images/food/seed.pumpkin.png",
  },
  "radiationresisttea.pure": {
    name: "Pure Anti-Rad Tea",
    shortname: "radiationresisttea.pure",
    category: "food",
    image: "/images/food/radiationresisttea.pure.png",
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
  "healingtea.pure": {
    name: "Pure Healing Tea",
    shortname: "healingtea.pure",
    category: "food",
    image: "/images/food/healingtea.pure.png",
  },
  "maxhealthtea.pure": {
    name: "Pure Max Health Tea",
    shortname: "maxhealthtea.pure",
    category: "food",
    image: "/images/food/maxhealthtea.pure.png",
  },
  "oretea.pure": {
    name: "Pure Ore Tea",
    shortname: "oretea.pure",
    category: "food",
    image: "/images/food/oretea.pure.png",
  },
  "radiationremovetea.pure": {
    name: "Pure Rad. Removal Tea",
    shortname: "radiationremovetea.pure",
    category: "food",
    image: "/images/food/radiationremovetea.pure.png",
  },
  "scraptea.pure": {
    name: "Pure Scrap Tea",
    shortname: "scraptea.pure",
    category: "food",
    image: "/images/food/scraptea.pure.png",
  },
  purewarmingtea: {
    name: "Pure Warming Tea",
    shortname: "purewarmingtea",
    category: "food",
    image: "/images/food/purewarmingtea.png",
  },
  "woodtea.pure": {
    name: "Pure Wood Tea",
    shortname: "woodtea.pure",
    category: "food",
    image: "/images/food/woodtea.pure.png",
  },
  radiationremovetea: {
    name: "Rad. Removal Tea",
    shortname: "radiationremovetea",
    category: "food",
    image: "/images/food/radiationremovetea.png",
  },
  bearmeat: {
    name: "Raw Bear Meat",
    shortname: "bearmeat",
    category: "food",
    image: "/images/food/bearmeat.png",
  },
  bigcatmeat: {
    name: "Raw Big Cat Meat",
    shortname: "bigcatmeat",
    category: "food",
    image: "/images/food/bigcatmeat.png",
  },
  "chicken.raw": {
    name: "Raw Chicken Breast",
    shortname: "chicken.raw",
    category: "food",
    image: "/images/food/chicken.raw.png",
  },
  crocodilemeat: {
    name: "Raw Crocodile Meat",
    shortname: "crocodilemeat",
    category: "food",
    image: "/images/food/crocodilemeat.png",
  },
  "deermeat.raw": {
    name: "Raw Deer Meat",
    shortname: "deermeat.raw",
    category: "food",
    image: "/images/food/deermeat.raw.png",
  },
  "fish.raw": {
    name: "Raw Fish",
    shortname: "fish.raw",
    category: "food",
    image: "/images/food/fish.raw.png",
  },
  "horsemeat.raw": {
    name: "Raw Horse Meat",
    shortname: "horsemeat.raw",
    category: "food",
    image: "/images/food/horsemeat.raw.png",
  },
  "humanmeat.raw": {
    name: "Raw Human Meat",
    shortname: "humanmeat.raw",
    category: "food",
    image: "/images/food/humanmeat.raw.png",
  },
  "meat.boar": {
    name: "Raw Pork",
    shortname: "meat.boar",
    category: "food",
    image: "/images/food/meat.boar.png",
  },
  snakemeat: {
    name: "Raw Snake Meat",
    shortname: "snakemeat",
    category: "food",
    image: "/images/food/snakemeat.png",
  },
  "wolfmeat.raw": {
    name: "Raw Wolf Meat",
    shortname: "wolfmeat.raw",
    category: "food",
    image: "/images/food/wolfmeat.raw.png",
  },
  "red.berry": {
    name: "Red Berry",
    shortname: "red.berry",
    category: "food",
    image: "/images/food/red.berry.png",
  },
  "clone.red.berry": {
    name: "Red Berry Clone",
    shortname: "clone.red.berry",
    category: "food",
    image: "/images/food/clone.red.berry.png",
  },
  "seed.red.berry": {
    name: "Red Berry Seed",
    shortname: "seed.red.berry",
    category: "food",
    image: "/images/food/seed.red.berry.png",
  },
  rose: {
    name: "Rose",
    shortname: "rose",
    category: "food",
    image: "/images/food/rose.png",
  },
  "clone.rose": {
    name: "Rose Clone",
    shortname: "clone.rose",
    category: "food",
    image: "/images/food/clone.rose.png",
  },
  "seed.rose": {
    name: "Rose Seed",
    shortname: "seed.rose",
    category: "food",
    image: "/images/food/seed.rose.png",
  },
  "apple.spoiled": {
    name: "Rotten Apple",
    shortname: "apple.spoiled",
    category: "food",
    image: "/images/food/apple.spoiled.png",
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
  "fish.troutsmall": {
    name: "Small Trout",
    shortname: "fish.troutsmall",
    category: "food",
    image: "/images/food/fish.troutsmall.png",
  },
  smallwaterbottle: {
    name: "Small Water Bottle",
    shortname: "smallwaterbottle",
    category: "food",
    image: "/images/food/smallwaterbottle.png",
  },
  "bearmeat.spoiled": {
    name: "Spoiled Bear Meat",
    shortname: "bearmeat.spoiled",
    category: "food",
    image: "/images/food/bearmeat.spoiled.png",
  },
  "bigcatmeat.spoiled": {
    name: "Spoiled Big Cat Meat",
    shortname: "bigcatmeat.spoiled",
    category: "food",
    image: "/images/food/bigcatmeat.spoiled.png",
  },
  "chicken.spoiled": {
    name: "Spoiled Chicken",
    shortname: "chicken.spoiled",
    category: "food",
    image: "/images/food/chicken.spoiled.png",
  },
  "crocodilemeat.spoiled": {
    name: "Spoiled Crocodile Meat",
    shortname: "crocodilemeat.spoiled",
    category: "food",
    image: "/images/food/crocodilemeat.spoiled.png",
  },
  "deermeat.spoiled": {
    name: "Spoiled Deer Meat",
    shortname: "deermeat.spoiled",
    category: "food",
    image: "/images/food/deermeat.spoiled.png",
  },
  "fish.spoiled": {
    name: "Spoiled Fish Meat",
    shortname: "fish.spoiled",
    category: "food",
    image: "/images/food/fish.spoiled.png",
  },
  "horsemeat.spoiled": {
    name: "Spoiled Horse Meat",
    shortname: "horsemeat.spoiled",
    category: "food",
    image: "/images/food/horsemeat.spoiled.png",
  },
  "humanmeat.spoiled": {
    name: "Spoiled Human Meat",
    shortname: "humanmeat.spoiled",
    category: "food",
    image: "/images/food/humanmeat.spoiled.png",
  },
  "porkmeat.spoiled": {
    name: "Spoiled Pork Meat",
    shortname: "porkmeat.spoiled",
    category: "food",
    image: "/images/food/porkmeat.spoiled.png",
  },
  "spoiled.produce": {
    name: "Spoiled Produce",
    shortname: "spoiled.produce",
    category: "food",
    image: "/images/food/spoiled.produce.png",
  },
  "snakemeat.spoiled": {
    name: "Spoiled Snake Meat",
    shortname: "snakemeat.spoiled",
    category: "food",
    image: "/images/food/snakemeat.spoiled.png",
  },
  "wolfmeat.spoiled": {
    name: "Spoiled Wolf Meat",
    shortname: "wolfmeat.spoiled",
    category: "food",
    image: "/images/food/wolfmeat.spoiled.png",
  },
  sunflower: {
    name: "Sunflower",
    shortname: "sunflower",
    category: "food",
    image: "/images/food/sunflower.png",
  },
  "clone.sunflower": {
    name: "Sunflower Clone",
    shortname: "clone.sunflower",
    category: "food",
    image: "/images/food/clone.sunflower.png",
  },
  "seed.sunflower": {
    name: "Sunflower Seed",
    shortname: "seed.sunflower",
    category: "food",
    image: "/images/food/seed.sunflower.png",
  },
  supertea: {
    name: "Super Serum",
    shortname: "supertea",
    category: "food",
    image: "/images/food/supertea.png",
  },
  "pie.survivors": {
    name: "Survivor's Pie",
    shortname: "pie.survivors",
    category: "food",
    image: "/images/food/pie.survivors.png",
  },
  "bottle.vodka": {
    name: "Vodka Bottle",
    shortname: "bottle.vodka",
    category: "food",
    image: "/images/food/bottle.vodka.png",
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
  "clone.wheat": {
    name: "Wheat Clone",
    shortname: "clone.wheat",
    category: "food",
    image: "/images/food/clone.wheat.png",
  },
  "seed.wheat": {
    name: "Wheat Seed",
    shortname: "seed.wheat",
    category: "food",
    image: "/images/food/seed.wheat.png",
  },
  "white.berry": {
    name: "White Berry",
    shortname: "white.berry",
    category: "food",
    image: "/images/food/white.berry.png",
  },
  "clone.white.berry": {
    name: "White Berry Clone",
    shortname: "clone.white.berry",
    category: "food",
    image: "/images/food/clone.white.berry.png",
  },
  "seed.white.berry": {
    name: "White Berry Seed",
    shortname: "seed.white.berry",
    category: "food",
    image: "/images/food/seed.white.berry.png",
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
  "clone.yellow.berry": {
    name: "Yellow Berry Clone",
    shortname: "clone.yellow.berry",
    category: "food",
    image: "/images/food/clone.yellow.berry.png",
  },
  "seed.yellow.berry": {
    name: "Yellow Berry Seed",
    shortname: "seed.yellow.berry",
    category: "food",
    image: "/images/food/seed.yellow.berry.png",
  },
  "fish.yellowperch": {
    name: "Yellow Perch",
    shortname: "fish.yellowperch",
    category: "food",
    image: "/images/food/fish.yellowperch.png",
  },
};
