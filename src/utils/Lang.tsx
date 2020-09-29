const translations = {
    'title': {
        'nl': 'V.S.L. Catena',
        'en': 'V.S.L. Catena',
    },
    'title_home': {
        'nl': 'Home',
        'en': 'Home',
    },
    'title_news': {
        'nl': 'Nieuws',
        'en': 'News',
    },
    'title_profile': {
        'nl': 'Profiel van %s',
        'en': 'Profile of %s',
    },
    'title_settings': {
        'nl': 'Instellingen',
        'en': 'Settings',
    },
    'drawer_home': {
        'nl': 'Home',
        'en': 'Home',
    },
    'drawer_news': {
        'nl': 'Nieuws',
        'en': 'News',
    },
    'drawer_settings': {
        'nl': 'Instellingen',
        'en': 'Settings',
    },
    'login_username': {
        'nl': 'Gebruikersnaam',
        'en': 'Username',
    },
    'login_password': {
        'nl': 'Wachtwoord',
        'en': 'Password',
    },
};

class LangClass {
    private currentLang: "nl"|"en" = "nl";
    get(key: keyof typeof translations): string {
        return translations[key][this.currentLang];
    }
}

const Lang = new LangClass();

export default Lang;