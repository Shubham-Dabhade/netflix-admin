import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS = useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec", 
  ],[]);

  const [userStats, setUserStats] = useState([]);

  useEffect(()=>{
    let cancel = false;// doing this to prevent React memory leak warning

    const getStats = async()=>{
      try{
        const data = await axios.get("https://netflix-api-nurw.onrender.com/api/user/stats",{headers:
          {
            token:"Bearer" + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        return data;
      }catch(err){
        console.log(err);
      }
    }

    getStats().then((res)=>{
      if(cancel){
        return;
      }else{
        const statsList = res.data.sort((a,b)=>{
          return a._id - b._id;
        });
        statsList.map(item=>setUserStats((prev)=>{
          return [...prev,{name:MONTHS[item._id-1],"New User": item.total}];
        }));
      }
    }).catch((err)=>{
      console.log(err);
    });

    return ()=>{
      cancel= true;
    }
  },[MONTHS]);


  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
