import { useState,useEffect} from 'react';
import cookies from '../env/cookies'
import {dir} from '../env/constant'
const useGetUsers=()=>{
    const [data, setData] = useState(null);
    useEffect(() => {
      const runFetch = async () => {
          let token=cookies.getCookie('access_token');
          await fetch(`${dir}/api/getUser.php`,{headers:{
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization': `Bearer ${token}`
             }
          })
           .then(res=>res.json())
           .then(mess=>{
               console.log(mess)
              setData(mess);
              })
          };
      runFetch();
        },[])
      return data;
  }
  export default useGetUsers