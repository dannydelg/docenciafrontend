import React, { Fragment, useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Carrera } from "../../models/carrera";
import * as videoService from "../Videos/VideoService";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Videoform from "../Videos/Videoform";
import VideoList from "../Videos/VideoList";
import * as aspiranteService from '../../services/aspiranteService';
import { Curso } from "../../models/curso";

const DropdownCarreras = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carreraSeleccionada, setCarreraSeleccionda] = useState<Carrera>();
  const [cursosSelecionado, setCursosSelecionado] = useState<Curso[]>([]);

  let losCurso: Array<Curso>=[];
  let lasCarrera: Array<Carrera>=[];
  const loadCarreras = async () => {
    const res = await aspiranteService.getCarreras();
    lasCarrera = res.data;
    lasCarrera.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    
    setCarreras(lasCarrera);
  };
 

  useEffect(() => {
    loadCarreras();
    console.log("works");
  }, []);

  const handleSelect = async (id: any) => {
    
   carreras.map(carrera => {
      if (carrera.id == id) {
        setCarreraSeleccionda(carrera);
        console.log(carrera)
      }
    }); 
   
    
    setCursosSelecionado([]);

    //console.log(id);
    const res = await aspiranteService.getCursosPorCarrera(id);
    losCurso = res.data;

    losCurso.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    
    setCursos(losCurso);
    console.log(res.data);
    

  }

  
  const handleSelectCurso= async (id: any) => {

    console.log(id);

    const cursoSelected = cursos.filter(e => e.id == id );

    const repetido = cursosSelecionado.filter(e => e.id == cursoSelected[0].id);

    console.log(repetido)
    if (repetido.length == 0) {
      console.log(cursoSelected);
    
    setCursosSelecionado([...cursosSelecionado, ...cursoSelected]);
      
    }

    
    //setCursosSelecionado();
    // console.log(cursosSelecionado);
    //const res = await aspiranteService.getCursosPorCarrera(id);
    //console.log(res.data);
    

  }

  return (
      <Fragment>
           <DropdownButton 
    title= { carreraSeleccionada ? carreraSeleccionada.nombre : "Selecione carrera"  } 
    id="dropdown-carreras"
    onClick={loadCarreras}
    onSelect={handleSelect}
    onChange={handleSelect}
    >
      
      <div>
        

        <Dropdown.Menu className="dropdown-menu" >
          {carreras.map((carrera) => {
            return <Dropdown.Item  eventKey={carrera.id.toString()}> {carrera.nombre} </Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </div>
    </DropdownButton>

    
<div className="container my-4">

<DropdownButton 
title="Selecione curso"
id="dropdown-cursos"
onClick={loadCarreras}
onSelect={handleSelectCurso} >

  <div>
   

    <Dropdown.Menu className="dropdown-menu" >
      {cursos.map((curso) => {
        return <Dropdown.Item  eventKey={curso.id.toString()}> {curso.nombre} </Dropdown.Item>;
      })}
    </Dropdown.Menu>
  </div>
</DropdownButton>
          
    <div>
    {cursosSelecionado.map((curso,id) => {
        return <h3> {id+1} - {curso.nombre}</h3> 
      })}
    </div>

 

</div>


      </Fragment>
   
  );
};

export default DropdownCarreras;
