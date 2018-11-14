<template>
    <div :class="$style['title']">
        <div :class="$style['line']"></div>
        <div :class="$style['text']">{{text}}</div>
        <div :class="$style['line']"></div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String
        }
    }   
}
</script>

<style module lang="less">
.title {
    display: flex;
    width: 100%;
    .line {
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .text {
        padding: 0 12px;
        font-weight: 700;
        font-size: 14px;
    }
}
</style>
