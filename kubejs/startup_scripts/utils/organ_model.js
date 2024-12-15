// priority: 0
function Organ(itemID) {
    this.itemID = itemID
    this.pseudoOrgan = false
    this.organScores = []
    this.defaultTextLines = []
    this.shiftTextLines = []
    this.ctrlTextLines = []
    this.altTextLines = []
    this.maxStackSize = 1
}

Organ.prototype = {
    // 注册常规效果
    addScore: function (score, value) {
        this.organScores.push({ 'id': `chestcavity:${score}`, 'value': value })
        return this
    },
    addTextLines: function (type, textLines) {
        switch (type) {
            case 'default':
                this.defaultTextLines.push(textLines);
                break;
            case 'shift':
                this.shiftTextLines.push(textLines);
                break;
            case 'ctrl':
                this.ctrlTextLines.push(textLines);
                break;
            case 'alt':
                this.altTextLines.push(textLines);
                break;
        }
        return this
    },

    setPseudo: function (boolean) {
        this.pseudoOrgan = boolean
        return this
    },

    maxStack: function (maxStackSize) {
        this.maxStackSize = maxStackSize
        return this
    },


    //注册冰点燃点
    burn_cold_point: function(burningPoint,coldPoint){
        global.ORGAN_BURNING_AND_COLD_POINTS.set(this.itemID,[burningPoint/ 25,coldPoint/ 25])
        return this
    },

    build: function () {
        this.organScores.forEach(score => {
            this.shiftTextLines.push(convertScoreToTextLine(this, score))
        })
        if(global.ORGAN_BURNING_AND_COLD_POINTS.has(this.itemID)){
            let burningPoint = global.ORGAN_BURNING_AND_COLD_POINTS.get(this.itemID)[0]
            let coldPoint = global.ORGAN_BURNING_AND_COLD_POINTS.get(this.itemID)[1]
            this.shiftTextLines.push([LEADING_SYMBOL, Text.gray(Text.translatable("kubejs.tooltips.organ_burn_cold_attri.1")) ,burningPoint>0 ? Text.green(Text.translatable("kubejs.tooltips.heat")):Text.red(Text.translatable("kubejs.tooltips.cold")), Text.yellow(String(Math.abs(burningPoint*25))), Text.gray(Text.translatable("kubejs.tooltips.degree"))])
            this.shiftTextLines.push([LEADING_SYMBOL, Text.gray(Text.translatable("kubejs.tooltips.organ_burn_cold_attri.2")) ,coldPoint>0 ? Text.red(Text.translatable("kubejs.tooltips.heat")):Text.green(Text.translatable("kubejs.tooltips.cold")), Text.yellow(String(Math.abs(coldPoint*25))), Text.gray(Text.translatable("kubejs.tooltips.degree"))])
        }
        return this
    },
}

/**
 * 转换为描述文本
 * @param {Organ} organ 
 * @param {*} score 
 * @returns 
 */

function convertScoreToTextLine(organ, score) {
    let value = score.value
    let typeName = global.SCORE_MAP[score.id]
    let stack = organ.maxStackSize
    return [LEADING_SYMBOL, Text.gray('每 '), Text.yellow(String(stack)), Text.gray(' 个该器官提供 '), Text.yellow(String(value)), Text.gray(' 点'), Text.yellow(typeName)]
}