import { ROLES } from "../../app/core/enum/roles.enum";
import { ESTADO } from "../../app/core/enum/roles.enum";

export const config = {
    roles: [ROLES.ADMIN, ROLES.ARRENDATARIO],
    estado: [ESTADO.ARRENDADO, ESTADO.DISPONIBLE],
};