 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
import { Ebk} from ".modules/ebika.js";
import { EbkColors} from ".modules/ebikaColors.js";
import { EbkUI} from ".modules/ebikaUI.js";
import { EbkWEBGPU} from ".modules/ebikaWEBGPU.js";
import { EbkMIDI} from ".modules/ebikaMIDI.js";

import { trianglePrj} from "./trianglePrj.js";


let projects = {};

projects.ui = {};

projects.currentProject; 
 
 projects.entries = [
    trianglePrj
] ;



projects.createUIInputsContainer = () =>{

  let uiInputsContainer = document.createElement(`div`);

  uiInputsContainer.setAttribute(`id`,`uiInputsContainer`);
  uiInputsContainer.style.display = "flex";
  uiInputsContainer.style.flexDirection ="row";
  uiInputsContainer.style.flexWrap = "nowrap";
  uiInputsContainer.style.justifyContent = "flex-start";
  uiInputsContainer.style.alignItems = "center";
  
  document.querySelector(`#menu`).appendChild(uiInputsContainer);
}


projects.removeUIInputsContainer = () =>{

 let elt = document.querySelector(`#uiInputsContainer`);
 if (elt) elt.remove();
 
}


projects.run = () =>{


  
  let selectContainer = document.createElement(`div`);


  projects.funcs.createUIInputsContainer();

   let projectOptions =[];

     projects.entries.forEach((elt,index)=>{


      projectOptions.push({  functionId: index,  textContent: elt.entry().desc }) 


  });


 

  projects.ui.list =   EbkUI.createElement_LabeledSelect (  {
 
    options: projectOptions,
      container: document.querySelector(`#menu`),
     
      labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Projects    ' },
      selectProperties: { id: 'projectList', style: { width: '300px', padding: '3px' } }
  });
  

  projects.ui.elts.list.selectElement.addEventListener(`change`,(event)=>{
      projects.funcs.removeUIInputsContainer();
      let select = event.target.options[event.target.selectedIndex];
      projects.entries[select.functionId].entry().func();           
      
  });

  projects.funcs.removeUIInputsContainer(); 
  projects.entries[0].entry().func();

}




export { projects};
export default projects; 