import { usePage } from '@inertiajs/react';


export function useAuth() {
    const { auth } = usePage<PageProps>().props;

    const hasRole = (role: string): boolean => {
        return auth.user?.roles?.includes(role) ?? false;
    };

    const hasPermission = (permission: string): boolean => {
        return auth.user?.permissions?.includes(permission) ?? false;
    };

    const isAdmin = (): boolean => {
        return auth.user?.type === 'admin' || hasRole('admin');
    };

    const isOperator = (): boolean => {
        return auth.user?.type === 'operator' || hasRole('operator');
    };

    const isUser = (): boolean => {
        return auth.user?.type === 'user' || hasRole('user');
    };

    return {
        user: auth.user,
        hasRole,
        hasPermission,
        isAdmin,
        isOperator,
        isUser,
    };
}