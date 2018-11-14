<template>
<div :class="$style['shopcart']">
    <div :class="$style['content']">
        <div :class="$style['content-left']">
            <div :class="$style['logo-wrapper']">
                <div :class="[$style['logo'], classCount]">
                    <i :class="[$index['shopping_cart'], $style['shopping_cart']]"></i>
                </div>
                <div :class="$style['num']" v-if="totalCount>0">{{totalCount}}</div>
            </div>
            <div :class="[$style['price'], classCount]">￥{{totalPrice}}</div>
            <div :class="$style['desc']">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div :class="$style['content-right']">
            <div :class="[$style['pay'], classDesc]">{{payDesc}}</div>
        </div>
    </div>

        <div :class="$style['ball-container']">
            <transition-group
                name="drop"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
            >
                <div
                    :class="$style['ball']"
                    v-for="(ball, index) in balls"
                    :key="index"
                    v-show="ball.show"
                ></div>
            </transition-group>
        </div>
</div>
</template>

<script>
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return [
                    {
                        price: 10,
                        count: 1
                    }
                ];
            }
        },
        'deliveryPrice': {
            type: Number
        },
        'minPrice': {
            type: Number
        }
    },
    data () {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }
            ],
            dropBalls: []
        }
    },
    computed: {
        totalPrice () {
            let total = 0
            this.selectFoods.forEach(food => {
                total += food.price * food.count
            })
            return total
        },
        totalCount () {
            let count = 0
            this.selectFoods.forEach(food => {
                count += food.count
            })
            return count
        },
        payDesc () {
            let str;
            if (this.totalPrice === 0) {
                str = `￥${this.minPrice}元起送`
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                str = `还差￥${diff}元起送`
            } else {
                str = '去结算'
            }
            return str
        },
        classCount () {
            let highlight = this.$style['highlight']
            return this.totalCount > 0 ? highlight : ''
        },
        classDesc () {
            let notEnough = this.$style['not-enough']
            let enough = this.$style['enough']
            return this.totalPrice < this.minPrice ? notEnough : enough
        }
    },
    methods: {
        drop (el) {
            for (let i = 0, le = this.balls.length; i < le; i ++) {
                let ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    return
                }
            }
        },
        beforeEnter (el) {
            let count = this.balls.length
            while (count--) {
                let ball = this.balls[count]
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect()
                    let x = rect.left - 32
                    let y = -(window.innerHeight - rect.top - 22)
                    el.style.display = ''
                    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
                }
            }
        },
        enter (el, done) {
            el.style.transition = 'all 2s'

            let rf = el.offsetHeight
            console.log(el)

            el.style.transform = 'translate3d(0, 0, 0)'
            done()
        },
        afterEnter (el) {
            let ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
                el.style.display = 'none'
            }
        }
    }
}
</script>

<style module lang="less">
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    color: rgba(255, 255, 255, 0.4);
    .content {
        display: flex;
        background-color: #141d27;
        font-size: 0;
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                border-radius: 50%;
                background-color: #141d27;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    text-align: center;
                    background-color: #2b343c;
                    &.highlight {
                        background-color: rgb(0, 160, 220);
                        .shopping_cart {
                            color: #fff;
                        }
                    }
                    .shopping_cart {
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background-color: rgba(240, 20, 20,);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                &.highlight {
                    color: #fff;
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                margin-left: 12px;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 10px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                &.not-enough {
                    background-color: #2b333b;
                }
                &.enough {
                    background-color: #00b43c;
                    color: #fff;
                }
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: rgb(0, 160, 220);
            transition: all .3s
        }
    }
}
</style>
