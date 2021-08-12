
import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosCitas {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static agendarCita = (cita) => {
        return AxiosCitas.instanceAxios.post(`/agendarCita`, cita);
    }

    static getCitasPaciente = (filter) => {
        return AxiosCitas.instanceAxios.post(`/getCitasPaciente`, filter);
    }

    static getCitasMedico = (filter) => {
        return AxiosCitas.instanceAxios.post(`/getCitasMedico`, filter);
    }

    static reangedarCancelarCita = (cita) => {
        return AxiosCitas.instanceAxios.post(`/reangedarCancelarCita`, cita);
    }

    static getCitasReporte(filtro){
        return AxiosCitas.instanceAxios.post(`/getCitasReporte`, filtro);
    }

    static almacenar_informacion_cita = (informacion_cita) => {
        return AxiosCitas.instanceAxios.post(`/almacenar_cita`, informacion_cita);
    }

    static actualizar_cita = (informacion_cita) => {
        return AxiosCitas.instanceAxios.post(`/actualizar_cita`, informacion_cita);
    }

    static agendarCitaAsociada = (cita) => {
        return AxiosCitas.instanceAxios.post(`/agendarCitaAsociada`, cita);
    }

    static getCitasSeg = (filter) => {
        return AxiosCitas.instanceAxios.post(`/getCitasSeg`, filter);
    }

}