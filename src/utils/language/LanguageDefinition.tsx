export const translations = {
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
    'settings_dark_mode': {
        'nl': 'Dark mode',
        'en': 'Dark mode',
    },
    'settings_language': {
        'nl': 'Taal',
        'en': 'Language',
    },
    'settings_language_nl': {
        'nl': 'NL',
        'en': 'NL',
    },
    'settings_language_en': {
        'nl': 'EN',
        'en': 'EN',
    }
};



export type Translations = keyof typeof translations;

export type SupportedLangs = 'nl' | 'en';