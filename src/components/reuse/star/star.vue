<template>
<div :class="[$style['star'], $style[starType]]">
    <span :class="[$style['star-item'], $style[itemClass]]" v-for="(itemClass, index) in itemClasses" :key="index"></span>
</div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType () {
            return 'star-' + this.size
        },
        itemClasses () {
            let result = []
            let score = Math.floor(this.score * 2) / 2
            let hasDecimal = score % 1 !== 0
            let integer = Math.floor(score)
            for (let i = 0; i < integer; i ++) {
                result.push(CLS_ON)
            }
            if (hasDecimal) {
                result.push(CLS_HALF)
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF)
            }
            return result
        }
    }
}
</script>

<style module lang="less">
.star-image (@url) {
    .bg-image(@url, 'star', '/reuse');
}

.star {
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }
    &.star-48 {
        .star-item {
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                .star-image('star48_on');
            }
            &.half {
                .star-image('star48_half');
            }
            &.off {
                .star-image('star48_off');
            }
        }
    }
    &.star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            margin-right: 8px;
            background-size: 15px 15px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                .star-image('star36_on');
            }
            &.half {
                .star-image('star36_half');
            }
            &.off {
                .star-image('star36_off');
            }
        }
    }
    &.star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: 10px 10px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                .star-image('star24_on');
            }
            &.half {
                .star-image('star24_half');
            }
            &.off {
                .star-image('star24_off');
            }
        }
    }
}
</style>
