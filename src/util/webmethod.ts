import store from "src/store";
import { Loadable } from "src/util/Loadable";
class Beeliever {
    path:string;
    withCredentials:boolean;
    constructor(path:string, withCredentials:boolean) {
        this.path = path;
        this.withCredentials = withCredentials || false;
    }
    maybeAuth() { return store.state.token !== "" ? { "Authorization": "Bearer " + store.state.token } : undefined; }
    maybeCreds() { return store.state.token !== "" ? "same-origin" : "omit"; }
    getHeaders() { return this.withCredentials ? { "Authorization": "Bearer " + store.state.token } : undefined; }
    handleResponse(response:Response, caller:Loadable|null, successCallback?:Function, errorCallback?:Function) {
        if(caller !== null) { caller.loading = false; }
        if(response.ok) {
            response.json().then(data => {
                if(store && data.message) { store.commit("setMessage", ["success", data.message]); }
                if(data.success && successCallback !== undefined) {
                    successCallback(data);
                } else if(errorCallback !== undefined) {
                    errorCallback(data);
                }
            });
        } else {
            response.json().then(error => {
                if(store) {
                    if(error.message) {
                        store.commit("setMessage", ["error", error.message]);
                    } else if(response.status === 401) {
                        store.commit("setMessage", ["error", "Access Denied"]);
                    } else {
                        store.commit("setMessage", ["error", "Some error occurred, sorry!"]);
                    }
                }
                if(errorCallback !== undefined) {
                    errorCallback(error);
                }
            });
        }
    }
    auth(successCallback:Function, errorCallback:Function) {
        fetch(this.path + "Auth/", {
            method: "GET",
            headers: this.getHeaders(),
            credentials: this.withCredentials ? "same-origin" : "omit"
        }).then(res => this.handleResponse(res, null, successCallback, errorCallback));
    }
    get(caller:Loadable|null, path:string, param:unknown, successCallback:Function, errorCallback?:Function) {
        if(caller !== null) { caller.loading = true; }
        const paramStr = !param ? "/" : ("/" + encodeURIComponent(JSON.stringify(param)));
        fetch(this.path + path + paramStr, {
            method: "GET",
            headers: this.maybeAuth(),
            credentials: this.maybeCreds()
        }).then(res => this.handleResponse(res, caller, successCallback, errorCallback));
    }
    async getStandardValue(caller:Loadable|null, path:string, param:unknown) {
        if(caller !== null) { caller.loading = true; }
        const paramStr = !param ? "/" : ("/" + encodeURIComponent(JSON.stringify(param)));
        try {
            const response = await fetch(this.path + path + paramStr, {
                method: "GET",
                headers: this.maybeAuth(),
                credentials: this.maybeCreds()
            });
            const rjson = await response.json();
            return rjson.result;
        } catch(e) {
            console.log(e);
            return null;
        } finally {
            if(caller !== null) { caller.loading = false; }
        }
    }
    post(caller:Loadable|null, path:string, obj:unknown, successCallback?:Function) {
        if(caller !== null) { caller.loading = true; }
        fetch(this.path + path + "/", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: this.maybeAuth(),
            credentials: "same-origin"
        }).then(res => this.handleResponse(res, caller, successCallback));
    }
    delete(caller:Loadable|null, path:string, param:unknown, successCallback:Function) {
        if(caller !== null) { caller.loading = true; }
        const  paramStr = !param ? "/" : ("/" + encodeURIComponent(JSON.stringify(param)));
        fetch(this.path + path  + paramStr, {
            method: "DELETE",
            headers: this.getHeaders(),
            credentials: this.withCredentials ? "same-origin" : "omit"
        }).then(res => this.handleResponse(res, caller, successCallback));
    }
}
export const bee = new Beeliever(process.env.VUE_APP_API_PATH || "", false);
export const beeSecure = new Beeliever(process.env.VUE_APP_SECURE_API_PATH || "", true);
export class BeeResponse<T> {
    success:boolean;
    result:T;
    constructor(x:T) {
        this.success = true;
        this.result = x;
    }
}