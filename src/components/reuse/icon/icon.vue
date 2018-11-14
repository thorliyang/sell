<template>
    <span :class="[$style['icon-'+variety], $style[classMap[type]]]"></span>
</template>

<script>
export default {
    props: {
        variety: {
            type: Number
        },
        type: {
            type: Number
        }
    },
    data () {
        return {
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        }
    }
}
</script>

<style module lang="less">
.icon-image (@url) {
    .bg-image(@url, 'icon', '/reuse')
}

.icon-1 {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px;
    background-repeat: no-repeat;
    &.decrease {
        .icon-image('decrease_1');
    }
    &.discount {
        .icon-image('discount_1');
    }
    &.guarantee {
        .icon-image('guarantee_1');
    }
    &.invoice {
        .icon-image('invoice_1');
    }
    &.special {
        .icon-image('special_1');
    }
}
.icon-2 {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px;
    background-repeat: no-repeat;
    &.decrease {
        .icon-image('decrease_2');
    }
    &.discount {
        .icon-image('discount_2');
    }
    &.guarantee {
        .icon-image('guarantee_2');
    }
    &.invoice {
        .icon-image('invoice_2');
    }
    &.special {
        .icon-image('special_2');
    }
}
.icon-3 {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px;
    background-repeat: no-repeat;
    &.decrease {
        .icon-image('decrease_3');
    }
    &.discount {
        .icon-image('discount_3');
    }
    &.guarantee {
        .icon-image('guarantee_3');
    }
    &.invoice {
        .icon-image('invoice_3');
    }
    &.special {
        .icon-image('special_3');
    }
}
</style>
