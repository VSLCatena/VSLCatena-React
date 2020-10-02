import { StackScreenProps } from "@react-navigation/stack";
import User from "./models/User";

type NavigationParams = {
    Login: undefined;
    Home: undefined;
    Profile: { user: User|undefined };
    News: undefined;
    EditNews: { newsId: string|undefined },
    Settings: undefined;
    Feed: { sort: 'latest' | 'top' } | undefined;
};

export default NavigationParams;

export type NavigationProps<Screen extends keyof NavigationParams> = StackScreenProps<NavigationParams, Screen>;