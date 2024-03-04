export default class UserSessionUtils {
  static generateSessionToken() {
    return Math.random().toString(36).substr(2, 10);
  }

  static getDeviceInfoFromRequest(request: any) {
    return request.headers().userAgent();
  }
}