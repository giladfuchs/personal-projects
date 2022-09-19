import { useRef, MutableRefObject } from 'react';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { BoradProps, CoordsItem } from 'types';
import useAuth from 'common/hooks/useAuth';

const colors_array = [
    'rgb(255,59,48)',
    'rgb(255,149,0)',
    'rgb(255,204,0)',
    'rgb(76,217,100)',
    'rgb(90,200,250)',
    'rgb(0,122,255)',
    'rgb(88,86,214)',
    'rgb(255,45,85)'
];
const colors = (index: number) => colors_array[index % colors_array.length];

const BoardPage = ({ coords_list, coords, setCoords, error }: BoradProps) => {
    const [canvasSize, setCanvasSize] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [button] = React.useState< JSX.Element>( <Button
        color="warning"
        onClick={(e: any) => {
            logout();
        }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{bottom:1,
            position: 'absolute'}}
    >
        Logout
    </Button>);

    const { logout, username } = useAuth();

    const handleMouseMove = (event: any) => {
        setCoords({
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop
        });
    };

    const canvasRef: MutableRefObject<any> = useRef(null);

    const draw = (ctx: any, x: number, y: number, text: string, index: number) => {
        ctx.fillStyle = colors(index);
        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();

        const textWidth = ctx.measureText(text).width;

        ctx.fillStyle = colors(index);
        ctx.fillRect(x + 25 - textWidth / 2, y - 15, textWidth + 10, 20);

        ctx.font = 'bold 18px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + 30, y);
    };

    React.useEffect(() => {
 
        const updateCanvasSize = () => {
            const { innerWidth, innerHeight } = window;
            setCanvasSize({ width: innerWidth, height: innerHeight });
        };

        updateCanvasSize();

        window.onresize = updateCanvasSize;
    }, []);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        coords_list.forEach((element: CoordsItem, index: number) => {
            draw(context, element.x, element.y, element.username, index);
        });
    }, [coords_list]);

    return (
        <Box sx={{ overflow: 'hidden', color: 'white' }}>
            <canvas
                width={canvasSize.width}
                height={canvasSize.height}
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                style={{ backgroundColor: 'black', display: 'block' }}
            />

            <Box sx={{ position: 'absolute', top: 20, right: 40 }}>
                {error && <Typography>error: {error}</Typography>}
                <Box sx={{ padding: '20px 0' ,height:565, justifyItems:'space-around'}}>
                    {[{ username, ...coords } as CoordsItem].concat(coords_list).map((coordsItem: CoordsItem, index: number) => {
                       const is_current = coordsItem.username === username
                       return <Typography textAlign={is_current?"center":'left'} key={index}>
                            {is_current ? (
                                <Typography mb={1} textAlign="center">
                                    {`current user: ${coordsItem.username}`}{' '}
                                </Typography>
                            ) : (
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: 16,
                                        height: 16,
                                        verticalAlign: 'middle',
                                        backgroundColor: colors(index - 1),
                                        marginRight: 10,
                                        borderRadius: '50%'
                                    }}
                                />
                            )}
                            {is_current ? '' : coordsItem.username} x: {coordsItem.x} y: {coordsItem.y}
                        </Typography>
                    })}
           
                </Box>

            </Box>
                    {button}
    
        </Box>
    );
};
export default BoardPage;
