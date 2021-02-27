import Role from "../model/Role";

export default function mapRole(level: number): Role {
    switch(level) {
        case Role.MODERATOR.level:
            return Role.MODERATOR;
        case Role.ADMIN.level:
            return Role.ADMIN;
        case Role.SUPER_ADMIN.level:
            return Role.SUPER_ADMIN;
        default:
            return Role.USER;
    }
}