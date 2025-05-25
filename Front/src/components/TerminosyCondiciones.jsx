import React, { useState } from 'react';
import '../styles/Css/Terminos.css';

const ModalTerminos = ({ show, onClose }) => {

    console.log("MOSTRAR",show)
  if (!show) return null;

  return (
    <div className="modal-terminos">
      <div className="modal-terminos__backdrop" onClick={onClose} />
      <div className="modal-terminos__content">
        <button className="modal-terminos__close" onClick={onClose}>
          &times;
        </button>
        <h2 className='h2'>Términos y Condiciones</h2>
        <div className="modal-terminos__body">
          <p>De acuerdo con el decreto Boletín Oficial de Canarias num.225, es nuestra responsabilidad
                    que aceptes este formulario para nuestro registro antes de cada intervención.
                    Toda la información qye ke oedunis es de caracter CONFIDENCIAL y es
                    necesaria para adecuar nuestro trabajo a tus necesidades específicas.
                </p>

                <ul>
                    <li>
                        Se comprobará la ausencia local de lesiones u otras contraindicaciones.
                    </li>

                    <li>
                        Empleo de material de un solo uso y/o estéril. Las agujas son de un solo uso, pre esterilizadas y desechables.
                        Los pigmentos utilizados cuentan con homologación y cumplen con la actual normativa.
                    </li>

                    <li>
                        Se desprecintará el material en presencia del cliente.
                    </li>

                    <li>
                        Limpieza y desinfección del area de trabajo y zona anatómica sobre la que se usará el material.
                    </li>

                    <li>
                        Desechado el material sobrante enpresencia del cliente.
                    </li>

                </ul>

                <p>
                    Comprendo que un piercing/tatuaje es una herida en la piel que puede sufrir la evolución
                    de cualquier herida, sufriendo el riesgo de deterioro del tatuaje, transmisión de enfermedades por vía sanguínea,
                    irritación, inflamación, incrustacion de la joya alergia o rechazo a la tinta y otras dolencias causadas por motivos muy diversos,
                    entre los cuales se incluyen una curación inadecuada, sensibilidad especifica en cada piel, alergias, estado del sistema inmunológico
                    de cada persona y otras causas.
                </p>

                <p>
                    Soy consciente que el tatuaje puede condicionarme en futuras prácticas médicas 
                    (inyección epidural en caso de tatuajes en la zona lumbar, injertos de piel, donacion). 
                    Del mismo modo soy consciente de que un tatuaje es para toda la vida.

                </p>

                <p>
                    Entiendo y acepto que en la realizacion del tatuaje o piercing puedo desarrollar una alergia a alguo de los materiales utilizados.
                    Acepto contactar con <b> LA DIVA TATTOO </b>, para resolver cualquier duda o inconveniencia durante la curación.
                    Asi mismo consultar a mi médico en caso de que sea necesario.
                </p>

                <p>
                    Cualquier problema de mi tatuaje/piercing que no esté demostradamente cusado por una praxis 
                    (esterilización, desinfección del material o instalaciones), 
                    no será responsabilidad del tatuador / anillador / empresa. Asumo la responsabilidad y 
                    riesgo de lesión o daño corporal durante la práctica, asi como los costes en caso de hacer un trabajo de retoque por mi negligencia 
                    en la curacion del tatuaje / piercing. Convengo en pagar cualquier coste por daños y perjuicios en caso de haberlos a la empresa o a
                    cualquier o todas las personas pertenecientes en <b>LA DIVA TATTOO</b>
                </p>

                <h2 className='h2'>CONSENTIMIENTO: </h2>

                <p>
                Habiendo leido esto, acepto que he sido debidamente informado oralmente y por escrito, asi como haber recibido las 
                instrucciones necesarios (orales y escritas) para el adecuado cuidado de mi piercing / tatuaje y que soy plenamente 
                responsable del mismo.
                </p>

                <p>
                    En caso de ser una frase, nombre o lettering: <br />

                    Verifico y apruebo que tanto la tipografía, la numeración y el significado son correctos. <br />
                    Doy el consentimiento a los artisas de <b>LA DIVA TATTOO</b> para publicar los trabajos en redes sociales y otros medios. 
                </p>

                <p>
                    No se devuelve el dinero una vez hecho el tatuaje. 
                </p>

                <p>
                    EL TATUAJE O MICROPIGMENTACIÓN es una técnica que, puesto que 
                    utiliza un material extraño al organismo, presenta ciertos riesgos o posibilidad de 
                    complicaciones que se deben conocer antes de tatuarse:
                </p>

                <p>
                    1.- Infección local. / 1 Local infection <br />
                    Es más frecuente si se tiene una enfermedad crónica o se toman medicamentos que disminuyen la inmunidad <br/> 
                    (this is more frequent if you have a chronic condition or you take medication that lowers the strength of your immune system)  
                </p>

                <p>
                    2.- Infección general. / 2 general infection <br/>
                    Hepatitis (VHB, VHC), sífilis, VIH (SIDA), tétanos. Pueden ser transmitidas por el instrumental.<br/> 
                    (they can be transmitted by the instrument)
                </p>

                <p>
                    3.- Alergia. / 3 allergies <br/>
                    Dermatitis de contacto / contact dermatitis <br/>
                    Reacciones cutáneas / cutaneous reactions
                </p>

                <p>
                    
                    4.- Hemorragia. / 4 hemorrhage <br/> 
                    Hay órganos con una rica circulación sanguínea, que pueden presentar sangrado, en ocasiones importante. <br/> 
                    (there are organs with a good blood flow that can present bleeding in occasion important)

                </p>

                <p>
                    5.- Cicatrices patológicas. / 5 scarring <br/>
                    Hay pieles con una tendencia a cicatrizar de modo sobre elevado y estéticamente indeseable denominados queloides. 
                    En casos extremos pueden derivar en cáncer.

                    El cliente manifiesta que ha comprendido las explicaciones que se le han facilitado en un lenguaje claro y sencillo,
                    y el profesional que le ha atendido le ha permitido realizar todas las observaciones y le ha 
                    aclarado todas las dudas que le ha planteado, haciéndose la advertencia de que en caso de 
                    complicaciones consulte con su médico.

                    El cliente manifiesta igualmente que ha sido informado del carácter temporal o permanente del tatuaje o micropigmentación 
                    a realizar, así como de los cuidados posteriores que requiere hasta su cicatrización.

                    Por ello manifiesto que estoy satisfecho con la información recibida y que comprendo el alcance y
                    los riesgos de la realización de un TATUAJE O MICROPIGMENTACIÓN.
                </p>
                
        </div>
      </div>
    </div>
  );
};

export default ModalTerminos;




