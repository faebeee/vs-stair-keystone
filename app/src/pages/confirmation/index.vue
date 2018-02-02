<template>
    <div class="main-content">
        <h1>Danke</h1>

        <p class="flow-text">
            {{$t("message.confirmationText")}}
        </p>

        <router-link :to="{name: 'home'}" class="btn-flat">
            {{ $t("message.back") }}
        </router-link>
    </div>
</template>

<script>
    export default {
        beforeRouteEnter(to, from, next) {
            if (from.name !== 'reservation') {
                return next({name: 'home'});
            }
            next();
        },
    }
</script>
