import {useState,useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectModenas from '../Hooks/useSelectModenas'
import { monedas } from '../data/monedas'
const Formulario = ({setMonedas}) => {
    
    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)
    const [moneda, SelectMonedas ] = useSelectModenas('elige tu moneda', monedas)
    const [crypto, SelectCrypto ] = useSelectModenas('elige tu CryptoMoneda', cryptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            console.log(resultado)
            const arrayCrypto =
            resultado.Data.map( 
                crypto => {
                    const objeto = {
                        id:crypto.CoinInfo.Name,
                        nombre: crypto.CoinInfo.FullName
                    }
                    return objeto
                }
            )
            setCryptos(arrayCrypto)
        }
        consultarAPI()
    },[])
 
    const InputSubmit = styled.input`
        background-color:#9497ff;
        border:none;
        width:100%;
        padding:10px;
        color:#fff;
        font-weight:700;
        text-transform:uppercase;
        font-size:20px;
        border-radius:5px;
        margin-top:10px;
        &:hover{
            background-color:#7a7dfe;

        }
    `
    const handleSubmit = e =>{
        e.preventDefault()
        if([moneda,crypto].includes('')){
            console.log('error')
            setError(true)
            return
        }
        setError(false)
        setMonedas({moneda,crypto})
    }
  return (
    <>
        {error && <Error> todos los campos son obligatorios</Error>} 
        <form
        onSubmit={handleSubmit}
        >
            <SelectMonedas></SelectMonedas> 
            <SelectCrypto></SelectCrypto>
            <InputSubmit type="submit" value="cotizar" />
        </form>
    </>
  )
}

export default Formulario