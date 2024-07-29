import { useAppStore } from '@/store'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Profile = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppStore();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);

    const saveChanges = async () => {};

    return (
        <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
            <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
                <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
            </div>
            <div className='grid grid-cols-2'>
                <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
                        {image ? (
                            <AvatarImage 
                                src={image} 
                                alt='profile' 
                                className='object-cover w-full h-full bg-black'/>
                        ) : (
                            <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                                {firstName 
                                    ? firstName.split("").shift()
                                    : userInfo.email.split("").shift()}
                            </div>
                        )}
                    </Avatar>
                    {hovered && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer'>
                            {image ? (
                                <FaTrash className='text-white text-3xl cursor-pointer'/> 
                            ) : ( 
                                <FaPlus className='text-white text-3xl cursor-pointer'/>
                            )}
                        </div>
                    )}
                    {/*<input type='text />*/}
                </div>
                <div className='flex flex-col gap-5 text-white items-center justify-center'>
                    <div className='w-full flex flex-col gap-5'>
                        <Input 
                            placeholder='Correo' 
                            type='email' 
                            disabled 
                            value={userInfo.email} 
                            className='rounded-lg p-6 bg-[#2c2e3b] border-none'
                        />
                        <Input 
                            placeholder='Primer Nombre' 
                            type='text' 
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName} 
                            className='rounded-lg p-6 bg-[#2c2e3b] border-none'
                        />
                        <Input 
                            placeholder='Apellido' 
                            type='text' 
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName} 
                            className='rounded-lg p-6 bg-[#2c2e3b] border-none'
                        />
                    </div>
                    <div className='w-full flex gap-5'>
                        {
                            colors.map((color,index) => (
                                <div 
                                    className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                                    ${
                                        selectedColor === index 
                                        ? 'outline outline-white/50 outline-2' 
                                        : ""
                                    }
                                    `} 
                                    key={index}
                                    onClick={() => setSelectedColor(index)}>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center mt-10'>
                <Button className='h-16 w-1/2 md:w-1/3 bg-purple-700 hover:bg-purple-900 transition-all duration-300'
                    onClick={saveChanges}>
                    Guardar Cambios
                </Button>
            </div>
        </div>
    );
};

export default Profile

