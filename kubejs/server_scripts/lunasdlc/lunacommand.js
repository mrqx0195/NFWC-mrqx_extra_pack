ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('lunaexpack')
            .requires(src => src.hasPermission(2))
            .then(Commands.literal('champion')
                .then(Commands.argument('player', Arguments.PLAYER.create(event))
                    .then(Commands.argument('arg1', Arguments.STRING.create(event))
                        .executes(ctx => {
                            let championLevel = Arguments.STRING.getResult(ctx, 'arg1');
                            let player = ctx.source.server.getPlayer(Arguments.PLAYER.getResult(ctx, 'player'))

                            let oriDiffStage = player.stages.getAll().toArray().find(ele => ele.startsWith('champion_control_'))
                            if (oriDiffStage) {
                                player.stages.remove(oriDiffStage)
                            }
                            player.stages.add(`champion_control_${String(championLevel)}`)
                            return 1
                        }
                        )
                    )
                )
            )
    )

})