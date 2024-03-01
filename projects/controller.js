 //    Copyright (c) 2013-2024 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 import { Ebk} from "../modules/ebika.js";
// import { EbkColors} from "./modules/ebikaColors.js";
 import { EbkUI} from "../modules/ebikaUI.js";
// import { EbkWEBGPU} from "./modules/ebikaWEBGPU.js";
// import { EbkMIDI} from "./modules/ebikaMIDI.js";


import { triangle} from "./trianglePrj.js";


let projects = {};

 projects.ui = {};

 projects.ui.menu = document.querySelector(`#menu`);
 projects.ui.title = document.querySelector(`#title`);

 projects.ui.inputContainer = EbkUI.createAndAppendElement({container:  projects.ui.menu,properties:{  style: {

  display : "flex", 
  flexDirection :"row", 
  flexWrap : "nowrap" , 
  justifyContent : "flex-start", 
  alignItems : "center"

}}, elementType: "div"  });

 projects.ui.canvas = document.querySelector(`canvas`);
 projects.ui.canvasContext = projects.ui.canvas.getContext("webgpu");

 projects.currentProject; 
 
 projects.paramsIn = {context:projects.ui.canvasContext, inputContainer:  projects.ui.inputContainer}
 
 projects.entries = [
  triangle(projects.paramsIn ), 
  triangle(projects.paramsIn )
] ;


projects.ui.titleIni =() => {
 
  EbkUI.editElement({ element:  projects.ui.title,   properties:{textContent:"EBIKA PROJECTS EXPÉRIMENTATIONS", style: {padding: "10px", color: "blue"}}})
} 

projects.ui.entriesIni = () => {

  let projectOptions =[];

  projects.entries.forEach((elt,index)=>{

    projectOptions.push({  functionId: index,  textContent: elt.desc});

  });

  projects.ui.entries =  EbkUI.createElementFirstPosition_LabeledSelect (  {
 
    options: projectOptions,
    container: projects.ui.menu,
     
    labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Projects    ' },
    selectProperties: { id: 'projectList', style: { width: '300px', padding: '3px' } }
   });


   projects.ui.entries.selectElement.addEventListener(`change`,(event)=>{
    let select = event.target.options[event.target.selectedIndex];
    projects.entries[select.functionId].run();           
    
   });

   projects.entries[0].run()

}

projects.ui.creation = () => {

   projects.ui.titleIni();
   projects.ui.entriesIni();

}


 let run = () =>{
    
    projects.ui.creation();



  
  // let selectContainer = document.createElement(`div`);


  // projects.funcs.createUIInputsContainer();

  //  let projectOptions =[];

  //    projects.entries.forEach((elt,index)=>{


  //     projectOptions.push({  functionId: index,  textContent: elt.entry().desc }) 


  // });


 

  // projects.ui.list =   EbkUI.createElement_LabeledSelect (  {
 
  //   options: projectOptions,
  //     container: document.querySelector(`#menu`),
     
  //     labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Projects    ' },
  //     selectProperties: { id: 'projectList', style: { width: '300px', padding: '3px' } }
  // });
  

  // projects.ui.elts.list.selectElement.addEventListener(`change`,(event)=>{
  //     projects.funcs.removeUIInputsContainer();
  //     let select = event.target.options[event.target.selectedIndex];
  //     projects.entries[select.functionId].entry().func();           
      
  // });

  // projects.funcs.removeUIInputsContainer(); 
  // projects.entries[0].entry().func();

}




export {  run };
export default run ; 