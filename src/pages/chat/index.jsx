import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {

    const {userInfo} = useAppStore();
    const navigate = useNavigate();
    useEffect(() => {
        if(!userInfo.profileSetup) {
            toast('Por favor confirme su perfil para continuar.');
            navigate('/profile');
        }
    }, [userInfo,navigate]);

    return (
        <div>Chat</div>
    )
}

export default Chat