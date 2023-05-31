
// --- API --------------------------------------------------------------------------------------------
export enum PATH {
    BASE_URL = 'https://dev.srrlab.ru',
    BASE_API = 'https://api.dev.srrlab.ru',
    REFRESH = '/auth/refresh',
    SEND_CODE = '/auth/signup',
    REGISTER = '/auth/signup/verify',
    LOGIN = '/auth/login',
    LOGOUT = '/auth/logout',
    INIT = '/auth/init',
    UPDATE = '/auth/update'
}

// --- Layout -----------------------------------------------------------------------------------------
export enum HEADER {
    H_MOBILE = 64,
    H_MAIN_DESKTOP = 88,
    H_DASHBOARD_DESKTOP = 92,
    H_DASHBOARD_DESKTOP_OFFSET = 92 - 32,
}

export enum NAV {
    W_BASE = 260,
    W_DASHBOARD = 280,
    W_DASHBOARD_MINI = 88,
    H_DASHBOARD_ITEM = 48,
    H_DASHBOARD_ITEM_SUB = 36,
    H_DASHBOARD_ITEM_HORIZONTAL = 32,
}

export enum ICON {
    NAV_ITEM = 24,
    NAV_ITEM_HORIZONTAL = 22,
    NAV_ITEM_MINI = 22,
}
