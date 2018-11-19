<template lang="html">
    <div :class="$style['cartcontrol']">
        <transition name="move">
            <div :class="[$style['cart-decrease'], $index['remove_circle_outline']]" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"></div>
        </transition>
        <div :class="$style['cart-count']" v-show="food.count>0">{{food.count}}</div>
        <div :class="[$style['cart-add'], $index['add_circle']]" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart (e) {
            if (!e._constructed) return
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count ++
            }
            this.$emit('cartAdd', e.target)
        },
        decreaseCart (e) {
            if (!e._constructed) return
            this.food.count = this.food.count <= 0 ? 0 : this.food.count - 1
        }
    }
}
</script>

<style module lang="less">
.cartcontrol {
    font-size: 0;
    & > * {
        display: inline-block;
    }
    .cart-decrease, .cart-add {
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
    }
    .cart-count {
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
}
</style>

<style scoped>
.move-enter-active, .move-leave-active {
    transition: all .3s linear
}
.move-enter,
.move-leave-to  {
    transform: translate3d(24px, 0, 0) rotate(180deg);
    opacity: 0;
}
.move-leave,
.move-enter-to {
    transform: translate3d(0, 0, 0) rotate(0);
    opacity: 1;
}
</style>
