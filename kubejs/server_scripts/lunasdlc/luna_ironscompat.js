// priority: -1

function getPlayerMagicData(player) {
    return $MagicData.getPlayerMagicData(player)
}

function randomGet(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function overLimitSpellCast(resourceLocation, amplifier, player, consume) {
    let itemMap = getPlayerChestCavityItemMap(player)
    let typeMap = getPlayerChestCavityTypeMap(player)
    if (itemMap.has('kubejs:plastic_heart') && typeMap.has('kubejs:magic')) {
        amplifier = amplifier + typeMap.get('kubejs:magic').length
    }
    if (itemMap.has('luna_flesh_reforged:enchanted_psylink_neuro') && typeMap.has('kubejs:archotech')) {
        amplifier = amplifier + typeMap.get('kubejs:archotech').length
    }
    $SpellRegistry["getSpell(net.minecraft.resources.ResourceLocation)"](resourceLocation).attemptInitiateCast(Item.of('air'), amplifier, player.level, player, $CastSource.NONE, consume, "main_hand")
}