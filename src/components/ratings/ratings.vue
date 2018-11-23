<template>
    <div styleName="ratings">
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
            <ratingselect :ratings="ratings"/>
        </div>
    </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { mapState, mapMutations } from 'vuex'
import star from '../reuse/star/star'
import split from '../reuse/split/split'
import ratingselect from '../ratingselect/ratingselect'

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
            }
        }
    },
    computed: {
        ...mapState({
            seller: state => state.seller,
            ratings: state => state.ratings
        }),
        ...mapState('food', {
            selectType: state => state.selectType,
            onlyContent: state => state.onlyContent,
            criticType: state => state.criticType
        })
    },
    methods: {
        ...mapMutations('food', [
            'initialize',
            'modifSelectType', 
            'modifOnlyContent',
        ])
    },
    created () {
        this.$store.dispatch('getRatings')
        this.initialize({
            selectType: this.criticType.ALL,
            onlyContent: false,
            desc: this.desc
        })
        
    }
}
</script>

<style module lang="less">
    .ratings {
        position: absolute;
        top: 174px;
        bottom: 0;
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
    }
</style>
