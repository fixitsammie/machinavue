<template>
    <div class="row">
        <div class="col-8">
            <h3>Draggable table</h3>

            <table class="table table-striped">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">Order No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Manager email address</th>
                    <th scope="col">Type of participant</th>
                    <th scope="col">Foundation date</th>

                </tr>
                </thead>
                <draggable    v-model="list" tag="tbody" :options="{ forceFallback: true }"  @start="isDragging = true"
                           @end="isDragging = false" @update="saveUpdatedOrder">
                    <tr v-for="item in list" :key="item.name">
                        <td scope="row">{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.participant_type }}</td>
                        <td>{{ item.foundation_date }}</td>
                    </tr>
                </draggable>
            </table>
        </div>

        <rawDisplayer class="col-3" :value="list" title="List" />
    <button class="button is-link is-medium is-rounded" v-on:click="SaveChanges">Save Changes</button>
        </div>
</template>

<script>
    import axios from 'axios';
    import draggable from "vuedraggable";
    export default {
        name: "DragList",
        display: "Table",
        order: 8,
        listChanged: false,
        components: {
            draggable
        },
        data() {
            return {
                list: [
                    {id: 1, name: "Abby", email: "basket",participant_type: "Muse", foundation_date: "today"},
                    {id: 2, name: "Brooke", email: "foot",participant_type: "Muse", foundation_date: "today"},
                    {id: 3, name: "Courtenay", email: "volley",participant_type: "Muse", foundation_date: "today"},
                    {id: 4, name: "Vavis", email: "music",participant_type: "Muse", foundation_date: "today"},
                    {id: 5, name: "Avid", email: "mouse",participant_type: "Muse", foundation_date: "today"},
                    {id: 6, name: "Davi", email: "smoke",participant_type: "Muse", foundation_date: "today"}
                ],
                dragging: false
            };
        },
        methods: {
            saveUpdatedOrder: function () {
                this.listChanged = true;
            },
            saveChanges: function(e) {
                e.preventDefault()


                let soldierList = this.sortedList


                const formData = new FormData();
                formData.append('soldierList', soldierList);


                let slug_url = '/api/listorder';
                axios({url: slug_url, data: formData, method: 'POST'})
                    .then(resp => {
                        const success = resp.data.success
                        if (success) {
                            this.messages.push('Changes saved');


                        } else {
                            this.errors.push("Changes not changed");
                        }
                    }).catch(err => {
                    this.errors.push(err);

                })


            }
        },
        computed: {
            sortedList: function () {
                let tempArray = [];
                for (let i = 0; i < this.list.length; i++) {
                    let temp = this.list[i];
                    temp['order'] = i;
                    tempArray.push(temp);

                }
                return tempArray;
            }
        },
        created: function () {

            axios({
                url: '/api/list', method: 'GET',

            })
                .then(res => {

                    //const recommended_tours=resp.data.recommended_tours
                    // eslint-disable-next-line no-console
                    console.log(res.request)
                    this.thelist = res.data.soldiers
                }).catch(err => {
                this.errors.push(err);
                // eslint-disable-next-line no-console
                console.log(err.request)

            })
        }
    };
</script>
<style scoped>
    .buttons {
        margin-top: 35px;
    }
</style>