export class UsuarioModel {
    constructor(
        public readonly_id:String,
        public nombre:String,
        public email:String,
        public tipoDocumento:String,
        public numeroDocumento:number,
        public  login:String,
        public password:String,
        public rol:String,
        public estaod:boolean,
        public createdAt:Date,
    ){}
    }
