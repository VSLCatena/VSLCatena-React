const Color = new class {
    public primary: string = '#0000FF';
    public onPrimary: string = '#FFFFFF';
    public secondary: string = '#00FF00';
    public onSecondary: string = '#FFFFFF';

    public error: string = '#FF0000';
    public onError: string = '#FFFFFF';

    public background: string = '#FFFFFF';
    public onBackground: string = '#000000';

    public surface: string = '#FFFFFF';
    public onSurface: string = '#000000';
}

export default Color;