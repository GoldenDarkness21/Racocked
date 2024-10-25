const get = (key: any, defaultValue: any) => {
    const value = localStorage.getItem(key) || sessionStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
};

const set = (key: any, value: any, session: boolean = false) => {
    const storage = session ? sessionStorage : localStorage;
    const parsed = JSON.stringify(value);
    //el método setItem() sirve para guardar el valor con la clave dada en el almacenamiento correspondiente.
    storage.setItem(key, parsed);
};

export default {
    get,
    set,
};
