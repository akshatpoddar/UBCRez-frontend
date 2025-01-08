import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {

    }, []);

    return (
        
    )
}