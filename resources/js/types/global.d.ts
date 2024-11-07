import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

interface User {
    id: number;
    name: string;
    email: string;
    type: 'admin' | 'operator' | 'user';
    is_active: boolean;
    email_verified_at: string | null;
    roles: string[];
    permissions: string[];
    created_at: string;
    updated_at: string;
}

interface AppPageProps {
    auth: {
        user: User;
    };
    permissions?: string[];
    roles?: string[];
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

export {};