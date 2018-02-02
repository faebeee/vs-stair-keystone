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
                    <td>#{{step.name}}</td>
                    <td>CHF {{step.price }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';

    import ReservationForm from '../reservation-form/reservation-form.vue';

    export default {
        components: {
            ReservationForm,
        },

        props: {
            step: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                showReservationForm: false
            }
        },
    }
</script>
