
import {useState,useEffect} from 'react'
import cookies from '../env/cookies'
// ----------------------------------------------------------------------
import {dir} from '../env/constant'
const useGetProducts=(sort='default',filter='default')=>{
    const [data, setData] = useState(null);
    useEffect(() => {
      const runFetch = async () => {
        console.log('sort',sort)
          let token=cookies.getCookie('access_token');
          await fetch(`${dir}/api/getproduct.php`,{headers:{
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization': `Bearer ${token}`
             },
             method: "POST",
             body: `sort=${sort}&&filter=${filter}`
          })
           .then(res=>res.json())
           .then(mess=>{
              console.log(mess)
              setData(mess);
              })
          };
      runFetch();
        },[sort,filter])
      return data;
  }
  export default useGetProducts