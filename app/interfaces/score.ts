export type Icono ="gryphon"|"chimera"|"echidna"|"madre-monte"|"scarecrow"|"summoner"|"dragon-2"|"Basilisk"|"bat";

export interface DataScore{
    id?:number;
    nombre: string;
    score:number;
    icono: Icono;
}