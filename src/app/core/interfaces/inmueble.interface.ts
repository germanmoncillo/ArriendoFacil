import { UsuarioInmuebleInterface } from "./usuario";

export class InmuebleInterface {
    _id: string; 
    tipoInmueble: string;
    fechaIngreso: Date;
    fechaPago: Date;
    valorPago: number;
    estado: string;
    usuario: UsuarioInmuebleInterface; 
    createdAt: Date;
    updatedAt: Date;
}