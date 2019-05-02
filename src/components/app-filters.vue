<template>
    <v-layout row wrap>
        <v-flex xs12 sm3 class="pa-3">
            <v-btn-toggle v-model="active" mandatory>
                <v-btn flat>
                    Вылет
                </v-btn>
                <v-btn flat>
                    Прилет
                </v-btn>
            </v-btn-toggle>
        </v-flex>
        <v-flex xs12 sm5>
            <app-search @search="getSearchData"/>
        </v-flex>
        <v-flex xs12 sm4>
            <v-select
                    v-model="filter"
                    :items="filterFields"
                    label="Статус"
                    clearable
            ></v-select>
        </v-flex>
    </v-layout>
</template>

<script>
    import {format} from 'date-fns'
    import axios from '../utils/axios'
    import appSearch from './app-search'

    let selectedFilter = '';
    let defaultItems = [];
    let filteredItems = [];
    let date = new Date();
    let active = 0;
    let directions = ['departure', 'arrival'];
    const query = {
        params: {
            dateStart: format(date, 'YYYY-MM-DDT00:00:00Z'),
            dateEnd: format(date.setDate(date.getDate() + 1), 'YYYY-MM-DDT00:00:00Z'),
            perPage: 9999,
            page: 0,
            locale: 'ru',
        }
    };

    export default {
        name: "app-filters",
        data() {
            return {
                active: 0,
            }
        },
        created() {
            this.$emit('update:direction', directions[active]);
            this.getData()
        },
        watch: {
            active(val, oldVal) {
                if(val === oldVal) return;
                this.getData().then(() => this.$emit('update:direction', directions[this.active]));
            }
        },
        computed: {
            currentDirection() {
                return directions[this.active]
            },
            filter: {
                get() {
                    return selectedFilter
                },
                set(val) {
                    selectedFilter = val;
                    this.getFilteredItems(selectedFilter)
                }
            },
            filterFields() {
                return this.currentDirection === 'departure'
                    ? [
                        {text: 'Отменен', value: 'Отменен'},
                        {text: 'Прибыл', value: 'Прибыл'},
                        {text: 'В полете', value: 'В полете'},
                        {text: 'Посадка', value: 'Посадка'},
                        {text: 'Посадка закончена', value: 'Посадка закончена'},
                        {text: 'Ожидание посадки', value: 'Ожидание посадки'},
                        {text: 'Отправлен', value: 'Отправлен'},
                        {text: 'Регистрация идет', value: 'Регистрация идет'},
                    ]
                    :
                    [
                        {text: 'Отменен', value: 'Отменен'},
                        {text: 'Задержан', value: 'Задержан'},
                        {text: 'Совершил посадку', value: 'Совершил посадку'},
                        {text: 'Выдача багажа', value: 'Выдача багажа'},
                        {text: 'Ожидается', value: 'Ожидается в'},
                        {text: 'Летит', value: 'Летит'},

                    ]
            }
        },
        methods: {
            getSearchData(search) {
                this.getData(search)
            },
            getFilteredItems(status = null) {
                filteredItems = status
                    ? defaultItems.filter(item => item.vip_status.indexOf(status) !== -1)
                    : defaultItems;
                this.$emit('update:data', filteredItems);
                this.$emit('update:status', 'done');
            },
            async getData(search) {
                try {
                    this.$emit('update:status', 'loading');

                    query.params.direction = directions[this.active];
                    if(search) query.params.search = search;
                    if(!search) delete query.params.search;

                    const {data: {items}} = await axios.get(`timetable`, query);

                    defaultItems = items;
                    this.getFilteredItems();

                    return new Promise(resolve => resolve())
                } catch (e) {
                    console.warn('Ошибка при получении списка', e);
                    this.$emit('update:status', 'error');
                }
            }
        },
        components: {
            appSearch,
        }
    }
</script>

<style scoped>

</style>
