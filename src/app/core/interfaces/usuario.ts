export interface UsuarioInterface {
    _id: string,
    nombre: string;
    email:  string; 
    tipoDocumento:  string;
    numeroDocumento:  string;
    login: string;
    password: string;
    rol: string;
    estado:  boolean;
    createdAt: Date,
}