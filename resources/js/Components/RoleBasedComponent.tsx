import { PropsWithChildren } from 'react';
import { useAuth } from '@/Hooks/useAuth';

interface Props {
    role: string | string[];
    fallback?: React.ReactNode;
}

export default function RoleBasedComponent({ 
    children, 
    role, 
    fallback = null 
}: PropsWithChildren<Props>) {
    const { hasRole } = useAuth();
    
    const hasRequiredRole = Array.isArray(role)
        ? role.some(r => hasRole(r))
        : hasRole(role);

    if (!hasRequiredRole) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}