import Service from "../service";
import {
  CheckAuthenticationParam,
  SendAuthenticationParam,
  LocalSignupParam,
  SocialSignupParam,
} from "./model";

class SignupService extends Service {
  send(param: SendAuthenticationParam) {
    return this.http.post("/apis/email-cert/send", param);
  }
  check(param: CheckAuthenticationParam) {
    return this.http.post("/apis/email-cert/check", param);
  }
  localSignup(param: LocalSignupParam) {
    return this.http.post("/apis/user/local", param, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  socialSignup(param: SocialSignupParam) {
    return this.http.post("/apis/user/social", param, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const signupService = new SignupService();

export default signupService;
