<template>
    <div id="app" class="app">
        <div class="row app--row">
            <div class="col s12 l6 main ">
                <MainContentComponent/>
            </div>
            <div class="col s12 l6 main main--primary">
                <transition name="slide">
                    <router-view/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import FooterComponent from './components/footer/footer.vue'
    import HeaderComponent from './components/header/header.vue'
    import MainContentComponent from './components/main-content/main-content.vue'

    export default {
        name: 'app',
        components: {
            HeaderComponent,
            MainContentComponent,
            FooterComponent
        }
    }
</script>
