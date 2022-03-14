import React,{useState,useEffect} from 'react';
import './App.css'; 
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer';
import ActionList from './action-list';
import Header from './Header';
import CountryPage from './country-page';
import {
  BrowserRouter as Router,
  Route,
  Switch,  
}from 'react-router-dom'


const initialState = {
  countryList: [],
  countryListByName: [],
  coutryFilteredByRegion: [],
  filterByRegion: '',

}

const store = createStore(reducer, initialState)//Estado completo de la aplicacion

function App() {
const [darKMode,setDarkMode]=useState(false);
const [checked,setChecked]=useState(false);
const mainClass = darKMode ? 'is-dark-mode':'is-light-mode'

function changeMedia(mq){
  setDarkMode(mq.matches)
  setChecked(mq.matches)
}
useEffect(()=>{
  const mq=window.matchMedia('(prefers-color-scheme: dark)')
  mq.addListener(changeMedia)
  setDarkMode(mq.matches)
  setChecked(mq.matches)
  return ()=>{
    mq.removeListener(changeMedia)
  }
},[])



  return (
    <main className={mainClass}>
      <Provider store={store}>  
      <Router>
        {/* El Provider permite que todos los elemento anidados puedan usar estado de la aplicacion */}
          <Header setDarkMode={setDarkMode} darKMode={darKMode}/>
          <Switch>
            <Route path="/Country/:id" component={CountryPage}/>
            <Route path="/">
              <ActionList/>
              <CountryList/>
            </Route>
          </Switch>
      </Router>
      </Provider>

    </main>
  );
}

export default App;