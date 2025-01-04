// priority: 1000
const warpFoodMap = {
    'cataclysm:blessed_amethyst_crab_meat': {
        count: -3,
        chance: 1,
    },
    'minecraft:enchanted_golden_apple': {
        count: -1,
        chance: 1,
    },
    'chestcavity:raw_man_meat': {
        count: 1,
        chance: 0.1,
    },
    'extradelight:bad_food': {
        count: 1,
        chance: 0.05,
    },
}

function registerWarpFood(item, obj) {
    warpFoodMap[item] = obj
}