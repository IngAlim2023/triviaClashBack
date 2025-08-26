export type Icono ="gryphon"|"chimera"|"echidna"|"madreMonte"|"scarecrow"|"summoner"|"dragon2"|"Basilisk"|"bat";

export interface DataScore{
    id?:number;
    nombre: string;
    score:number;
    icono: Icono;
}