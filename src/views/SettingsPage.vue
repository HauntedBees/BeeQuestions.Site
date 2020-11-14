<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2 px-4 text-center">
                <v-row>
                    <v-avatar class="mx-auto" size="48" color="indigo"><span class="white--text">CH</span></v-avatar>
                </v-row>
                <v-row class="mt-2">
                    <div class="mx-auto">
                        <div>
                            <h1>{{$store.state.userInfo.displayname}}</h1>
                        </div>
                        <div>
                            <v-chip small color="accent">Lv. {{$store.state.userInfo.level}}</v-chip>
                            {{$store.state.userInfo.score.toLocaleString()}} beePloids
                        </div>
                    </div>
                </v-row>
            </v-sheet>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-sheet class="mb-4 pa-2 px-4 text-center">
                        <h2>Login Info</h2>
                        <v-subheader style="height:auto">(This information is never shared with anyone)</v-subheader>
                        <v-divider class="my-2" />
                        <div class="text-left mx-4 mb-4">
                            <div class="mb-1">
                                <strong>Account Created: </strong>
                            </div>
                            <div class="mb-1">
                                <strong>Last Login: </strong>
                            </div>
                            <div class="mb-1">
                                <strong>Login Type: </strong>
                            </div>
                            <div class="mb-1" v-if="source==='email'">
                                <strong>Email Address: </strong>
                            </div>
                            <div class="mb-1" v-if="source==='twitter'">
                                <strong>Twitter Account: </strong>
                            </div>
                        </div>
                        <div class="mx-auto">
                            <v-btn v-if="source==='twitter'" class="mb-2" color="accent">Unlink Twitter Account</v-btn>
                            <v-btn v-if="source==='email'" class="mb-2" color="accent">Change Email Address</v-btn>
                            <v-btn v-if="source==='email'" class="mb-2" color="accent">Change Password</v-btn>
                            <v-btn class="mb-2" color="secondary">Deactivate Account</v-btn>
                        </div>
                    </v-sheet>
                </v-col>
                <v-col cols="12" sm="8">
                    <v-sheet class="mb-4 pa-2 px-4 text-center">
                    </v-sheet>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class SettingsPage extends Vue {
    source = "twitter";
}
</script>