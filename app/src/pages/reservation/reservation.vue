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
    }
</script>
