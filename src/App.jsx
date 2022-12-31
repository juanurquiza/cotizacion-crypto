import { useState, useEffect} from 'react'
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Resultado from './components/Resultado'
  const Contenedor = styled.div`
  max-width: 900px; margin:0 auto;
  width:90%;
  @media (min-width: 992px ){
    display:grid;
    grid-template-columns:repeat(2,1fr);
    column-gap:2rem;
  }
`
  const Imagen = styled.img`
  max-width: 400px;
  width:80%;  margin:100px auto 0 auto; 
  display:block;
  `
  const Heading = styled.h1`
    font-family:'lato' , sans-serif;
    color:#fff;
    text-align:center;
    font-weight:700;
    margin-top:80px;
    margin-bottom:50px;
    font-size:34px;
  `

function App() { 

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)
  useEffect(() => { 
    if(Object.keys(monedas).length > 0 ){

      const cotizarCrypto = async () => { 
        setCargando(true) 

        const {moneda, crypto} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[crypto][moneda])
        setCargando(false)
      }
      cotizarCrypto()
    }
  }, [monedas])
  
  return (
    <Contenedor>
      <Imagen
      src={imagenCripto}
      alt='img criptos'/>
      <div>
        <Heading>cotiza cripto al instante</Heading>
        <Formulario
        setMonedas={setMonedas}>
        </Formulario>
        {cargando && <Spinner/>}
        { resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>

    </Contenedor>
  )
}

export default App
