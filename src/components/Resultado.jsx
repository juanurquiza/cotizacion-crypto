import {useState} from 'react'
import styled from '@emotion/styled'

const Contenedor = styled.div`
    color:#fff;
    font-family:'Lato' sans-serif;
    display:flex;
    align-items:center;
    gap:3rem;
`
const Texto = styled.p`

`
const Precio = styled.p`
    font-size:24px;
    span{
        font-weight:700
    }
`
const Imagen = styled.img`
display:block;
    width:150px;

`
const Resultado = ({resultado}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado
  return (
    <Contenedor>
        <Imagen src={`https://www.cryptocompare.com/${IMAGEURL}`} alt="" />
        <div>
            <Precio>el precio es: <span>{PRICE}</span></Precio>
            <Texto>Precio mas alto del dia: <span>{HIGHDAY}</span></Texto>
            <Texto>Precio mas bajo del dia: <span>{LOWDAY}</span></Texto>
            <Texto>Variacion ultimas 24 hs: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Ultima actualizacion: <span>{LASTUPDATE}</span></Texto> 
        </div>
    </Contenedor>
  )
}

export default Resultado