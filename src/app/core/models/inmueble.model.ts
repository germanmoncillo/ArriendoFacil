import { UsuarioInmuebleInterface } from "../interfaces/usuario";

export class InmuebleModel {

    constructor(
        public readonly _id: string, 
        public tipoInmueble: string,
        public fechaIngreso: Date,
        public fechaPago: Date,
        public valorPago: number,
        public estado: string,
        public usuario: UsuarioInmuebleInterface, 
        public createdAt: Date,
        public updatedAt: Date, 
    ){}
}