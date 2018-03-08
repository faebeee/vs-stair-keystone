<template>
    <div class="main-content">
        <Viewer/>

        <div class="main-content--image-wrapper" v-if="!step">
            <img class="main-content--image" src="/static/img/kleber%20gueggel.png">
        </div>

    </div>
</template>


<script>
    import Viewer from '@/components/3d-viewer/index';
    import { mapState } from 'vuex';

    export default {
        components: {
            Viewer
        },

        computed: mapState([
            'step'
        ]),
    }
</script>
