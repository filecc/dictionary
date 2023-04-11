import { useState, useEffect } from "react";
import * as style from "./toggle.module.css";



export default function Toggle(props) {

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
   
    function changeColor(){
      if(matchMedia.matches){
      props.setDarkMode(!props.darkMode);
    } else {
      props.setDarkMode(props.darkMode);
    }
    }
    darkModePreference.addEventListener('change', changeColor);
    
    
  });

  return (
    <>
      <div onClick={() => props.setDarkMode(!props.darkMode)} className={!props.darkMode ? style["dns-container"] + ' shadow-sm' : (style["dns-container-on"] + ' shadow-sm ' + style['dns-container'])}>
        <span  
        className={!props.darkMode ? style["dns-button"] : (style["dns-on"] + ' ' + style['dns-button'])}>
          <span className={style["dns-particle"] + " " + style["one"]}></span>
          <span
            className={style["dns-particle"] + " " + style["second"]}
          ></span>
          <span className={style["dns-particle"] + " " + style["third"]}></span>
        </span>
      </div>
    </>
  );
}
