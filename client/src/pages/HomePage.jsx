import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if(user===null){
      navigate("/signin");
    }
  },[])

  return (
    <div>HomePage</div>
  )
}

export default HomePage