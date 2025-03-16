// priority: 750

/**
 * @param {Internal.ItemStack[]} ingredients
 * @param {Internal.ItemStack} output
 * @param {number} time
 */
function mrqxCapsidRecipe(ingredients, output, time) {
    this.ingredients = ingredients
    this.result = output
    this.result.count = 1
    this.time = time
}

mrqxCapsidRecipe.prototype = {
    /**
     * @param {Number} count
    * @returns {mrqxCapsidRecipe}
     */
    setCount: function (count) {
        this.result.count = count
        return this
    },
}

ServerEvents.highPriorityData(event => {
    function registerCapsidRecipe(dataModel) {
        let id = dataModel.result.id.toString()
        let item = id.split(':')[1]
        event.addJson(`mrqx_extra_pack:capsid_recipes/mrqx_${item}.json`, dataModel)
    }

    // 异化人造矿簇
    registerCapsidRecipe(new mrqxCapsidRecipe([Item.of('mrqx_extra_pack:magic_artificial_mineral_cluster')], Item.of('mrqx_extra_pack:anomaly_artificial_mineral_cluster'), 2000))
})