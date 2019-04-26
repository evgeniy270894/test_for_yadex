<template>
    <v-app id="inspire">
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-title>Табло аэропорта</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout
                        justify-center
                        align-center
                >
                </v-layout>
            </v-container>
        </v-content>
        <v-footer color="indigo" app>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: null
        }),
        props: {
            source: String
        }
    }
</script>
