<template>
    <div :class="$style['ratingselect']">
        <div :class="$style['rating-type']">
            <span :class="[$style['block'], $style['positive'], allActiveClass]" @click="select($event, 2)">
                {{desc.all}}
                <span :class="$style['count']">{{ratings.length}}</span>
            </span>
            <span :class="[$style['block'], $style['positive'], positiveActiveClass]"  @click="select($event, 0)">
                {{desc.positive}}
                <span :class="$style['count']">{{positives.length}}</span>
            </span>
            <span :class="[$style['block'], $style['negative'], negativeActiveClass]"  @click="select($event, 1)">
                {{desc.negative}}
                <span :class="$style['count']">{{negatives.length}}</span>
            </span>
        </div>
        <div :class="[$style['switch'], switchOnClass]" @click="toggleContent">
            <span class="icon_check_circle" :class="$style['check_circle']"></span>
            <span :class="$style['text']">只有看内容的评价</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import split from '../reuse/split/split'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
    props: {
        ratings: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        ...mapState('food', {
            selectType: state => state.selectType,
            onlyContent: state => state.onlyContent,
            desc: state => state.desc
        }),
        positives () {
            return this.ratings.filter(rating => {
                return rating.rateType === POSITIVE
            })
        },
        negatives () {
            return this.ratings.filter(rating => {
                return rating.rateType === NEGATIVE
            })
        },
        // 类名计算
        positiveActiveClass () {
            return this.selectType === POSITIVE ? this.$style.active : false
        },
        negativeActiveClass () {
            return this.selectType === NEGATIVE ? this.$style.active : false
        },
        allActiveClass () {
            return this.selectType === ALL ? this.$style.active : false
        },
        switchOnClass () {
            return this.onlyContent === true ? this.$style.on : false
        }
    },
    methods: {
        ...mapMutations('food', [
            'modifSelectType',
            'modifOnlyContent'
        ]),
        select (e, type) {
            if (!e._constructed) return
            this.modifSelectType({
                selectType: type
            })
        },
        toggleContent (e) {
            if (!e._constructed) return
            this.modifOnlyContent({
                onlyContent: !this.onlyContent
            })
        }
    }
}
</script>

<style module lang="less">
.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            font-size: 12px;
            line-height: 16px;
            color: rgb(77, 85, 93);
            &.active {
                color: #fff;
            }
            &.positive {
                background-color: rgba(0, 160, 220, 0.2);
                &.active {
                    background-color: rgb(0, 160, 220);
                }
            }
            &.negative {
                background-color: rgba(77, 85, 93, 0.2);
                &.active {
                    background-color: rgb(77, 85, 93);
                }
            }
            .count {
                margin-left: 2px;
                font-size: 8px;
            }
        }
    }
    .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
        color: rgb(147, 153, 159);
        &.on {
            .check_circle {
                color: #00c850;
            }
        }
        .check_circle {
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            font-size: 24px;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
        }
    }
}
</style>
