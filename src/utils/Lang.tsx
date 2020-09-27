const translations = {
    'title': {
        'nl': 'V.S.L. Catena',
        'en': 'V.S.L. Catena',
    },
    'title_home': {
        'nl': 'V.S.L. Catena - Home',
        'en': 'V.S.L. Catena- Home',
    },
    'title_news': {
        'nl': 'V.S.L. Catena - Nieuws',
        'en': 'V.S.L. Catena - News',
    },
    'title_profile': {
        'nl': 'V.S.L. Catena - Profiel',
        'en': 'V.S.L. Catena - Profile',
    },
    'drawer_home': {
        'nl': 'Home',
        'en': 'Home',
    },
    'drawer_news': {
        'nl': 'Nieuws',
        'en': 'News',
    }
};

class LangClass {
    private currentLang: "nl"|"en" = "nl";
    get(key: keyof typeof translations): string {
        return translations[key][this.currentLang];
    }
}

const Lang = new LangClass();

export default Lang;