<template>
    <div v-if="step" class="row">
        <div class="col s12">
            <table>
                <thead>
                <tr>
                    <th>{{$t("message.stepnumber")}}</th>
                    <th>{{$t("message.stepprice")}}</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>{{step.name}}</td>
                    <td>CHF {{step.price }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            stepId: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                showReservationForm: false,
                step: null,
            }
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.isLoading = true;
                this.$step.get(this.stepId)
                    .then((step) => {
                        this.step = step;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        }

    }
</script>
