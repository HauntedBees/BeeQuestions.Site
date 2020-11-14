export class AnswerModel {
    id = 0;
    url = "";
    author = "";
    answer = "";
    status = "";
    opened = "";
    closed = "";
    tags:string[] = [];
    questions = 0;
}
export class QuestionModel {
    id = 0;
    answer = "";
    answerURL = "";
    winner = false;
    author = "";
    question = "";
    posted = "";
    score = 0;
    liked = false;
    yours = false;
}
export class FullAnswerModel {
    id = 0;
    author = "";
    answer = "";
    status = "";
    opened = "";
    closed = "";
    liked = false;
    tags:string[] = [];
    questions:QuestionModel[] = [];
}