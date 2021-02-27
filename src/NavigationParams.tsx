import { StackScreenProps } from "@react-navigation/stack";
import User from "./data/database/user/model/User";

type NavigationParams = {
    Login: undefined,
    Home: undefined,
    Profile: { user: User|undefined },
    News: undefined,
    Committees: undefined,
    EditNews: { newsId: string|undefined },
    Promo: undefined,
    EditPromo: { promoId: string|undefined },
    Activities: undefined,
    EditActivity: { activityId: string|undefined },
    Topics: undefined,
    Settings: undefined,
};

export default NavigationParams;

export type NavigationProps<Screen extends keyof NavigationParams> = StackScreenProps<NavigationParams, Screen>;