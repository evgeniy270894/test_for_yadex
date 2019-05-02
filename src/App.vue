<template>
    <v-app id="inspire">
        <v-toolbar dense color="indigo" dark fixed app>
            <v-toolbar-title>Табло аэропорта</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height grid-list-lg>
                <v-layout justify-center>
                    <app-board/>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import appBoard from './components/app-boarrd'
    export default {
        components: {
            appBoard,
        }
    }
</script>
