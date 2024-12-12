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
    bcPoint: function (burningPoint,coldPoint){
        global.ORGAN_BCP.set(this.itemID,[burningPoint/ 25,coldPoint/ 25])
        return this
    },

    build: function () {
        this.organScores.forEach(score => {
            this.shiftTextLines.push(convertScoreToTextLine(this, score))
        })
        if(global.ORGAN_BCP.has(this.itemID)){
            let stack = this.maxStackSize
            let burningPoint = global.ORGAN_BCP.get(this.itemID)[0]
            let coldPoint = global.ORGAN_BCP.get(this.itemID)[1]
            this.shiftTextLines.push([LEADING_SYMBOL, Text.gray('每 '), Text.yellow(String(stack)) , Text.gray(' 个该器官使你能忍受的最高温度') ,burningPoint>0 ? Text.green(' 提高 '):Text.red(' 降低 '), Text.yellow(String(Math.abs(burningPoint*25))), Text.gray(' 摄氏度')])
            this.shiftTextLines.push([LEADING_SYMBOL, Text.gray('每 '), Text.yellow(String(stack)), Text.gray(' 个该器官使你能忍受的最低温度') ,coldPoint>0 ? Text.red(' 提高 '):Text.green(' 降低 '), Text.yellow(String(Math.abs(coldPoint*25))), Text.gray(' 摄氏度')])
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