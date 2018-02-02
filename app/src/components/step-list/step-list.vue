<template>
    <div class="step-list">
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
