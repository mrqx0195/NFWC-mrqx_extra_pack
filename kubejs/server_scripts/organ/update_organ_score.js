// priority: 1
ChestCavityEvents.updateOrganScore(event => {
    if (event.chestCavity && event.chestCavity.owner && event.chestCavity.owner.isPlayer()) {
        const chestCavity = event.chestCavity
        const player = chestCavity.owner

        let freezingPointScore = chestCavity.getOrganScore(new ResourceLocation('chestcavity:freezing_point'))
        if (freezingPointScore != 0) {
            player.modifyAttribute('cold_sweat:freezing_point', 'kubejsFreezingPointScore', freezingPointScore, 'addition')
        } else {
            player.removeAttribute('cold_sweat:freezing_point', 'kubejsFreezingPointScore')
        }
        let burnPointScore = chestCavity.getOrganScore(new ResourceLocation('chestcavity:burning_point'))
        if (burnPointScore != 0) {
            player.modifyAttribute('cold_sweat:burning_point', 'kubejsBurnPointScore', burnPointScore, 'addition')
        } else {
            player.removeAttribute('cold_sweat:burning_point', 'kubejsBurnPointScore')
        }
    }
})