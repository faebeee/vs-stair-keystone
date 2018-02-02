<template>
    <div class="main-content">
        <Viewer/>


        <div class="main-content--image-wrapper">
            <img class="main-content--image" src="/static/img/kleber%20gueggel.png">

        </div>
        <p class="flow-text">
            {{$t("message.landingPageText")}}
        </p>

    </div>
</template>

<script>
    import Viewer from '@/components/3d-viewer/index';

    export default {
        components: {
            Viewer
        }

    }
</script>

<style scoped>

</style>
