import React, { useState } from 'react'
import Background from '../../assets/login2.png';
import Victory from '../../assets/victory.svg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

const Auth = () => {

    const navigate = useNavigate();
    const { setUserInfo } = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateLogin = () => {
        if (!email.length) {
            toast.error("Se requiere un correo.");
            return false;
        }
        if (!password.length) {
            toast.error("Se requiere una contraseña.");
            return false;
        }
        return true;
    };

    const validateSignup = () => {
        if (!email.length) {
            toast.error("Se requiere un correo.");
            return false;
        }
        if (!password.length) {
            toast.error("Se requiere una contraseña.");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (validateLogin()) {
            const response = await apiClient.post(
                LOGIN_ROUTE,
                {email, password},
                {withCredentials: true}
            );
            if(response.data.user.id) {
                setUserInfo(response.data.user);
                if(response.data.user.profileSetup) navigate('/chat');
                else navigate('/profile');
            }
            console.log({response});
        }
    };

    const handleSignup = async () => {
        if (validateSignup()) {
            const response = await apiClient.post(
                SIGNUP_ROUTE, 
                {email, password},
                {withCredentials: true}
            );
            if (response.status === 201) {
                setUserInfo(response.data.user);
                navigate("/profile");
            }
            console.log({ response });
        }
    };

    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
            <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl flex items-center justify-center'>
                <div className='flex flex-col gap-10 items-center justify-center text-center'>
                    <div className='flex items-center justify-center flex-col'>
                        <div className='flex items-center justify-center'>
                            <h1 className='text-5xl font-bold md:text-6xl'>Bienvenido</h1>
                            <img src={Victory} alt="Victory Emoji" className='h-[100px]'/>
                        </div>
                        <p className='font-medium'>Llena los detalles para empezar con la mejor aplicación de Chat</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <Tabs className='w-3/4' defaultValue='login'>
                            <TabsList className='bg-transparent rounded-none w-full'>
                                <TabsTrigger value='login'
                                className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Identificarse</TabsTrigger>
                                <TabsTrigger value='signup'
                                className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Registrarse</TabsTrigger>
                            </TabsList>
                            <TabsContent className='flex flex-col gap-5 mt-10' value='login'>
                                <Input placeholder='Correo' type='email' className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                                <Input placeholder='Contraseña' type='password' className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                                <Button className='rounded-full p-6' onClick={handleLogin}>Ingresar</Button>
                            </TabsContent>
                            <TabsContent className='flex flex-col gap-3' value='signup'>
                                <Input placeholder='Correo' type='email' className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                                <Input placeholder='Contraseña' type='password' className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                                <Input placeholder='Confirmar contraseña' type='password' className='rounded-full p-6' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Input>
                                <Button className='rounded-full p-6' onClick={handleSignup}>Registrarse</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className='hidden xl:flex justify-center items-center'>
                    <img src={Background} alt="background-login" className='h-[450px]' />
                </div>
            </div>
        </div>

    )
}

export default Auth