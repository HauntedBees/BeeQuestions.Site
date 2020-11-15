export class UserInfoModel {
    displayname = "";
    joined = "";
    lastlogin = "";
    emoji = "1F41D";
    color = "#4B0082";
    blockdate:string|null = null;
    score = 0;
    level = 0;
    questionsPerDay = 0;
    answersPerDay = 0;
    questionsAsked = 0;
    answersGiven = 0;
    source = "";
    sourcename = "";
    notifications:NotificationModel[] = [];
    totalunread = 0;
}
export class RefreshedUserInfoModel {
    notLoggedIn = false;
    score = 0;
    level = 0;
    questionsPerDay = 0;
    answersPerDay = 0;
    questionsAsked = 0;
    answersGiven = 0;
    notifications:NotificationModel[] = [];
    totalunread = 0;
}
export class NotificationModel {
    id = 0;
    notiftype = "";
    answerurl = "";
    notifsubject = "";
    posted = "";
    seen = false;
}
export class LoginResponseModel {
    token = "";
    user = new UserInfoModel();
    isNew = false;
}