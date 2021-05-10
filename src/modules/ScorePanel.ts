// 定义 ScorePanel 类
class ScorePanel {
    score = 0
    level = 1

    // 分数和等级所在的元素,在构造函数中初始化
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // 设置变量 限制level：public maxLevel: number = 10
    // 设置每多少分升一级：public upScore: number = 10
    constructor(public maxLevel: number = 10, public upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
    }

    // 设置加分方法
    addScore() {
        // this.score++
        // 分数自增
        this.scoreEle.innerHTML = ++this.score + ''
        // 判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // 提升等级的方法
    levelUp() {
        // 等级设置上限
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        } else {
            // 设置等级上限后 提示 Max
            this.levelEle.innerHTML = this.level + 'Max'
        }
    }
}

export default ScorePanel
