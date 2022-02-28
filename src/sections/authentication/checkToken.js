import {useLocation} from 'react-router-dom';
import cookies from '../../env/cookies'
import {dir} from '../../env/constant'
import account from '../../_mocks_/account'
import { useState, useEffect } from "react";
export const useCheckToken = () => {
  const [data, setData] = useState(null);
  const url = useLocation();
  useEffect(() => {
    const runFetch = async () => {
        let token=cookies.getCookie('access_token');
        if(url.pathname!='login' && token=='') 
        setData(0);
        await fetch(`${dir}/api/authenticateClient.php`,{headers:{
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization': `Bearer ${token}`
           }
        })
         .then(res=>res.json())
         .then(mess=>{
            console.log(mess)
            if(mess.status==1){
              account.displayName=mess.name;
              account.email=mess.email
            }
            setData(mess);
            })
        };
    runFetch();
  }, []);
  return { 'status':data};
};

