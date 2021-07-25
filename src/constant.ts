export const HEADER_TOKEN_KEY = "access-token"

export enum EnumDecorator {
    PERMISSIONS,
    ISAUTHEN,
    NOT_AUTHEN
}

export enum DATABASE_COLLECTIONS {
    USER = 'users',
    HISTORY = 'histories',
}

export enum HISTORY_ACTION {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    RECOVERY = 'RECOVERY'
}


export const ROLE_TYPES = {
    APP_ROLE: 'APP_ROLE'
}

export const ROLES = {
    APP: {
        ADMIN: 'APP_ADMIN',
        SUPERADMIN: 'APP_SUPERADMIN',
        MEMBER: 'APP_MEMBER',
    } as const
}

export const PERMS = {

    /**
     * @description
     * APP (aka Application)
     * is the permission which
     * be assign to user through roles, the permissions grant user priviledges
     * that will be examined when particular user interact with app. For example, create user.
     */
    APP: {
    } as const,

}

type AppRoleKeys = keyof typeof ROLES.APP
export type AppRole = typeof ROLES.APP[AppRoleKeys]

type AppPermissionKeys = keyof typeof PERMS.APP
export type AppPermission = typeof PERMS.APP[AppPermissionKeys]

export const APP_PERMISSIONS = PERMS.APP;
