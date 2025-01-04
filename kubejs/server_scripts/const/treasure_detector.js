// priority: 1000
const treasureDetectorTableMap = {
    'minecraft:overworld': {
        0: "minecraft:chests/abandoned_mineshaft",
        5: "minecraft:chests/simple_dungeon",
        10: "minecraft:chests/desert_pyramid",
        15: "minecraft:chests/buried_treasure",
        20: "minecraft:chests/ancient_city",
        25: "dungeons_arise:chests/aviary/aviary_treasure",
        '-1': "dungeons_arise:chests/foundry/foundry_treasure"
    },
    'minecraft:the_nether': {
        0: "minecraft:chests/nether_fortress/fort_inside_generic",
        8: "minecraft:chests/bastion_bridge",
        12: "minecraft:chests/bastion_treasure",
        '-1': "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_treasure"
    },
    'minecraft:the_end': {
        0: "minecraft:chests/end_city_treasure",
        '-1': "minecraft:chests/end_city_treasure"
    }
}
function registerTreasureDetectorLoot(dim, obj) {
    treasureDetectorTableMap[dim] = obj
}