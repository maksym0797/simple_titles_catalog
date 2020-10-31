
export default class User{
    public id: Number;
    public name: string;
    public email: string;

    private constructor(id: Number, name: string, email: string) {
        this.id = id || 0;
        this.name = name || '';
        this.email = email || '';
    }

    public static create(data: object) {
        return new User(data.id, data.name, data.email);
    }
}
