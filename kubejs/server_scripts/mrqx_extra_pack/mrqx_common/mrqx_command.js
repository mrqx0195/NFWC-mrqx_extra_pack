// priority: 450
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event
    event.register(
        Commands.literal('mrqx')
            .requires(src => src.hasPermission(2))
            .then(Commands.literal('boss_enhance')
                .then(Commands.literal('disable')
                    .then(Commands.argument('player', Arguments.PLAYER.create(event))
                        .then(Commands.argument('is_disabled', Arguments.BOOLEAN.create(event))
                            .executes(ctx => {
                                let isDisabled = Arguments.BOOLEAN.getResult(ctx, 'is_disabled')
                                let player = ctx.getSource().getServer().getPlayer(Arguments.PLAYER.getResult(ctx, 'player'))
                                let oriStage = player.stages.getAll().toArray().find(ele => ele.startsWith('mrqx_boss_enhance_is_disabled_'))
                                if (oriStage) {
                                    player.stages.remove(oriStage)
                                }
                                player.stages.add('mrqx_boss_enhance_is_disabled_' + isDisabled)
                                return 1
                            }
                            )
                        )
                    )
                )
            )
    )
    event.register(
        Commands.literal('mrqx')
            .requires(src => src.hasPermission(2))
            .then(Commands.literal('boss_champion')
                .then(Commands.literal('disable')
                    .then(Commands.argument('player', Arguments.PLAYER.create(event))
                        .then(Commands.argument('is_disabled', Arguments.BOOLEAN.create(event))
                            .executes(ctx => {
                                let isDisabled = Arguments.BOOLEAN.getResult(ctx, 'is_disabled')
                                let player = ctx.getSource().getServer().getPlayer(Arguments.PLAYER.getResult(ctx, 'player'))
                                let oriStage = player.stages.getAll().toArray().find(ele => ele.startsWith('mrqx_boss_champion_is_disabled_'))
                                if (oriStage) {
                                    player.stages.remove(oriStage)
                                }
                                player.stages.add('mrqx_boss_champion_is_disabled_' + isDisabled)
                                return 1
                            }
                            )
                        )
                    )
                )
            )
    )
})