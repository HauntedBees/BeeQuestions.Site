<template>
<v-card color="accent" class="ma-2" elevation="2" :to="'/answer/' + answer.url">
  <v-card-title>{{answer.answer}}</v-card-title>
  <v-card-subtitle class="hidden-sm-and-down">
    {{$tc("numquestions", answer.questions)}}
     • 
    <Tag v-for="tag in answer.tags" :key="tag" :tag="tag" />
     • 
     {{$dayjs(answer.opened).fromNow()}}
  </v-card-subtitle>
  <v-card-subtitle class="hidden-md-and-up py-0">{{$tc("numquestions", answer.questions)}} • {{$dayjs(answer.opened).fromNow()}}</v-card-subtitle>
  <v-card-subtitle class="hidden-md-and-up pt-2"><v-chip class="mr-1" color="secondary" v-for="tag in answer.tags" :key="tag"><v-icon left>mdi-label</v-icon> {{tag}}</v-chip></v-card-subtitle>
</v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AnswerModel } from 'src/models/AnswerModel';
@Component
export default class ListAnswer extends Vue {
  @Prop() readonly answer:AnswerModel | undefined;
}
</script>