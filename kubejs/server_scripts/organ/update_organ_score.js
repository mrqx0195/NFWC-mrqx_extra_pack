// priority: 500
ChestCavityEvents.updateOrganScore(event => {
    if (event.chestCavity && event.chestCavity.owner && event.chestCavity.owner.isPlayer()) {
        const chestCavity = event.chestCavity
        const player = chestCavity.owner

        let freezingPointScore = chestCavity.getOrganScore(new ResourceLocation('chestcavity:freezing_point')) / 25
        player.modifyAttribute('cold_sweat:freezing_point', 'kubejsFreezingPointScore', freezingPointScore, 'addition')

        let burnPointScore = chestCavity.getOrganScore(new ResourceLocation('chestcavity:burning_point')) / 25
        player.modifyAttribute('cold_sweat:burning_point', 'kubejsBurnPointScore', burnPointScore, 'addition')
    }
})