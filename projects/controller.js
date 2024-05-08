 //    Copyright (c) 2013-2024 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 import { Ebk} from "../modules/ebika.js";
// import { EbkColors} from "./modules/ebikaColors.js";
 import { EbkUI} from "../modules/ebikaUI.js";
// import { EbkWEBGPU} from "./modules/ebikaWEBGPU.js";
// import { EbkMIDI} from "./modules/ebikaMIDI.js";

import  {polygone_upload_data_bndgroup_only_basics2} from "./polygone_upload_data_bndgroup_only_basics2.js";
import  {polygone_upload_data_bndgroup_only_basics1} from "./polygone_upload_data_bndgroup_only_basics1.js";
import  {polygone_upload_data_bndgroup_only_basics} from "./polygone_upload_data_bndgroup_only_basics.js";

import { squareInGrid} from "./squareInGrid.js";
import { square} from "./square.js";
import { circlesTriangleStripRandomAttributes} from "./circlesTriangleStripRandomAttributes.js";
import { circleTriangleStripRandomAttributes} from "./circleTriangleStripRandomAttributes.js";
import { circleTriangleStrip} from "./circleTriangleStrip.js";
import { triangleGradientColorsAndCoords} from "./triangleGradientColorsAndCoords.js";
import { triangleColoredForeNBackGround} from "./triangleColoredForeNBackGround.js";
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
  alignItems : "center",


}}, elementType: "div"  });

 projects.ui.canvas = document.querySelector(`canvas`);
 projects.ui.canvasContext = projects.ui.canvas.getContext("webgpu");

 projects.currentProject; 
 
 projects.paramsIn = {context:projects.ui.canvasContext, canvas: projects.ui.canvas , inputContainer:  projects.ui.inputContainer}
 
 projects.entries = [

  polygone_upload_data_bndgroup_only_basics2(projects.paramsIn),
  polygone_upload_data_bndgroup_only_basics1(projects.paramsIn),
  polygone_upload_data_bndgroup_only_basics(projects.paramsIn),
  
  squareInGrid(projects.paramsIn),
  square(projects.paramsIn),
  circlesTriangleStripRandomAttributes(projects.paramsIn),
  circleTriangleStripRandomAttributes(projects.paramsIn), 
  circleTriangleStrip(projects.paramsIn), 
  triangleGradientColorsAndCoords(projects.paramsIn), 
  triangleColoredForeNBackGround(projects.paramsIn), 
  triangle(projects.paramsIn )
] ;


projects.ui.titleIni =() => {
 
  EbkUI.editElement({ element:  projects.ui.title,   properties:{textContent:"EBIKA PROJECTS EXPÉRIMENTATIONS", style: {padding: "10px", color: "blue"}}})
} 

projects.ui.entriesIni = () => {

  let projectOptions = [];

  projects.entries.forEach((elt,index)=>{

    projectOptions.push({  functionId: index,  textContent: elt.desc});

  });

  projects.ui.entries =  EbkUI.createElementAppend_LabeledSelect(  {
 
    options: projectOptions,
    container: projects.ui.title,
     
    labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Projects    ' },
    selectProperties: { id: 'projectList', style: { width: '300px', padding: '3px' } }
  });


  projects.ui.menushow = EbkUI.createAndAppendElement({container: projects.ui.title, properties: {textContent : '...'}, elementType: "button"  }    ) 

  projects.ui.fullscreen = EbkUI.createAndAppendElement({container: projects.ui.title, properties: {textContent : '<full>', style: {margin: '4px'}}, elementType: "button"  }    ) 


  projects.ui.save= EbkUI.createAndAppendElement({container: projects.ui.title, properties: {textContent : 'save', style: {margin: '4px'}}, elementType: "button"  }    ) 



  projects.ui.menushow.addEventListener(`click`,(event)=>{

       if ((projects.ui.menu.style.display === "flex")||(projects.ui.menu.style.display === "")) {
          projects.ui.menu.style.display = "none"
       } else {
          projects.ui.menu.style.display = "flex" 
       }
       
    
  });


  projects.ui.fullscreen.addEventListener(`click`,(event)=>{
    if (!document.fullscreenElement) {
      projects.ui.canvas.requestFullscreen().catch(err => {
          console.error('Failed to enter fullscreen mode:', err);
      });
   } else {
      document.exitFullscreen();
  }

  projects.ui.canvas.width = window.innerWidth;
  projects.ui.canvas.height = window.innerHeight;
 
});

  projects.ui.save.addEventListener(`click`,(event)=>{

    let  dataURL = projects.ui.canvas.toDataURL();
    let link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 
 });



   projects.ui.entries.selectElement.addEventListener(`change`,(event)=>{
     
    if (projects.currentProject) {
        projects.currentProject.releaseResources();
    }

    let select = event.target.options[event.target.selectedIndex];
    projects.currentProject = projects.entries[select.functionId];
    projects.entries[select.functionId].run();           
    
   });







   projects.entries[0].run()

   projects.currentProject = projects.entries[0]

}

projects.ui.creation = () => {

   projects.ui.titleIni();
   projects.ui.entriesIni();

}


 let run = () =>{
    
    projects.ui.creation();

}


export {  run };
export default run ; 