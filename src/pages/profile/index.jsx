import { useAppStore } from '@/store'

const Profile = () => {
    const { userInfo } = useAppStore();
    return ( 
        <div>
            Profile
            {<div>Correo: {userInfo.id}</div>}
        </div>
    );
};

export default Profile