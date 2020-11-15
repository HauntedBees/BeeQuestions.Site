export class TagModel {
    name = "";
    count = 0;
}
export class AnswerModel {
    id = 0;
    url = "";
    author = "";
    answer = "";
    status = "";
    opened = "";
    closedate = "";
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
    authorcolor = "";
    authoremoji = "";
    question = "";
    posted = "";
    score = 0;
    liked = false;
    yours = false;
}
export class FullAnswerModel {
    id = 0;
    author = "";
    authorcolor = "";
    authoremoji = "";
    answer = "";
    status = "";
    opened = "";
    closed = "";
    yours = false;
    liked = false;
    bestquestion = 0;
    tags:string[] = [];
    questions:QuestionModel[] = [];
}
export class UserProfileModel {
    displayname = "";
    level = 0;
    score = 0;
    answers = 0;
    questions = 0;
    answerLikes = 0;
    questionLikes = 0;
    bestQuestions = 0;
}