export default class Role {

    private constructor(
        public level: number,
    ) { }


    isAtLeast(role: Role): boolean {
        return this.level >= role.level;
    }

    static USER = new Role(0);
    static MODERATOR = new Role(1);
    static ADMIN = new Role(2);
    static SUPER_ADMIN = new Role(3);
}