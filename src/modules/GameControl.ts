import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

// 游戏控制器,控制其它所有类
class GameControl {
    // 定义三个类
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    // 记录键盘按下的值
    direction: string = ''
    // 创建属性记录游戏是否结束
    isLive = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 1)
        this.init()
    }

    // 游戏初始化 调用游戏即开始
    init() {
        // 绑定键盘按下事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))

        // 调用 run 方法
        this.run()
    }

    // chrome       ie
    // ArrowUp      Up
    // ArrowDown    Down
    // ArrowLeft    Left
    // ArrowRight   Right
    // 创建键盘按下响应函数
    keydownHandler(event: KeyboardEvent) {
        // 判断按下的值 event.key 是否合法

        // 修改 direction 属性
        this.direction = event.key
    }

    // 创建控制蛇移动的方法
    run() {
        // 或取蛇的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        // 根据按键方向 修改 X 值和 Y 值
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10
                break
            case 'ArrowDown':
            case 'Down':
                Y += 10
                break
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break
            case 'ArrowRight':
            case 'Right':
                X += 10
                break
        }

        // 检查蛇是吃到到食物
        this.checkEat(X, Y)

        // 捕获蛇撞墙死掉抛出的异常
        try {
            // 正常修改蛇的 X 和 Y
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            // 捕获异常弹出提示
            alert(e.message + 'GAME OVER!')
            this.isLive = false
        }

        // 开启一个定时调用
        this.isLive &&
            setTimeout(
                this.run.bind(this),
                150 - (this.scorePanel.level - 1) * 5
            )
    }

    // 定义方法 检查蛇是吃到到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物位置重置
            this.food.change(this.snake.bodies)
            // 分数增加
            this.scorePanel.addScore()
            // 蛇增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl
