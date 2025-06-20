'use client'

import { axiosInstance } from "@/lib/axios"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import { useAuth } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"

const updateApiToken = (token: string | null) => {
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    else{
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const {getToken, userId} = useAuth()    
    const[loading, setLoading] = useState(true)

    const {checkAdminStatus} = useAuthStore()
    const {initSocket, discnnectedSocket} = useChatStore()

    useEffect(() => {

        const initAuth = async () => {
            try{
                const token = await getToken()
                updateApiToken(token)

                if(token){
                    await checkAdminStatus()
                    //init socket

                    if(userId) initSocket(userId)
                }
            }
            catch(error){
                updateApiToken(null)
                console.error("Error in auth provider", error)
            } finally {
                setLoading(false)
            }

           
        }

        initAuth()


        //cleanup function to disconnect socket when component unmounts
        return () => { discnnectedSocket() }
    }, [getToken, userId, checkAdminStatus, initSocket, discnnectedSocket])

     if(loading)return (
        <div className="h-screen w-full items-center justify-center">
            <Loader className="size-8 text-emerald-500 animate-spin">
                Loading...
            </Loader>
        </div>
    )
    return <div>{children}</div>
}
export default AuthProvider