// 定义 Food 类
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement

    constructor() {
        // 获取页面中的 food 元素并将其赋值给 element
        this.element = document.getElementById('food')!
    }

    // 定义获取食物x轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义获取食物y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物位置的方法
    change(snakeBody: HTMLCollection) {
        // 生成随机位置
        // floor 向下取整
        // round 向上取整
        let left = Math.floor(Math.random() * 30) * 10
        let top = Math.floor(Math.random() * 30) * 10

        // 食物不能出现在蛇身体里
        let foodInSnake: boolean = false
        for (let i = 0; i < snakeBody.length; i++) {
            let body = <HTMLElement>snakeBody[i]
            if (left === body.offsetLeft && top === body.offsetTop) {
                foodInSnake = true
            }
        }

        if (foodInSnake) {
            this.change(snakeBody)
        } else {
            this.element.style.left = left + 'px'
            this.element.style.top = top + 'px'
        }
    }
}

// const food = new Food()
// food.change()
// console.log(food.X, food.Y)

export default Food
