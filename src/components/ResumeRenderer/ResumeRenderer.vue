<template>
    <div class="rr-container">
        <div class="rr-body">
            <div v-for="(item, index) in mdSections" :key="index">
                <div v-if="item.type == 'img'" class="img">
                    <a :href="item.data.src" :title="item.data.alt" target="_blank">
                        <img v-if="item.type == 'img'" 
                            :src="item.data.src" 
                            :alt="item.data.alt" 
                        >
                    </a>
                </div>
                <div v-else :class="item.type" v-html="linkify(item.data.content)"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ResumeRenderer",
    props: {
        mdSections: {
            type: Object,
            default: {}
        }
    },
    methods:{
        linkify(inputText) {
            if(!inputText) return;
            let replacedText, replacePattern1, replacePattern2, replacePattern3;
            // 匹配 http://, https://, ftp://
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, '<i class="ri-links-line"></i><a href="$1" target="_blank">$1</a>');
            // 匹配 "www."
            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '<i class="ri-links-line"></i>$1<a href="http://$2" target="_blank">$2</a>');
            // 匹配 email
            replacePattern3 = /(([a-zA-Z0-9\-_\.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
            return replacedText;
        }
    }
}

</script>

<style lang="stylus" scoped>
.rr-container
    width: 100%
    height: 100%
    line-height: 2
    color: var(--default-font-color)
    .rr-body::after
        content: ''
        display: block
        clear: both
    .rr-body div
        font-size: 1.5rem
        [class^=title]
            clear: both
            padding: 1rem 1.5rem
        .title-1 
            font-size: 2rem
            margin: 1.6rem 0 1.2rem 0
            border: 1px solid transparent
            border-radius: 5rem
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(to right, #fff, #fff), linear-gradient(to right, gray, rgba(0,0,0,0.1), rgba(0,0,0,0));
        .title-2 
            font-size: 1.8rem
            display: flex
            align-items: center
            &::before   
                content: ''
                width: .5rem
                height: 1.8rem
                background: darken(#eee, 50%)
                margin-right: 1rem
                display: inline-block
        .list
            padding: 0 2.5rem
            &::before
                content: "○ "
        .img  
            float: left
            padding: 1rem 2.5rem
        img
            width: 10rem
            height: 10rem
            object-fit: cover
            border-radius: .8rem

</style>
