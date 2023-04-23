<template>
    <div class="resume">
        <div class="topnav" v-show="!windowPrint">
            <TopNav :buttons="topNavButtons" @btnClicked="btnClicked"/>
        </div>
        <div :class="'main ' + (windowPrint?'for-print':'')">
            <ResumeRenderer :mdSections="mdSections" />
        </div>
        <Popup bindElementId="nav-button-share">
            <div class="qr-container" ref="QRCodeBody"></div>
        </Popup>
    </div>
</template>

<script>
import ResumeRenderer from "./../../components/ResumeRenderer/ResumeRenderer.vue";
import TopNav from "./../../components/TopNav/TopNav.vue";
import Popup from "./../../components/Popup/Popup.vue";
import QRCode from "qrcodejs2";

export default {
    name: "resume",
    components:{
        ResumeRenderer,
        TopNav,
        Popup
    },
    data() {
        return {
            mdSections: {},
            windowPrint: false,
            topNavButtons: [
                {
                    index: 0,
                    id: "nav-button-share",
                    text: '分享'
                },
                {
                    index: 1,
                    id: "nav-button-print",
                    text: '打印'
                }
            ]
        }
    },
    created() {
        this.__init()
    },
    mounted() {
        this.createQRCode();
        window.addEventListener('afterprint', this.afterPrint);
    },
    beforeUnmount(){
        window.removeEventListener('afterprint', this.afterPrint);
    },
    methods: {
        __init() {
            this.$http({
                url: 'https://gcore.jsdelivr.net/gh/ppengryuu/storage@main/repository-data/vue3-personal-resume/markdown/resume.md',
                method: 'get'
            }).then(resp => {
                return this.handleMdData(resp.data);
            }).then(data => {
                this.mdSections = data;
            })
        },
        handleMdLine(line) {
            let item = {}, 
                titleReg = /^(\#+) +(.*)/,
                listReg = /^\- +(.*)/,
                imageReg = /\!\[(.*)\]\((.*)\)/;
            if(titleReg.test(line)) {
                line.replace(titleReg, (m, p1, p2) => {
                    item.type = `title-${p1.length}`;
                    item.data = {
                        content: p2
                    };
                });
            } else if (listReg.test(line)) {
                line.replace(listReg, (m, p1) => {
                    if(!(/: *$/).test(p1)) {
                        item.type = 'list';
                        item.data = {
                            content: p1
                        };
                    }
                });
            } else {
                if (imageReg.test(line)) {
                    line.replace(imageReg, (m, p1, p2) => {
                        item.type = 'img',
                        item.data = {
                            alt: p1,
                            src: p2
                        }
                    });
                } else {
                    item.type = 'text';
                    item.data = {
                        content: line
                    };;
                }
            }
            if(JSON.stringify(item) !== '{}') {
                return item;
            }
            return false;
        },
        handleMdData(data) {
            return new Promise((resolve) => {
                const lines = data.split(/\r\n|\n/), 
                    result = [];
                for(let i in lines){
                    if(!lines[i].trim()) { continue }
                    let item = this.handleMdLine(lines[i]);
                    if(item) {
                        result.push(item);
                    }
                }
                resolve(result);
            })
        },
        beforePrint() {
            this.windowPrint = true
        },
        afterPrint() {
            this.windowPrint = false
        },
        btnClicked(index) {
            if(index == 1){
                if(window.print){
                    this.beforePrint();
                    this.$nextTick(() => {
                        window.print()
                    })
                } else {
                    alert("您的浏览器不支持打印网页，建议您更换Chrome、Edge或FireFox浏览器")
                }
            }
        },
        createQRCode() {
            new QRCode(this.$refs.QRCodeBody, {
                text: window.location.href,
                width: 160,
                height: 160,
                colorDark: "#2c3e50",
                colorLight: "#fff",
                correctlevel: QRCode.CorrectLevel.H
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.resume 
    .topnav
        position: sticky
        top: 0
        left: 0
        width: 100%
        height: 6rem
    .main
        margin: 5rem 2rem
    .for-print
        margin: 3rem!important

.qr-container 
    width: 100%
    height: 100%
    display: grid
    place-items: center

</style>
