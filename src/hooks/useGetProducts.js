
import {useState,useEffect} from 'react'
import cookies from '../env/cookies'
// ----------------------------------------------------------------------
import {dir} from '../env/constant'
const useGetProducts=()=>{
    const [data, setData] = useState(null);
    useEffect(() => {
      const runFetch = async () => {
          let token=cookies.getCookie('access_token');
          await fetch(`${dir}/api/getproduct.php`,{headers:{
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
  export default useGetProducts