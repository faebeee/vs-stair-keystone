<template>
    <div class="main-content">
        <div class="row">
            <div class="col s12">
                <h4>{{$t("message.reservationtitle")}}</h4>
            </div>
        </div>

        <div class="row">
            <div class="col s12">
                <p>
                    {{ $t('message.reservationtext') }}
                </p>
            </div>
        </div>

        <StepDetailComponent :step="step" v-if="step"/>

        <ReservationForm :step="step" v-if="step"/>
    </div>
</template>

<script>

    import StepDetailComponent from '@/components/step-detail/step-detail';
    import ReservationForm from '@/components/reservation-form/reservation-form';

    export default {
        components: {
            ReservationForm,
            StepDetailComponent,
        },

        props: {
            id: {
                type: String
            }
        },
        data() {
            return {
                step: null
            }
        },
        mounted() {
            this.load();
        },
        methods: {
            load() {
                this.$step.get(this.id)
                    .then((step) => {
                        this.step = step;
                    })
            }
        }

    }
</script>
