export class LocalStorageManager {
    
    static save(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load(key: string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }
}
