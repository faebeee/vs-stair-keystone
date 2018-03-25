<template>
    <div class="main-content">
        <Viewer/>
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
