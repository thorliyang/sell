<template>
    <transition name="move">
        <div :class="$style['food']" v-show="showFlag" ref="food">
            <div :class="$style['food-content']">
                <div :class="$style['image-header']">
                    <img :src="selectedFood.image" />
                    <div :class="$style['back']" @click="hide">
                        <i class="icon_arrow_lift" :class="$style['arrow_lift']"></i>
                    </div>
                </div>
                <div :class="$style['content']">
                    <h1 :class="$style['title']">{{selectedFood.name}}</h1>
                    <div :class="$style['detail']">
                        <span :class="$style['sell-count']">月售{{selectedFood.sellCount}}份</span>
                        <span :class="$style['rating']">好评率{{selectedFood.rating}}</span>
                    </div>
                    <div :class="$style['price']">
                        <span :class="$style['now']">￥{{selectedFood.price}}</span>
                        <span :class="$style['old']" v-if="selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
                    </div>
                    <div :class="$style['cartcontrol-wrapper']">
                        <cartcontrol :food="selectedFood"/>
                    </div>
                    <transition name="buy">
                        <div 
                            :class="$style['buy']" 
                            v-show="!selectedFood.count || selectedFood.count===0" 
                            @click.stop.prevent="addFirst"
                        >加入购物车</div>
                    </transition>
                </div>
                <split v-show="selectedFood.info" />
                <div :class="$style['info']" v-show="selectedFood.info">
                    <h1 :class="$style['title']">商品信息</h1>
                    <p :class="$style['text']">{{selectedFood.info}}</p>
                </div>
                <split />
                <div :class="$style['rating']">
                    <h1 :class="$style['title']">商品评价</h1>
                    <ratingselect :ratings="selectedFood.ratings" />
                    <div :class="$style['rating-wrapper']">
                        <ul v-show="selectedFood.ratings">
                            <li :class="$style['rating-item']" v-for="(rating, index) in selectedFood.ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
                                <div :class="$style['user']">
                                    <span :class="$style['name']">{{rating.username}}</span>
                                    <img :class="$style['avatar']" width="12" height="12" :src="rating.avatar" />
                                </div>
                                <div :class="$style['time']">{{formatDate(rating.rateTime)}}</div>
                                <p :class="$style['text']">
                                    <span :class="thumbClass(rating.rateType)"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div :class="$style['no-rating']" v-show="!selectedFood.ratings">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import BScroll from 'better-scroll'
import cartcontrol from '../reuse/cartcontrol/cartcontrol'
import split from '../reuse/split/split'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '../../common/js/data.js'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
    components: {
        cartcontrol, split, ratingselect
    },
    props: {
        selectedFood: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    computed: {
        ...mapState('food', {
            selectType: state => state.selectType,
            onlyContent: state => state.onlyContent,
        }),
        thumbClass () {
            return function (type) {
                if (type === 0) {
                    return ['icon_thumb_up', this.$style['thumb_up']]
                } else if (type === 1) {
                    return ['icon_thumb_down', this.$style['thumb_down']]
                }
            }
        }
    },
    methods: {
        ...mapMutations([
            'modifSelectFoods',
            'addCartcontrolAnimate'
        ]),
        ...mapMutations('food', [
            'initialize'
        ]),
        show () {
            this.showFlag = true
            this.initialize({
                selectType: ALL,
                onlyContent: true,
                desc: this.desc
            })
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        hide () {
            this.showFlag = false
        },
        needShow(type, text) {
            if (this.onlyContent && !text) return false
            if (this.selectType === ALL)
                return true
            else
                return type === this.selectType
        },
        formatDate (time) {
            let date = new Date(time);
            return formatDate(date, 'YYYY-MM-DD hh:mm');
        },
        addFirst (e) {
            if (!e._constructed) return
            Vue.set(this.selectedFood, 'count', 1)
            this.modifSelectFoods()
            this.addCartcontrolAnimate({
                element: e.target
            })
        }
    }
}
</script>

<style module lang="less">
.food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .back {
            position: absolute;
            top: 10px;
            left: 0;
            .arrow_lift {
                display: block;
                padding: 10px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
    .content {
        position: relative;
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .detail {
            margin-bottom: 18px;
            line-height: 10px;
            height: 10px;
            font-size: 0;
            .sell-count, .rating {
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
            .sell-count {
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
            right: 12px;
            bottom: 12px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            border-radius: 12px;
            font-size: 10px;
            color: #fff;
            background-color: rgb(0, 160, 220);
        }
    }
    .info {
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color:rgb(7, 17, 27);
        }
        .text {
            line-height: 24px;
            padding: 0 8px;
            font-size: 12px;
            color: rgb(77, 85, 93);
        }
    }
    .rating {
        padding-top: 18px;
        .title {
            line-height: 14px;
            margin-left: 18px;
            font-size: 14px;
            color:rgb(7, 17, 27);
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                position: relative;
                padding: 16px 0;
                .border-1px(rgba(7, 17, 27, 0.1));
                .user {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    line-height: 12px;
                    font-size: 0;
                    .name {
                        display: inline-block;
                        vertical-align: top;
                        margin-right: 6px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .avatar {
                        vertical-align: top;
                        border-radius: 50%;
                    }
                }
                .time {
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    .thumb_up, .thumb_down {
                        margin-right: 4px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                    .thumb_up {
                        color: rgb(0, 160, 220);
                    }
                    .thumb_down {
                        color: rgb(147, 153, 159);
                    }
                }
            }
            .no-rating {
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }
}
</style>

<style scoped>
.move-enter-active, .move-leave-active {
    transition: all .3s;
}
.move-enter, .move-leave-to {
    transform: translateX(-100%);
}
.move-leave, .move-enter-to {
    transform: translateX(0);
}

.buy-enter-active, .buy-leave-active {
    transition: all .3s;
}
.buy-enter, .buy-leave-to {
    opacity: 0;
}
.buy-leave, .buy-enter-to {
    opacity: 1;
}
</style>

