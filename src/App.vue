<template>
<div id="app">
    <v-header></v-header>
    <nav :class="$style['nav']">
        <div :class="$style['nav-item']">
            <router-link :to="{name: 'goods'}" :active-class="$style['active']">商品</router-link>
        </div>
        <div :class="$style['nav-item']">
            <router-link :to="{name: 'ratings'}" :active-class="$style['active']">评论</router-link>
        </div>
        <div :class="$style['nav-item']">
            <router-link :to="{name: 'seller'}" :active-class="$style['active']">商家</router-link>
        </div>
    </nav>
    <router-view></router-view>
    <showcart />
</div>
</template>

<script>
import { mapState } from 'vuex'
import header from './components/header/header'
import showcart from './components/showcart/showcart'

const ERR_OK = 0;

export default {
    name: 'app',
    components: {
        'v-header': header,
        showcart
    },
    created() {
        this.$store.dispatch('getSeller')
    },
    computed: {
        ...mapState({
            seller: state => state.seller
        })
    }
}
</script>

<style module lang="less">
.nav {
    display: flex;
    height: 40px;
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    .border-1px(rgba(7, 17, 27, 0.1));
    .nav-item {
        flex: 1;
        line-height: 40px;
        text-align: center;
        & > a {
            display: block;
            font-size: 14px;
            color: rgb(77, 85, 93);
            &.active {
                color: rgb(240, 20, 20);
            }
        }
    }
}
</style>
