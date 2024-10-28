export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	products: [];
};

export enum Screens {
    REGISTER = "REGISTER",
    LOGIN = "LOGIN",
    DASHBOARD = "DASHBOARD",
    POST = "POST",
    CREATEPOST = "CREATEPOST",
    PROFILE = "PROFILE",
    SETTINGS = "SETTINGS",
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPRODUCTS' = 'GETPRODUCTS',
}