export default class Title {
    public id: Number;
    public name: string;
    public year: Number;
    public image: string;
    public platforms: Array<any>;
    public isShow: boolean;

    public static create(data) {
        return new Title(
            data.id || 0,
            data.name || '',
            data.year || 0,
            data.image || '',
            data.platforms || [],
            data.isShow || false
        );
    }

    get platformsNames() {
        return this.platforms.map((item) => item.name).join(', ');
    }

    private constructor(
        id: Number,
        name: string,
        year: Number,
        image: string,
        platforms: Array<Object>,
        isShow: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.image = image;
        this.platforms = platforms;
        this.isShow = isShow;
    }
}
