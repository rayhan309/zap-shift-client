import useUaerRole from '../Hooks/useUaerRole';
import { Navigate } from 'react-router';

const AdminPage = ({ children }) => {
    const { role, loading } = useUaerRole();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!loading && role?.role !== 'admin') {
    //         navigate('/forbidden');
    //     }
    // }, [loading, role, navigate]);

    if (loading) {
        return <p className="text-center text-lg font-semibold">Loading...</p>;
    }

    // যদি admin না হয়, navigate হওয়ার আগ পর্যন্ত কিছুই দেখাতে হবে না
    if (role?.role !== 'admin') {
        return <Navigate to={'/forbidden'}></Navigate>;
    //   return navigate('/forbidden')
    }

    return children;
};

export default AdminPage;
