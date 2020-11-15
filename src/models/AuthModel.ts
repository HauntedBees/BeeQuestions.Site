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
}
export class RefreshedUserInfoModel {
    notLoggedIn = false;
    score = 0;
    level = 0;
    questionsPerDay = 0;
    answersPerDay = 0;
    questionsAsked = 0;
    answersGiven = 0;
}
export class LoginResponseModel {
    token = "";
    user = new UserInfoModel();
    isNew = false;
}