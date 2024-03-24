// secrea una clase cuando haciamos un esquema
// es publcia por que la usamos en varias partes de mi aplicacion
export class CLienteModel {
    constructor (
        // redadonlndesde cualquier otro lado de mi aplicacion no edito el id
    //   public readonly _id: string,
      public   nombre: string,
      public  telefono: number,
      public  email:string,
      public  tipoDocumento: string,
      public  numeroDocumento: string,
      public  estado?:boolean,
      public  createAt?:Date,
      public  updateAt?:Date,
      public   direccion?: string,
    ){}
}