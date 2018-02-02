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

        <StepDetailComponent :stepId="id" v-if="id"/>

        <ReservationForm :stepId="id" v-if="id"/>
    </div>
</template>

<script>

    import StepDetailComponent from '@/components/step-detail/step-detail';
    import ReservationForm from '@/components/reservation-form/reservation-form';
    import {mapState} from 'vuex'

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

        computed: mapState([
            'step'
        ]),

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$step.get(this.id)
                    .then((step) => {
                        console.log(step);
                        this.$store.commit('setStep', step.step);
                    });
            }
        }
    }
</script>
