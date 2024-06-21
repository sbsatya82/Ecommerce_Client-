import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {useDispatch, useSelector} from 'react-redux';
import { login } from './reducers/userSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadCart } from './action/action';
import Loader from './components/loader/Loader';



const Layout = () => {

  const [loading,setLoading] = useState(true);

  const {user} = useSelector((state)=> state.user);

  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const {data} = await axios.get('/api/v1/me');
        if(data.success ===true){
          const loggedInUser = data.user;
          dispatch(login(loggedInUser));
          await loadCart(dispatch);
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  },[])



  if(loading){
    return(<> 
      <Loader/>
    </>)
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
