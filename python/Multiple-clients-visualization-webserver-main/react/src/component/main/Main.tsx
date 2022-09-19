import React from 'react';
import BoardPage from './Board';
import HocApi from 'common/hooks/useApi';
import { Coords, CoordsItem } from 'types';
import config from 'config';

function App() {
    const [coords_list, set_coords_list] = React.useState<CoordsItem[]>([]);
    const [coords, setCoords] = React.useState<Coords>({ x: 0, y: 0 });
    const [error, setError] = React.useState<string>('');
    const { send_coords_and_get_list_of_all_user } = HocApi();

    const savedCallback: React.MutableRefObject<any> = React.useRef();

    const update_board = async () => {
        const res: CoordsItem[] | string = await send_coords_and_get_list_of_all_user({ ...coords });
        error!=='' && setError('') 
        typeof res === 'string' ? setError(res) : set_coords_list(res);
    };
    React.useEffect(() => {
        savedCallback.current = update_board;
    }, [update_board]);

    React.useEffect(() => {
        update_board();
        const timer = setInterval(() => savedCallback.current(), config.time_interval);
        return () => clearInterval(timer);
    }, []);
    return <BoardPage coords_list={coords_list} coords={coords} setCoords={setCoords} error={error} />;
}

export default App;
