// useUserRole.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSqeure from './useAxiosSqeure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSqeure = useAxiosSqeure();

    const { data, isLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSqeure.get(`users/${user?.email}/role`);
            return res.data; // only data return
        }
    });

    return {
        role: data,
        loading: authLoading || isLoading
    };
};

export default useUserRole;
