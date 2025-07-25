import React, {useContext, useEffect} from 'react'

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Clear user data from context
    setCurrentUser(null);
    
    // Redirect to home page
    navigate('/login');
  }, [setCurrentUser, navigate]);
  return (
    <></>
  )
}

export default Logout