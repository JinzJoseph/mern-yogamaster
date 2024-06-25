import React, { useContext } from 'react'
import { AuthContext } from '../utilities/Providers/AuthProvider'

const useAuth = () => {
 const auth=useContext(AuthContext)
 return auth
}

export default useAuth
