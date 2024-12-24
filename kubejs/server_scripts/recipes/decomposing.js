// priority: 800
function DecomposingRecipe(ingredient, output) {
    this.type = 'biomancy:decomposing'
    this.ingredient = ingredient
    this.results = output
    this.nutrientsCost = 2
    this.processingTime = 20 * 8
}

DecomposingRecipe.prototype = {
    setNutrientsCost: function (nutrientsCost) {
        this.nutrientsCost = nutrientsCost
        return this
    },
    setProcessingTime: function (processingTime) {
        this.processingTime = processingTime
        return this
    },
}

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }

    registerCustomRecipe(new DecomposingRecipe(Ingredient.of('#kubejs:organ'), [{ "countRange": { "type": "uniform", "max": 5, "min": 2 }, "item": "biomancy:organic_matter" }]))
    registerCustomRecipe(new DecomposingRecipe(Ingredient.of("twilightforest:raw_venison"), [{ "countRange": { "type": "uniform", "max": 5, "min": 2 }, "item": "biomancy:flesh_bits" }, { "countRange": { "type": "uniform", "max": 3, "min": 1 }, "item": "biomancy:elastic_fibers" },  { "countRange": { "type": "uniform", "max": 4, "min": 2 }, "item": "biomancy:bone_fragments" }]))
    registerCustomRecipe(new DecomposingRecipe(Ingredient.of("twilightforest:raw_meef"), [{ "countRange": { "type": "uniform", "max": 10, "min": 5 }, "item": "biomancy:flesh_bits" }]))
    registerCustomRecipe(new DecomposingRecipe(Ingredient.of("twilightforest:raw_meef"), [{ "countRange": { "type": "uniform", "max": 10, "min": 5 }, "item": "biomancy:flesh_bits" }]))
    registerCustomRecipe(new DecomposingRecipe(Ingredient.of("twilightforest:moonworm_queen"), [{ "countRange": { "type": "uniform", "max": 10, "min": 5 }, "item": "biomancy:tough_fibers" }, { "countRange": { "type": "uniform", "max": 3, "min": 2 }, "item": "biomancy:exotic_dust" }, { "countRange": { "type": "uniform", "max": 4, "min": 3 }, "item": "biomancy:bio_lumens" }]))
    registerCustomRecipe(new DecomposingRecipe(Ingredient.of("twilightforest:firefly"), [{ "countRange": { "type": "uniform", "max": 5, "min": 2 }, "item": "biomancy:tough_fibers" }, { "countRange": { "type": "uniform", "max": 2, "min": 1 }, "item": "biomancy:bio_lumens" }]))
    registerCustomRecipe(new DecomposingRecipe(Ingredient.of("twilightforest:cicada"), [{ "countRange": { "type": "uniform", "max": 6, "min": 3 }, "item": "biomancy:tough_fibers" }, { "countRange": { "type": "uniform", "max": 2, "min": 1 }, "item": "biomancy:flesh_bits" }]))

})

