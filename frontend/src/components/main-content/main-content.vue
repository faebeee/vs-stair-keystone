<template>
    <div class="main-content">
        <Viewer/>

        <div class="main-content--image-wrapper" v-if="!step">
            <img class="main-content--image" src="/static/img/kleber%20gueggel.png">
        </div>

        <p class="main-content--text" v-if="!step">
            Welcome liebe Vorstadt Soundlär! Für unsere 17. Ausgabe benötigten wir eine grosse Metalltreppe, damit wir
            die feuerpolizeilichen Vorschriften erfüllen und somit unser schönes Holzpodest weiter benutzen dürfen. Da
            diese Ausgaben von CHF 7500.- eher spontan in unser Budget einflossen, hatten wir eine Idee: Du, dein
            Verein, ihr als Paar oder euer ganzer Haufen von super GFs, BFs und BFFs und alle anderen Friends, könnt
            euch JETZT am Vorstadt Sounds Festival verewigen!<br>
            Wir haben 18 Treppenstufen und eine Zwischenplattform (für's grosse Portemonnaie) zu verkaufen, nein du
            musst dieser weder ein Zuhause geben, noch hast du irgendwelchen Wartungsaufwand.<br>
            Für CHF 333.- könnt ihr euch eine Stufe ergattern, angeschrieben mit deinem/eurem Namen, eingraviert auf
            einer schicken kleinen Plakette!

        </p>

    </div>
</template>


<script>
    import Viewer from '@/components/3d-viewer/index';
    import { mapState } from 'vuex';

    export default {
        components: {
            Viewer
        },

        computed: mapState([
            'step'
        ]),
    }
</script>
