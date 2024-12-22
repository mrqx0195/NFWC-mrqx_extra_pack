// priority: -1


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
    function registerCustomRecipe(recipeModel) {
        let id = recipeModel.result.id.toString()
        let item = id.split(':')[1]
        event.addJson(`kubejs:capsid_recipes/${item}.json`, recipeModel)
    }

    // 异化人造矿簇
    registerCustomRecipe(new mrqxCapsidRecipe([Item.of('mrqx_extra_pack:magic_artificial_mineral_cluster')], Item.of('mrqx_extra_pack:anomaly_artificial_mineral_cluster'), 2000))
})