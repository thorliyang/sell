<template>
    <div styleName="ratings" ref="ratings">
        <div styleName="ratings-content">
            <div styleName="overview">
                <div styleName="overview-left">
                    <h1 styleName="score">{{seller.score}}</h1>
                    <div styleName="title">综合评分</div>
                    <div styleName="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div styleName="overview-right">
                    <div styleName="score-wrapper">
                        <span styleName="title">服务态度</span>
                        <star styleName="star" :size="36" :score="seller.serviceScore" />
                        <span styleName="score">{{seller.serviceScore}}</span>
                    </div>
                    <div styleName="score-wrapper">
                        <span styleName="title">服务评分</span>
                        <star styleName="star" :size="36" :score="seller.foodScore"/>
                        <span styleName="score">{{seller.foodScore}}</span>
                    </div>
                    <div styleName="delivery-wrapper">
                        <span styleName="title">送达时间</span>
                        <span styleName="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split />
            <ratingselect :ratings="ratings" @click="updateScroll"/>
            <div styleName="ratings-wrapper">
                <ul>
                    <li styleName="rating-item" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
                        <div styleName="avatar">
                            <img :src="rating.avatar" width="28" height="28" />
                        </div>
                        <div styleName="content">
                            <h1 styleName="name">{{rating.username}}</h1>
                            <div styleName="star-wrapper">
                                <star styleName="star" :size="24" :score="rating.score"/>
                                <span styleName="delivery" v-show="!!rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p styleName="text">{{rating.text}}</p>
                            <div styleName="recommed" v-show="rating.recommend.length>0">
                                <span :class="[rateTypeClass(rating.rateType), $style.rateType]" ></span>
                                <span styleName="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div styleName="time">{{formatDate(rating.rateTime)}}</div>
                        </div>
                    </li>
                </ul>
                <div :class="$style['no-rating']" v-show="!ratings.length>0">暂无评价</div>
            </div>
        </div>
    </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
import formatDate from '../../common/js/data.js'
import star from '../reuse/star/star'
import split from '../reuse/split/split'
import ratingselect from '../ratingselect/ratingselect'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
    mixins: [CSSModules()],
    components: {
        star, split, ratingselect
    },
    data () {
        return {
            desc: {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            },
        }
    },
    computed: {
        ...mapState({
            seller: state => state.seller,
            ratings: state => state.ratings
        }),
        ...mapState('food', {
            selectType: state => state.selectType,
            onlyContent: state => state.onlyContent
        }),
        rateTypeClass () {
            return function (type) {
                return type === 0 ? 'icon_thumb_up' : 'icon_thumb_down'
            }
        }
    },
    methods: {
        ...mapMutations('food', [
            'initialize'
        ]),
        updateScroll () {
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
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
    },
    created () {
        this.$store.dispatch('getRatings', {
            fn: () => {
                this.$nextTick().then(() => {
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    })
                })
                
            }
        })
        this.initialize({
            selectType: ALL,
            onlyContent: true,
            desc: this.desc
        })
    }
}
</script>

<style module lang="less">
    .ratings {
        position: absolute;
        top: 174px;
        bottom: 46px;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 137px;
                padding: 6px 0;
                width: 137px;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;
                @media only screen and (max-width: 320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .rank {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .overview-right {
                flex: 1;
                padding: 6px 0 6px 22px;
                @media only screen and (max-width: 320px) {
                    padding-left: 8px;
                }
                .score-wrapper {
                    margin-bottom: 8px;
                    font-size: 0;
                    .title {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(7, 17, 27);
                    }
                    .star {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                        line-height: 18px;
                        @media only screen and (max-width: 320px) {
                            margin: 0 6px;
                        }
                    }
                    .score {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(255, 153, 0);
                    }
                }
                .delivery-wrapper {
                    font-size: 0;
                    .title {
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        margin-right: 12px;
                    }
                    .delivery {
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
        .ratings-wrapper {
            padding: 0 18px;
            .rating-item {
                display: flex;
                padding: 18px 0;
                .border-1px(rgba(7, 17, 27, 0.1));
                .avatar {
                    flex: 0 0 28px;
                    width: 28px;
                    height: 28px;
                    margin-right: 12px;
                    img {
                        border-radius: 50%;
                    }
                }
                .content {
                    position: relative;
                    flex: 1;
                    .name {
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                    }
                    .star-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                            text-align: right;
                        }
                    }
                    .text {
                        margin-bottom: 6px;
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .recommed {
                        .rateType, .item {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 18px;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .rateType {
                            &:global(.icon_thumb_up) {
                                color: rgb(0, 160, 220);
                            }
                            &:global(.icon_thumb_down) {
                                color: rgb(183, 187, 191);
                            }
                        }
                        .item {
                            padding: 0 6px;
                            border-radius: 1px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            background-color: #fff;
                            color: rgb(147, 153, 159);
                        }
                    }
                }
                .time {
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
</style>
