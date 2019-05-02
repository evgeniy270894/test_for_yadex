<template>
    <v-flex xs12>
        <app-filters :data.sync="items"
                     :status.sync="status"
                     :direction.sync="direction"

        />
        <v-data-table
                :headers="headers"
                :items="items"
                :loading="status === 'loading'"
                item-key="i_id"
                class="elevation-1"
                :rows-per-page-items="[5,10,25,50,{text: 'Все',value:-1}]"
        >
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.co.code }} {{ props.item.flt }}</td>
                <td class="text-xs-left">{{ direction === 'departure' ? props.item.mar2.city : props.item.mar1.city  || noData }}</td>
                <td class="text-xs-left">{{ format(props.item.t_st, 'HH:MM') || noData}}</td>
                <td class="text-xs-left">{{ props.item.term || noData}}</td>
                <td class="text-xs-left">{{ props.item.vip_status || noData}}</td>
            </template>
            <template #no-data>
                <div v-if="status === 'loading'">Список загружается...</div>
                <div v-if="status === 'error'">Ошибка при загрузке!</div>
                <div v-if="status === 'done'">Ничего не найдено</div>
            </template>
        </v-data-table>
    </v-flex>
</template>

<script>
    import {format} from 'date-fns'
    import appFilters from './app-filters'

    export default {
        name: "app-table",
        data() {
            return {
                noData: 'Нет данных',
                items: [],
                status: '',
                direction: 'departure', // arrival
                // direction: 'arrival', //
            }
        },
        computed: {
            headers() {
                return [
                    {text: 'Рейс', value: 'flt'},
                    {text: 'Направление', value: this.direction === 'departure' ? 'mar2.city' : 'mar1.city'},
                    {text: 'Время', value: 't_st'},
                    {text: 'Терминал', value: 'term'},
                    {text: 'Статус', value: 'vip_status'}
                ]
            },
            format() {
                return format
            }
        },
        components: {
            appFilters,
        }
    }
</script>

<style scoped>

</style>
