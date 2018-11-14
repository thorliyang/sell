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
            <div :class="[$style['price'], classCount]">￥ {{totalPrice}}</div>
            <div :class="$style['desc']">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div :class="$style['content-right']">
            <div :class="$style['pay']">
                ￥{{minPrice}}元起送
            </div>
        </div>
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
        classCount () {
            let clas = this.$style['highlight']
            return this.totalCount > 0 ? clas : ''
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
                color: rgba(255, 255, 255, 0.4);
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
                color: rgba(255, 255, 255, 0.4);
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            .pay{
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.4);
                font-weight: 700;
            }
        }
    }
}
</style>
