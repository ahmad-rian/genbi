export interface User {
    id: number;
    name: string;
    email: string;
    type: 'admin' | 'operator' | 'user';
    is_active: boolean;
}

export interface Ziggy {
    location: string;
    url: string;
    port: number | null;
    defaults: [];
    routes: Record<string, any>;
}

export type PageProps = {
    auth: {
        user: User | null;
    };
    ziggy: Ziggy;
    flash: {
        message?: string;
        error?: string;
    };
};