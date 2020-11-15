<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <Loader v-if="loading" />
            <v-sheet v-if="!loading" class="mb-4 pa-2 px-4 text-center">
                <v-tabs v-model="tab" fixed-tabs icons-and-text @change="SwitchTab(tab)">
                    <v-tab>Users <v-icon>mdi-account-multiple</v-icon></v-tab>
                    <v-tab>Flagged <v-icon>mdi-flag</v-icon></v-tab>
                </v-tabs>
                <div v-if="tab===0">
                    <v-row class="pb-0"><v-col class="pb-0" cols="4"><v-text-field v-model="userSearch" @change="GetUsers()" label="Search for User" /></v-col></v-row>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Display Name</th>
                                    <th class="text-center">Last Login</th>
                                    <th class="text-center">Score</th>
                                    <th class="text-center">Level</th>
                                    <th class="text-center">Questions this Week</th>
                                    <th class="text-center">Answers this Week</th>
                                    <th class="text-center">Block Status</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.displayname">
                                    <td>{{user.displayname}}</td>
                                    <td>{{$dayjs(user.lastlogin).fromNow()}}</td>
                                    <td>{{user.score}}</td>
                                    <td>{{user.level}}</td>
                                    <td>{{user.questionsThisWeek}}</td>
                                    <td>{{user.answersThisWeek}}</td>
                                    <td>{{user.blockdate === null ? "" : ("Blocked for " + $dayjs(user.blockdate).toNow(true))}}</td>
                                    <td>
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn class="pr-2" color="primary" v-bind="attrs" v-on="on">
                                                    Action <v-icon>mdi-menu-down</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item @click="BlockUser(user.id, 'un')" v-if="user.blockdate !== null"><v-list-item-title>Unblock</v-list-item-title></v-list-item>
                                                <v-list-item @click="BlockUser(user.id, 'dy')" v-if="user.blockdate === null"><v-list-item-title>Block (one day)</v-list-item-title></v-list-item>
                                                <v-list-item @click="BlockUser(user.id, 'wk')" v-if="user.blockdate === null"><v-list-item-title>Block (one week)</v-list-item-title></v-list-item>
                                                <v-list-item @click="BlockUser(user.id, 'mn')" v-if="user.blockdate === null"><v-list-item-title>Block (one month)</v-list-item-title></v-list-item>
                                                <v-list-item @click="BlockUser(user.id, 'yr')" v-if="user.blockdate === null"><v-list-item-title>Block (one year)</v-list-item-title></v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>
                <div v-if="tab===1">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">Type</th>
                                    <th class="text-center">Content</th>
                                    <th class="text-center">Reported By</th>
                                    <th class="text-center">Reported</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="flag in flags" :key="flag.id">
                                    <td>{{flag.type}}</td>
                                    <td>{{flag.value}}</td>
                                    <td>{{$dayjs(flag.reported).fromNow()}}</td>
                                    <td>{{flag.reportedBy}}</td>
                                    <td>
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn class="pr-2" color="primary" v-bind="attrs" v-on="on">
                                                    Action <v-icon>mdi-menu-down</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item @click="HandleReport(flag.id, true)"><v-list-item-title>Delete Item</v-list-item-title></v-list-item>
                                                <v-list-item @click="HandleReport(flag.id, false)"><v-list-item-title>Dismiss Report</v-list-item-title></v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AdminUserViewModel, AdminFlagModel } from 'src/models/AdminModel';
import { beeSecure, BeeResponse } from 'src/util/webmethod';
@Component
export default class AdminPage extends Vue {
    tab = 0;
    loading = true;
    userSearch = "";
    users:AdminUserViewModel[] = [];
    flags:AdminFlagModel[] = [];
    created() {
        beeSecure.get(this, "Users", [], (data:BeeResponse<AdminUserViewModel[]>) => {
            this.users = data.result;
        }, () => {
            this.$router.push("/");
        });
    }
    SwitchTab(tab:number) {
        this.tab = tab;
        if(tab === 0) {
            this.GetUsers();
        } else {
            this.GetReports();
        }
    }
    BlockUser(id:number, amount:string) {
        beeSecure.post(null, "Block", { userID: id, blocktype: amount }, () => {
            this.GetUsers();
        });
    }
    HandleReport(id:number, removePost:boolean) {
        beeSecure.post(null, "Report", { id: id, remove: removePost }, () => {
            this.GetReports();
        });
    }
    async GetReports() { this.flags = await beeSecure.getStandardValue(this, "Reports", []); }
    async GetUsers() { this.users = await beeSecure.getStandardValue(this, "Users", [this.userSearch]); }
}
</script>