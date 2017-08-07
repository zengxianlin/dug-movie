<template>
    <div class="loading" v-if="loading">
        <transition name="loading">
            <mt-spinner color="#26a2ff" :size="50" :type="1" class="spinner"></mt-spinner>
        </transition>
    </div>
</template>
<script>
  export default {
    props: ['loading']
  }
</script>
<style scoped>
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        background-color:rgba(0, 0, 0, 0.05);
        z-index: 1000;
    }
    .loading .spinner{
        position: absolute;
        top:50%;
        left:50%;
        -webkit-transform: translate(-50%, -50%);
           -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
             -o-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
    }
    .loading-enter,
    .loading-leave-active{
        transform: translate(0, -25%);
        opacity: 0;
        transition: opacity 0.3s 0.1s, transform 0.5s;
    }

    .loading-enter-active,
    .loading-leave{
        transform: translate(0, 0);
        opacity: 1;
        transition: opacity 0.3s 0.1s, transform 0.5s;
    }
</style>