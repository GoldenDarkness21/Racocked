import { Screens } from "../types/navegation";

export const navigate = (screen: Screens) => {
    return {
        type: "NAVIGATE",
        payload: screen,
    };
};