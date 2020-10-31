import User from '../models/User';

export default class AuthResponse {
    public user: User;
    public token: string;

    constructor(responseData: object) {
        this.user = User.create(responseData.user || {});
        this.token = responseData.token || '';
    }
}