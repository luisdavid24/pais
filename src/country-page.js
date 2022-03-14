import React,{useState ,useEffect} from 'react'
import styled from 'styled-components'
import Wrapper from './wrapper'
import { useSelector } from 'react-redux'
import CountrySelected from './country-selected'

const CountryPageStyled =styled.div`
    .back{
        background:var(--white);
        box-shadow:0 0 10px rgba(0,0,0,.3);
        padding: .7em 2.2em;
        border-radius:5px;
        border:none;
        cursor:pointer;
        margin-top:1em;
        margin-left:15px;
        color:var(--black);
        i{
            margin-right: 5px;
        }
    }
    @media screen and (min-width:1024px){
        . .back{
            margin-top:3em;
        }
    }
`
function CountryPage({match,history}){
    let DBcountry = useSelector(state => state.countryList.find(item => item.alpha2Code === match.params.id))
    const [country, setCountry] = useState(DBcountry)
    useEffect(()=>{
        if(!country){
            fetch(`https://restcountries.eu/rest/v2/name/${match.params.id}`)
            .then((response)=>response.json())
            .then((data)=>{
                setCountry(data[0])
            })
        }
    },[country,match.params.id])

    function handleClick(){
        history.goBack()
    }
    return(
        <CountryPageStyled>
            <button className="back"onClick={handleClick}><i className="fas fa-long-arrow-alt-left"></i>Back</button>
            <Wrapper>
                <CountrySelected {...country}/>
            </Wrapper>
        </CountryPageStyled>
    )
}
export default CountryPage;