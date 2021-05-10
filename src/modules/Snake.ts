class Snake {
    // 表示蛇头的元素
    head: HTMLElement
    // 蛇的身体 (包括蛇头)
    bodies: HTMLCollection
    // 获取蛇的容器
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        // 断言 代表 是个 HTMLElement 元素
        this.head = document.querySelector('#snake > div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 获取蛇的X,Y轴坐标(蛇头坐标)
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇头的坐标
    set X(value: number) {
        // 如果新值和旧值相同 则返回 不再更改
        if (this.X === value) {
            return
        }

        // X 值的合法范围 0-290之间
        if (value < 0 || value > 290) {
            throw new Error('撞到墙了噢~')
        }

        // 修改x时，蛇在左右移动，向一个方向时不能向另一个方向
        // 如果头的坐标和第二节身体坐标重合 就意味着掉头 所以要检测第二节存在否
        if (
            this.bodies[1] &&
            (this.bodies[1] as HTMLElement).offsetLeft === value
        ) {
            // 如果掉头 还是让蛇反方向继续移动
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        // 移动身体
        this.moveBody()

        this.head.style.left = value + 'px'

        // 检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(value: number) {
        if (this.Y === value) {
            return
        }
        if (value < 0 || value > 290) {
            throw new Error('撞到墙了噢~')
        }
        if (
            this.bodies[1] &&
            (this.bodies[1] as HTMLElement).offsetTop === value
        ) {
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    // 设置蛇增加身体的方法
    addBody() {
        // 向 element 中添加 div
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 添加蛇身体跟着头一起移动的方法
    moveBody() {
        // 将后面的身体设置为前面身体的位置
        // 遍历获取所有的身体位置
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前面身体位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop

            // 将值设置到当前身体上
            ;(this.bodies[i] as HTMLElement).style.left = X + 'px'
            ;(this.bodies[i] as HTMLElement).style.top = Y + 'px'
            this.element.style.transition = 'all .5s'
        }
    }

    // 检查蛇头是否撞到身体
    checkHeadBody() {
        // 获取所有身体坐标 检测是否和蛇头坐标重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('吃到自己了噢~')
            }
        }
    }
}

export default Snake
