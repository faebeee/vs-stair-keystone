<template>
    <div class="step-list">
        <div class="collection-header ">
            <h4>{{ $t('message.listTitle') }}</h4>
        </div>
        <StepLink v-for="step in steps" :step="step" :key="step._id"/>
    </div>
</template>

<script>

    import StepLink from '@/components/step-link/step-link';

    export default {
        components: {
            StepLink
        },
        data() {
            return {
                steps: [],
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$step.getAll()
                    .then((response) => {
                        this.steps = response;
                    })
            }
        }
    }
</script>
