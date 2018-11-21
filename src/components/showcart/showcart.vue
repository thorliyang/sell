<template>
    <div class="shopcart">
        <div :class="$style['shopcart']">
            <div :class="$style['content']" @click="toggleList">
                <div :class="$style['content-left']">
                    <div :class="$style['logo-wrapper']">
                        <div :class="[$style['logo'], classCount]">
                            <i class="icon_shopping_cart" :class="$style['shopping_cart']"></i>
                        </div>
                        <div :class="$style['num']" v-if="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div :class="[$style['price'], classCount]">￥{{totalPrice}}</div>
                    <div :class="$style['desc']">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div :class="$style['content-right']">
                    <div :class="[$style['pay'], classDesc]" @click.stop.prevent="pay()">{{payDesc}}</div>
                </div>
            </div>
            <div :class="$style['ball-container']">
                <transition-group
                    tag="div"
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
                    >
                        <div :class="$style['inner']"></div>
                    </div>
                </transition-group>
            </div>
            <transition name="fold">
                <div :class="$style['shopcart-list']" v-show="listshow">
                    <div :class="$style['list-header']">
                        <h1 :class="$style['title']">购物车</h1>
                        <span :class="$style['empty']" @click="empty">清除</span>
                    </div>
                    <div :class="$style['list-content']" ref="list-content">
                        <ul>
                            <li :class="$style['food']" v-for="(food, index) in selectFoods" :key="index">
                            <span :class="$style['name']">{{food.name}}</span>
                            <div :class="$style['price']">
                                <span>￥{{food.price * food.count}}</span>
                            </div>
                                <div :class="$style['cartcontrol-wrapper']">
                                    <cartcontrol :food="food"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div :class="$style['list-mark']" v-show="listshow" @click="hideList"></div>
        </transition>
    </div>
</template>

<script>
import cartcontrol from '../reuse/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

export default {
    components: {
        cartcontrol
    },
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
            type: Number,
            default: 0
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
            dropBalls: [],
            fold: true
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
        listshow () {
            if(!this.totalCount) {
                this.fold = true
                return false
            }
            let show = !this.fold
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs['list-content'], {
                            click: true
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })
            }
            return show
        },
        classCount () {
            let highlight = this.$style['highlight']
            return this.totalCount > 0 ? highlight : ''
        },
        classDesc () {
            let notEnough = this.$style['not-enough']
            let enough = this.$style['enough']
            return (!this.minPrice || (this.totalPrice < this.minPrice)) ? notEnough : enough
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

                    var inner = el.querySelector(`.${this.$style.inner}`)
                    
                    this.velocity(el, { translateY: y }, { duration: 0 })
                    
                    this.velocity(inner, { translateX: x }, { duration: 0 })

                    // el.style.transform = `translate3d(${x}px, ${y}px, 0)`
                    // el.style.webkitTransform = `translateY(${y}px)`
                    // inner.style.transform = `translateX(${x}px)`
                }
            }
        },
        enter (el, done) {
            el.offsetHeight

            this.velocity(el, { translateY: 0}, {
                duration: 500,
                easing: [.49, -.29, .75, .41]
            })

            var inner = el.querySelector(`.${this.$style.inner}`)
            this.velocity(inner, { translateX: 0}, {
                duration: 500,
                easing: 'linear',
                complete: done
            })

            // el.style.transform = 'translateY(0)'
            // el.style.transition = 'all .5s cubic-bezier(.49, -.29, .75, .41)'
            // inner.style.transform = `translateX(0)`
            // inner.style.transition = 'all .5s linear'
            // done()
        },
        afterEnter (el) {
            let ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
            }
        },
        toggleList () {
            if (!this.totalCount) return
            this.fold = !this.fold
        },
        hideList () {
            this.fold = true;
        },
        empty () {
            this.selectFoods.forEach(food => {
                food.count = 0;
            })
        },
        pay () {
            if (this.totalPrice<this.minPrice) return false
            window.alert(`成功支付${this.totalPrice}元`)
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
            // background-color: rgb(0, 160, 220);
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: rgb(0, 160, 220);
            }
        }
    }
    .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transform: translateY(-100%);
        .list-header {
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background-color: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title {
                float: left;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .empty {
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }
        .list-content {
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            background-color: #fff;
            .food {
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                .border-1px(rgba(7, 17, 27, 0.1));
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .price {
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(240, 20, 20);
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                }
            }
        }
    }
}
.list-mark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    background-color: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
}
</style>

<style scoped>
.fold-enter-active, .fold-leave-active {
    transition: all .5s;
}
.fold-enter, .fold-leave-to {
    transform: translateY(0);
}

.fade-enter-active, .fade-leave-active {
    transition: all .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
    background-color: rgba(7, 17, 27, 0);
}
</style>

