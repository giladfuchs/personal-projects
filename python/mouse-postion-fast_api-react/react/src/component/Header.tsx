import {  useState, useRef, MutableRefObject } from 'react';

import React from 'react';
import axios from 'axios';
import useAuth from 'common/hooks/useAuth';

 
const HeaderPage = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [name, setName] = useState("");
    const { token } = useAuth();
 

    const handleMouseMove = (event: any) => {
        // console.log(event.clientX, event.target.offsetLeft,event.clientY, event.target.offsetTop);
        
        setCoords({
            // x: event.clientX,
            // y: event.clientY
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop
        });
    };

    // const canvasRef
    const canvasRef: MutableRefObject<any> = useRef(null);

    const draw = (ctx: any, x: number, y: number, text:string) => {
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.font = 'bold 18px serif';

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y+3);
    };
 
    const savedCallback: any = React.useRef();

     
    const fetch_model_by_id = React.useCallback(async (body:any ) => {
      // const body = {"options": [ "extended", 'threshold']}
  
      const config =  {headers:{ Authorization: `Bearer ${token}`} }
      const ans =  await axios.post(`http://0.0.0.0:60000/api/update`, body, config);
     return ans
   
    }, [ ]) 
  
  
    const update_dashboard =async () => {
  
        const res =   await fetch_model_by_id({coords, name })
        console.log(res.data.coords_list);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        res.data.coords_list.forEach((element:any) => {
            console.log(element);
            
            draw(context, element.x  , element.y, element.username);
        });

        
  
    };
    React.useEffect(() => {
        savedCallback.current = update_dashboard;
    }, [update_dashboard]);
  
    React.useEffect(() => {
  
        
        update_dashboard()
        const timer = setInterval(
            () => savedCallback.current(),
            // 60 * 2
            60*1
        );
        return () => clearInterval(timer);
    }, []);
   
    return (
  
            <div    style={{ height:'30rem',  width:'20rem',  backgroundColor: 'red' }}     >
   <input onChange={(e:any)=> {
                setName(e.target.value)
            }}/>
                <button type='button'
                  style={{    width:'100rem'   }}
                >
                <canvas ref={canvasRef}  onMouseMove={handleMouseMove}
                  style={{   width:'20rem' ,  backgroundColor: 'lightgray' }}
                  />
            </button>
         
            <h2    >
  
                    Coords: {coords.x} {coords.y}
                </h2>
            </div>

 
    );
};
export default HeaderPage;