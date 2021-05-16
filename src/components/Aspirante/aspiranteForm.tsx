import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Aspirante } from "../../models/aspirante";
import * as aspiranteService from "../../services/aspiranteService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DropdownCarreras from "./dropdownCarreras";
import SelectCarrera from "./selectCarrera";

const Aspiranteform = () => {
  //const history = useHistory();
  const [selectedFile, setSelectedFile] = useState();
  const [esBachiller, setEsBachiller] = useState(false);
  const [esLicenciado, setEsLicenciado] = useState(false);
  const [aspirante, setAspirante] = useState<Aspirante>({
    nombre: "",
    email: "",
    bachiller: false,
    licenciatura: false,
    maestria: false,
    doctorado: false,
  });
  let bach = undefined;
  let nobach = undefined;

  const handleInputChange = (e: any) => {
    setAspirante({
      ...aspirante,
      [e.target.name]: e.target.value,
    });

    try {
      setSelectedFile(e.target.files[0]);
    } catch (error) {}
  };

  const handleCheck = (e: any) => {
    console.log(e.target.checked);
    console.log(e.target.value);

    if (e.target.value == "si" && e.target.checked == true) {
      setEsBachiller(true);

      setAspirante({
        ...aspirante,

        bachiller: true,
      });
    } else {
      setEsBachiller(false);

      setAspirante({
        ...aspirante,

        bachiller: false,
      });
    }
  };

  const handleCheckLic = (e: any) => {
    console.log(e.target.checked);
    console.log(e.target.value);

    if (e.target.value == "si" && e.target.checked == true) {
      setEsLicenciado(true);

      setAspirante({
        ...aspirante,

        bachiller: true,
      });
    } else {
      setEsLicenciado(false);

      setAspirante({
        ...aspirante,

        bachiller: false,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(aspirante);
    const resp = await aspiranteService.createAspirante(
      aspirante,
      selectedFile
    );
    console.log(resp);
    const mensajeRespuesta = resp?.data.message;

    toast.success(mensajeRespuesta);

    //history.push('/');
    console.log(resp);
  };

  return (
    <div className=" container form-group ">
      <img src="" alt="" />
      <h1 className="py-3 text-center">
        Formulario de registro para aspirantes
      </h1>
      <form
        onSubmit={handleSubmit}
        className="form-group d-flex justify-content-center"
        encType="multipart/form-data"
      >
        <div className="col-md-7">
          <h5> Información personal </h5>

          <input
            onChange={handleInputChange}
            type="text"
            name="nombre"
            className="form-control form-group "
            placeholder="Ingrese su nombre"
          />
          <input
            onChange={handleInputChange}
            type="text"
            name="apellidos"
            className="form-control form-group "
            placeholder="Ingrese sus apellidos"
          />
          <input
            onChange={handleInputChange}
            type="text"
            name="cedula"
            className="form-control form-group "
            placeholder="Ingrese su número de cédula"
          />

          <input
            onChange={handleInputChange}
            type="text"
            name="email"
            className="form-control form-group "
            placeholder="Ingrese su Email"
          />

          <h5> Información académica </h5>
          <label>
            {" "}
            ¿Cuenta con bachillerato en el área establecida en el puesto?
          </label>

          <div className="form-check">
            <input
              onChange={handleCheck}
              className="form-check-input"
              type="checkbox"
              name="bachiller"

              checked={esBachiller}
              value="si"
            />{" "}
            Si
          </div>

          <div className="form-check">
            <input
              onChange={handleCheck}
              className="form-check-input"
              type="checkbox"
              name="bachiller"
              value="no"
              
              checked={!esBachiller}
            />{" "}
            No
          </div>

          {esBachiller ? (
            <div className="col-md-6">
              <div className="row">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="bachilleratoUniversidad"
                  className="form-control form-group "
                  placeholder="Universidad"
                />

                <input
                  onChange={handleInputChange}
                  type="text"
                  name="bachilleratoTitulo"
                  className="form-control form-group "
                  placeholder="Título bachillerato"
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <label>
            {" "}
            ¿Cuenta con licenciatura en el área establecida en el puesto ?
          </label>

          <div className="form-check">
            <input
              onChange={handleCheckLic}
              className="form-check-input"
              type="checkbox"
              name="licenciatura"
              checked={esLicenciado}
              value="si"
            />{" "}
            Si
          </div>

          <div className="form-check">
            <input
              onChange={handleCheckLic}
              className="form-check-input"
              type="checkbox"
              name="licenciatura"
              value="no"
              checked={!esLicenciado}
            />{" "}
            No
          </div>

          {esLicenciado ? (
            <div className="col-md-6">
              <div className="row">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="licenciaturaUniversidad"
                  className="form-control form-group "
                  placeholder="Universidad"
                />

                <input
                  onChange={handleInputChange}
                  type="text"
                  name="licenciaturaTitulo"
                  className="form-control form-group "
                  placeholder="Título licenciatura"
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <input
            onChange={handleInputChange}
            type="file"
            name="curriculum"
            className="form-control form-group "
            placeholder="Subir Curriculum"
          />

          <button className="btn btn-primary ">Enviar</button>
        </div>
      </form>

      <div>
        <DropdownCarreras />
      </div>
    </div>
  );
};

export default Aspiranteform;
