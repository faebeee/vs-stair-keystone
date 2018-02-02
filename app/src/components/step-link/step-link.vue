<template>
    <div class="step-link" v-if="step" :class="{'step-link--disabled': !isAvailable}">
        <router-link :to="{name:'reservation', params:{id:step._id}}">
            #{{ step.name }} - <span v-if="!isAvailable">{{$t('message.sponsoredby')}} <i>{{step.sponsor.first}} {{ step.sponsor.last}}</i></span>
            <span v-if="isAvailable">CHF {{ step.price }}.-</span>
        </router-link>
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
        computed: {
            isAvailable() {
                return !this.step.isReserved && !this.step.isSold;
            }
        },

        data() {
            return {
                showReservationForm: false,
                sponsor: null
            }
        },

        mounted() {
        },

        methods: {}
    }
</script>
