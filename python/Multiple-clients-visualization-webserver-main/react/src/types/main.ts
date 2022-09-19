export interface Coords {
    x:number
    y:number
};
export interface CoordsItem extends Coords   {
    username:string
};
export interface CoordsList  {
    coords_list: CoordsItem[];

}
export interface BoradProps extends CoordsList {
    coords: Coords;
    setCoords:  React.Dispatch<React.SetStateAction<Coords>>;
    error?: string;
};