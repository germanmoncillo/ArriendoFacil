export class InmuebleInterface {
    _id: string; 
    tipoInmueble: string;
    fechaIngreso: Date;
    fechaPago: Date;
    valorPago: number;
    estado: string;
    usuario: string; // Schema.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
}