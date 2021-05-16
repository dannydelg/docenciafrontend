import axios from 'axios';

import { Aspirante } from '../models/aspirante';

const API = 'http://localhost:5000';



export const getCarreras = async () => {
     
    return await axios.get( `${API}/api/carreras`);
   
} 

export const getCursosPorCarrera = async (id:any) => {
     console.log(id);
    return await axios.get( `${API}/api/carreras/${id}`);
   
} 





export const createAspirante = async (aspirante: Aspirante, file: any) => {

    let formData = new FormData();
    formData.append('nombre', aspirante.nombre);
    formData.append('email', aspirante.email);

    formData.append('curriculum', file);
    console.log(file);
    console.log(formData);
    
    try {
        return await axios.post(`${API}/api/aspirante`, formData);
    } catch (error) {
       
        //return {data: "Algo salio mal"};
    }
    
   
} 