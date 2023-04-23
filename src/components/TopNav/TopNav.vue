<template>
    <div class="topnav-container">
        <div class="topnav-body">
            <div class="left">
                <button class="routeback button" title="主页" @click="goHome">
                    <i class="ri-home-line"></i>
                </button>
                <button v-if="backable" class="routeback button" title="后退" @click="routeGo(-1)">
                    <i class="ri-arrow-left-line"></i>
                </button>
                <button v-if="forwardable" class="routego button" title="前进" @click="routeGo(1)">
                    <i class="ri-arrow-right-line"></i>
                </button>
            </div>
            <div class="right">
                <button class="button" 
                    :id="item.id"
                    :title="item.text" 
                    v-for="(item, index) in buttons" 
                    :key="index" 
                    @click="btnClick(item.index)"
                >
                    {{ item.text }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopNav",
    props: {
        buttons: {
            type: Array,
            default: []
        }
    },
    computed: {
        backable: function () {
            return !!history.state.back
        },
        forwardable: function () {
            return !!history.state.forward
        }
    },
    methods: {
        routeGo(delta) {
            this.$router.go(delta)
        },
        goHome(){
            window.location.href = '/'
        },
        btnClick(index){
            this.$emit("btnClicked", index)
        }
    }
}
</script>

<style lang="stylus" scoped>
.topnav-container
    width: 100%
    height: 100%
    background: rgba(238, 238, 238, .8)
    backdrop-filter: blur(3px)
    .topnav-body
        width: 100%
        height: 100%
        padding: 0 1rem
        display: flex
        justify-content: space-between
        align-items: center
        .left
            display: flex
        div .button
            background: #fff
            padding: 1rem
            margin: 0 .5rem
            color: #48a8e4
            font-size: 1.5rem
            border-radius: .8rem
            border: 1px solid darken(#eee, 8%)
            user-select: none
            cursor: pointer
            transition: ease .2s;
            &:hover, &:active
                background: darken(#eee, 10%)
                border-color: darken(#eee, 12%)

</style>
