import React, {useCallback, useState} from "react";
import Input from "@/components/input";
import {FaGithub,FaGoogle} from "react-icons/fa";
import {useRouter} from "next/router";
import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import { NextPageContext } from "next";

export async function getServerSideProps(context:NextPageContext) {
    const session = await getSession(context);

    if(session){
        return {
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }

    return{
        props: {}
    }
}

const auth = () => {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');

    const [variant,setVariant] = useState('login');

    const router = useRouter();

    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant)=>currentVariant==='login' ? 'register' : 'login')
    },[]);

    const login = useCallback(async () => {
        try {
            await signIn('credentials',{
                email,
                password,
                redirect: false,
                callbackUrl:'/'
            });
            router.push('/profiles');
        } catch (e) {
            console.log(e);
        }
    },[email,password,router])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register',{
                email,
                name,
                password,
            })

            login();
        } catch (e) {
            console.log(e);
        }
    },[email,password,name,login])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
            <div className='bg-black h-full w-full bg-opacity-45'>
                <nav className='px-12 py-6'>
                    <img src='/images/logo.png' className='h-12'/>
                </nav>
                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-85 px-20 py-20 self-center mt-2 lg:w-2/5 rounded-xl w-full'>
                    <h2 className='text-white text-5xl mb-8 font-semibold'>{variant === 'login' ? 'Sign in' : 'Register'}</h2>
                        <div className='flex flex-col gap-4'>
                            {variant === 'register' && (
                                <Input id='name' type='text' onChange={(e:any)=>setName(e.target.value)} value={name} label='Full name'/>
                            ) }
                                        <Input id='email' type='email' onChange={(e:any)=>setEmail(e.target.value)} value={email} label='Email Address'/>
                            <Input id='password' type='password' onChange={(e:any)=>setPassword(e.target.value)} value={password} label='Password'/>
                        </div>
                        <button onClick={variant === 'login' ? login : register} className='bg-red-700 py-3 text-white rounded-md w-full mt-10
                        hover:bg-red-800 transition'>{variant === 'login' ? 'Sign in' : 'Sign up'}</button>
                        <div className='flex flex-row items-center gap-4 mt-10 justify-center'>
                            <div onClick={()=>signIn('google',{callbackUrl:'/profiles'})} className='bg-white flex text-red-700 w-12 h-12 rounded-full items-center text-center cursor-pointer justify-center'>
                                <FaGoogle size={30}/>
                            </div>
                            <div onClick={()=>signIn('github',{callbackUrl:'/profiles'})} className='bg-white flex text-black w-12 h-12 rounded-full items-center text-center cursor-pointer justify-center'>
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className='text-neutral-600 mt-12'>
                            {variant == 'login' ? 'First time using Netflix ?' : 'Already have an account ?'}
                            <span onClick={toggleVariant} className='text-white ml-2 cursor-pointer hover:underline transition'>
                                {variant === 'login' ? 'Create an account' : 'Login'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default auth;