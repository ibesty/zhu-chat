<template>
    <div class="nice-bar" v-bind:class="[ theme==='dark' ? 'theme-dark' : 'theme-light', classes ? ' ' + classes : '']" ref="scrollContainer">
        <div ref="scrollContent" v-bind:style="{ 'margin-top': top * -1 + 'px', 'margin-left': left * -1 + 'px' }" @wheel="scroll" @touchstart="startDrag" @touchmove="onDrag" @touchend="stopDrag" style="position: relative;">
            <slot></slot>
            <resize-sensor @resized="onResize" :debounce="50"></resize-sensor>
            <!--resize when data change-->
        </div>
        <vertical-scrollbar ref="vscb" v-if="ready" v-bind:content="{ height: scrollContentHeight }" v-bind:container="{ height: scrollContainerHeight }" v-bind:scrolling="{ v: vMovement }" v-bind:dragging-from-parent="dragging" v-bind:on-change-position="handleChangePosition" v-bind:show="show" v-on:vertical="moveTheScrollbar">
        </vertical-scrollbar>
        <!--         <horizontal-scrollbar v-if="ready" v-bind:content="{ width: scrollContentWidth }" v-bind:container="{ width: scrollContainerWidth }"
                                    v-bind:scrolling="{ h: hMovement }" v-bind:dragging-from-parent="dragging" v-bind:on-change-position="handleChangePosition"
                                    v-bind:show="show" v-on:horizontal="moveTheScrollbar">
                </horizontal-scrollbar> -->
    </div>
</template>
<script>
import verticalScrollbar from './vertical-scrollbar.vue'
import horizontalScrollbar from './horizontal-scrollbar.vue'
import resizeSensor from 'vue-resizesensor'
require('../assets/css/vue-nice-scrollbar.scss')

export default {
    name: 'vue-nice-scrollbar',
    props: {
        classes: {
            type: String,
            default: ""
        },
        theme: {
            type: String,
            default: "light"
        },
        speed: {
            type: Number,
            default: 53
        },
        needToBottom: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            ready: false,
            scrollContainerHeight: null,
            scrollContainerWidth: null,
            scrollContentHeight: null,
            scrollContentWidth: null,
            show: false,
            dragging: false,
            scrollY: null,
            scrollX: null,
            top: 0,
            left: 0,
            vMovement: 0,
            hMovement: 0,
            start: {
                y: 0,
                x: 0
            },
        }
    },

    components: {
        verticalScrollbar,
        horizontalScrollbar,
        resizeSensor
    },

    methods: {
        calculateSize() {
            let $scrollContent = this.$refs.scrollContent
            let $scrollContainer = this.$refs.scrollContainer

            let scrollContainerStyle = window.getComputedStyle($scrollContainer, null)

            this.scrollContentHeight = $scrollContent.children[0].clientHeight
            this.scrollContentWidth = $scrollContent.children[0].clientWidth

            this.scrollContainerHeight = parseFloat(scrollContainerStyle.height)
            this.scrollContainerWidth = parseFloat(scrollContainerStyle.width)

            this.ready = true
        },

        showSlider() {
            this.show = true
        },

        hideSlider() {
            if (!this.dragging)
                this.show = false
        },

        scroll(e) {
            e.preventDefault()

            let num = this.speed

            let shifted = e.shiftKey

            this.scrollY = e.deltaY > 0 ? num : -(num)
            this.scrollX = e.deltaX > 0 ? num : -(num)


            if (shifted && e.deltaX == 0) this.scrollX = e.deltaY > 0 ? num : -(num)

            let nextY = this.top + this.scrollY
            let nextX = this.left + this.scrollX

            let canScrollY = this.scrollContentHeight > this.scrollContainerHeight
            let canScrollX = this.scrollContentWidth > this.scrollContainerWidth

            if (canScrollY && !shifted) {
                this.normalizeVertical(nextY)
                this.moveTheScrollbar()
            }

            if (shifted && canScrollX) {
                this.normalizeHorizontal(nextX)
                this.moveTheScrollbar()
            }
        },

        normalizeVertical(nextY) {
            let lowerEnd = this.scrollContentHeight - this.scrollContainerHeight

            console.log(lowerEnd)
            if (nextY > lowerEnd)
                nextY = lowerEnd
            else if (nextY < 0)
                nextY = 0

            this.top = nextY
            console.log(this.top)
        },

        normalizeHorizontal(nextX) {
            let rightEnd = this.scrollContentWidth - this.scrollContainerWidth

            if (nextX > rightEnd)
                nextX = rightEnd
            else if (nextX < 0)
                nextX = 0

            this.left = nextX
        },

        moveTheScrollbar() {
            this.vMovement = this.top / this.scrollContentHeight * 100
            this.hMovement = this.left / this.scrollContentWidth * 100
        },

        startDrag(e) {
            e.preventDefault()
            e.stopPropagation()

            e = e.changedTouches ? e.changedTouches[0] : e

            this.dragging = true
            this.show = true
            this.start.y = e.pageY
            this.start.x = e.pageX
        },

        onDrag(e) {
            if (this.dragging) {
                e.preventDefault()
                e = e.changedTouches ? e.changedTouches[0] : e

                let yMovement = this.start.y - e.pageY
                let xMovement = this.start.x - e.pageX

                this.start.y = e.pageY
                this.start.x = e.pageX

                let nextY = this.top + yMovement
                let nextX = this.left + xMovement

                this.normalizeVertical(nextY)
                this.normalizeHorizontal(nextX)

                this.moveTheScrollbar()
            }
        },

        stopDrag(e) {
            this.dragging = false
            this.show = false
        },

        handleChangePosition(vScrollbar, orientation) {
            let next = vScrollbar / 100 * (orientation == 'vertical' ? this.scrollContentHeight : this.scrollContentWidth)
            if (orientation == 'vertical') this.normalizeVertical(next)
            if (orientation == 'horizontal') this.normalizeHorizontal(next)
        },
        onResize() { //稍作修改，监听了resize事件，同时重新计算高度
            console.log('resize')
            this.calculateSize()
            this.$refs.vscb.calculateSize()
            if (this.needToBottom) {
                this.scrollBottom() //resize之后滚动到最底部
            }

        },
        scrollBottom() { //添加了方法，滚动到最底部
            if (this.scrollContentHeight > this.scrollContainerHeight) {
                let lowerEnd = this.scrollContentHeight - this.scrollContainerHeight
                this.top = lowerEnd
                this.moveTheScrollbar()
            }
        }
    },

    mounted() {
        this.calculateSize()

        this.$refs.scrollContainer.addEventListener('resize', this.calculateSize())

        if (this.ready) {
            this.$refs.scrollContainer.addEventListener('mouseenter', this.showSlider)
            this.$refs.scrollContainer.addEventListener('mouseleave', this.hideSlider)
        }
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.calculateSize)
        this.$refs.scrollContainer.removeEventListener('mouseenter', this.showSlider)
        this.$refs.scrollContainer.removeEventListener('mouseleave', this.hideSlider)
    }
}
</script>
