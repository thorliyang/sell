<template>
    <div :class="$style['goods']">
        <div :class="$style['menu-wrapper']" ref="menu-wrapper">
            <ul>
                <li :class="[$style['menu-item'], currIndex === index ? $style['current'] : '' ]" v-for="(item, index) in goods" :key="index" @click="selectMenu($event, index)">
                    <span :class="$style['text']">
                        <icon v-if="item.type>0" :variety="3" :type="item.type" />{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div :class="$style['foods-wrapper']" ref="foods-wrapper">
            <ul>
                <li :class="$style['food-list']" v-for="(item, index) in goods" :key="index">
                    <h1 :class="$style['title']">{{item.name}}</h1>
                    <ul>
                        <li :class="$style['food-item']" v-for="(food, key) in item.foods" :key="key" @click="selectFood($event, food)">
                            <div :class="$style['icon']">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div :class="$style['content']">
                                <h2 :class="$style['name']">{{food.name}}</h2>
                                <p :class="$style['desc']">{{food.description}}</p>
                                <div :class="$style['extra']">
                                    <span :class="$style['count']">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div :class="$style['price']">
                                    <span :class="$style['now']">￥{{food.price}}</span>
                                    <span :class="$style['old']" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div :class="$style['cartcontrol-wrapper']">
                                    <cartcontrol :food="food" @cartAdd="cartAdd($event)"/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"/>
        <food :food="selectedFood" @cartAdd="cartAdd($event)" ref="food"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BScroll from 'better-scroll'
import icon from '../reuse/icon/icon'
import shopcart from '../showcart/showcart'
import cartcontrol from '../reuse/cartcontrol/cartcontrol'
import food from '../food/food'

const ERR_OK = 0

export default {
    components:{
        icon, shopcart, cartcontrol, food
    },
    data () {
        return {
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            listHeight: {
                menu: [],
                goods: []
            },
            scrollY: 0,
            goodsHeight: 0,
            selectedFood: {}
        }
    },
    created () {
        this.$store.dispatch('getGoods', {
            fn: () => {
                console.log(this)
                this.$nextTick().then(() => {
                    this._initScroll()
                    this._calculateHeight()
                    this.goodsHeight = this.$el.clientHeight
                })
            }
        })
    },
    computed: {
        ...mapState({
            seller: state => state.seller,
            goods: state => state.goods
        }),
        currIndex () {
            var goods = this.listHeight.goods
            for (let i = 0, le = goods.length; i < le; i ++) {
                let h1 = goods[i];
                let h2 = goods[i + 1];
                if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
                    return i
                }
            }
            return 0
        },
        selectFoods () {
            let foods = []
            this.goods.forEach(good => {
                good.foods.forEach(food => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    methods: {
        selectMenu (e, index) {
            if (!e._constructed) return
            let foodList = this.$refs['foods-wrapper'].querySelectorAll('.' + this.$style['food-list'])
            let el = foodList[index]
            this.foodsScroll.scrollToElement(el, 300)
        },
        selectFood(e, food) {
            if (!e._constructed) return
            this.selectedFood = food
            this.$refs.food.show()
        },
        _initScroll () {
            this.meunScroll = new BScroll(this.$refs['menu-wrapper'], {
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
                click: true,
                probeType: 3
            })
            this.foodsScroll.on('scroll', pos => {
                // this.scrollY = Math.round(pos.y)
                // this.scrollY = this.scrollY > 0 ? 0 : Math.abs(this.scrollY)
                this.scrollY = Math.abs(Math.round(pos.y))
                // 右侧根据左侧滚动
                // console.log(this.goodsHeight)

            })
        },
        _calculateHeight () {
            let foodList = this.$refs['foods-wrapper'].querySelectorAll('.' + this.$style['food-list'])
            let menuItem = this.$refs['menu-wrapper'].querySelectorAll('.' + this.$style['menu-item'])
            let fH = 0, mH = 0
            this.listHeight.goods.push(fH)
            Array.from(foodList).forEach((item, index) => {
                fH += item.clientHeight
                this.listHeight.goods.push(fH)
            })
            Array.from(menuItem).forEach((item, index) => {
                mH += item.clientHeight
                this.listHeight.menu.push(mH)
            })
        },
        // 接收的自定义事件
        cartAdd(el) {
            // 引入子组件的方法
            this.$refs.shopcart.drop(el)
        },
    }
}
</script>

<style module lang="less">
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f7;
        .menu-item {
            display: table;
            height: 54px;
            width: 56px;
            line-height: 14px;
            padding: 0 12px;
            &.current {
                position: relative;
                margin-top: -1px;
                padding-top: 1px;
                z-index: 10;
                background-color: #fff;
                font-weight: 700;
                .text {
                    .border-none();
                }
            }
            &:last-child {
                .border-none();
            }
            .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                .border-1px(rgba(7, 17, 27, 0.1));
                font-size: 12px;
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        .title {
            padding: 0 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background-color: #f3f5f7;
        }
        .food-list {
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                .border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    .border-none();
                    margin-bottom: 0;
                }
                .icon {
                    flex: 0 0 57px;
                    margin-right: 10px;
                    img {
                        vertical-align: top;
                    }
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 17px;
                        color: rgb(7, 17, 27);
                    }
                    .desc, .extra {
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        margin-bottom: 8px;
                        line-height: 12px;
                    }
                    .extra {
                        .count {
                            margin-right: 12px;
                        }
                    }
                    .price {
                        font-weight: 700;
                        height: 24px;
                        line-height: 24px;
                        font-size: 0;
                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);
                        }
                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
        }

    }
}
</style>
