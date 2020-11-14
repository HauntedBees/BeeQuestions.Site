export class UserInfoModel {
    displayname = "";
    joined = "";
    score = 0;
    level = 0;
}
export class LoginResponseModel {
    token = "";
    user = new UserInfoModel();
    isNew = false;
}