//ban掉嬗变台
BlockEvents.rightClicked('alexsmobs:transmutation_table', event => {
    event.block.set('minecraft:air')
})
