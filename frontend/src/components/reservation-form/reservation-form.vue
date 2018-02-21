<template>
    <div class="row reservation-form" v-if="step">
        <transition name="fade">
            <div class="row" v-if="!isAvailable">
                <error-message>
                    {{ $t('error.stepnotavailable') }}
                </error-message>
                <router-link :to="{name: 'home'}" class="btn-flat">
                    {{ $t("message.back") }}
                </router-link>
            </div>
        </transition>

        <div v-if="isAvailable">

            <transition name="fade">
                <error-message v-if="errorMessage">
                    {{ $t(errorMessage) }}
                </error-message>
            </transition>

            <div class="col s12">
                <div v-if="!isLoading">
                    <div class="row">
                        <div class="input-field col s12 m6">
                            <input id="firstname" type="text" v-model="firstname">
                            <label for="firstname">
                                {{ $t("form.firstname") }}
                            </label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input id="lastname" type="text" v-model="lastname">
                            <label for="lastname">
                                {{ $t("form.lastname") }}
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" v-model="email">
                            <label for="email">
                                {{ $t("form.mail") }}
                            </label>
                        </div>
                    </div>
                </div>

                <transition name="fade">
                    <div class="row" v-if="isLoading">
                        <loader/>
                    </div>
                </transition>


                <div class="row" v-if="!isLoading">
                    <div class="col s12">
                        <button @click="onSubmit" class="btn reservation-form--button"
                                :disabled="!isFormValid || !isAvailable ">
                            {{ $t("message.submit") }}
                        </button>

                        <router-link :to="{name:'home'}" class="btn-flat">
                            {{ $t("message.cancel") }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import reservationValidation from '@/validations/reservation';

    export default {
        props: {

            stepId: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                isLoading: false,
                errorMessage: null,
                name: null,
                plateText: null,
                email: null,
                firstname: null,
                lastname: null,
                invalidInput: false,

                step: null
            }
        },

        computed: {
            isAvailable() {
                return !this.step.isReserved && !this.step.isSold;
            },

            isFormValid() {
                return reservationValidation(this.firstname, this.lastname, this.email);
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
                    })
            },
            onSubmit() {
                this.isLoading = true;
                this.$step.markAsReserved(this.step, {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                })
                    .then(() => {
                        this.firstname = null;
                        this.lastname = null;
                        this.email = null;
                        this.$router.push({name: 'confirmation'});
                    })
                    .catch(e => {
                        if (e.status === 409) {
                            this.errorMessage = 'error.duplicateMail';
                        } else {
                            this.errorMessage = 'error.unknown';
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    })
            }
        }
    }
</script>
