import { PropsWithChildren } from 'react';
import { useAuth } from '@/Hooks/useAuth';

interface Props {
    permission: string | string[];
    fallback?: React.ReactNode;
}

export default function PermissionBasedComponent({
    children,
    permission,
    fallback = null
}: PropsWithChildren<Props>) {
    const { hasPermission } = useAuth();
    
    const hasRequiredPermission = Array.isArray(permission)
        ? permission.some(p => hasPermission(p))
        : hasPermission(permission);

    if (!hasRequiredPermission) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}