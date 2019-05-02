<template>
    <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            clearable
            flat
            hide-no-data
            hide-details
            label="Поиск"
    ></v-autocomplete>
</template>

<script>
    import axios from '../utils/axios'


    let item = null;
    const query = {
        params: {
            locale: 'ru',
        }
    };

    export default {
        name: "app-search",
        data () {
            return {
                loading: false,
                items: [],
                search: null,
            }
        },
        computed: {
            select: {
                get() {
                    return item;
                },
                set(val) {
                    item = val;
                    this.$emit('search', item);
                }
            }
        },
        watch: {
            search (val) {
                val && val !== this.select && this.getSearchData(val)
            }
        },
        methods: {
            async getSearchData (val) {
                this.loading = true;
                query.params.q = val;
                const {data} = await axios.get('search/title_timetable/', query)
                this.items = data;
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

</style>
