import { use } from 'react';
import { AuthContext } from '../AtuhContext/AuthContext';

const useAuth = () => {
    const authInf = use(AuthContext);
    return authInf;
};

export default useAuth;