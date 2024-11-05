type Listener<T> = (data: T) => void;

class EventEmitter {
    private listeners: { [key: string]: Listener<any>[] } = {};

    on<T>(event: string, listener: Listener<T>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    emit<T>(event: string, data?: T): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach((listener) => listener(data));
        }
    }
}

export const eventEmitter = new EventEmitter();
