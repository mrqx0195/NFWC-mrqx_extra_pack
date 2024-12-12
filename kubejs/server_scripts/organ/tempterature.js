PlayerEvents.tick(event=>{
    let player = event.player
    let typeMap = getPlayerChestCavityTypeMap(player);

    //若温度抗性属性未激活，则激活之
    if (!player.persistentData.contains('bcPoint')){
        player.persistentData.putInt('bcPoint',0)
    }
    if (typeMap.has('kubejs:bcPoint')) {
        if (player.persistentData.getInt('bcPoint') != 1){
            let bPoint = 0
            let cPoint = 0
            typeMap.get('kubejs:bcPoint').forEach(organ => {
                bPoint += global.ORGAN_BCP.get(organ.id)[0]
                cPoint += global.ORGAN_BCP.get(organ.id)[1]
            })
            player.modifyAttribute("cold_sweat:burning_point",'kubejsBpoint',bPoint,'addition')
            player.modifyAttribute("cold_sweat:freezing_point",'kubejsCpoint',cPoint,'addition')
            player.persistentData.putInt('bcPoint',1)
        }
    }
    else{  
        if (player.persistentData.getInt('bcPoint') == 1){
            player.tell(2)
            player.removeAttribute("cold_sweat:burning_point",'kubejsBpoint')
            player.removeAttribute("cold_sweat:freezing_point",'kubejsCpoint')
            player.persistentData.putInt('bcPoint',0)
            player.tell(3)
        }
    }

    //温度改变时触发效果的器官
    if (player.age % 20 != 0) return

    if (!player.persistentData.contains('tempterature')){
        player.persistentData.putFloat('tempterature',$Temperature.get(player,$Trait.BODY))
    }


})