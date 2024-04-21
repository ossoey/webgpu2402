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
import  {polygone_upload_data_bndgroup_only_basicsO} from "./polygone_upload_data_bndgroup_only_basicsO.js";
import { polygone_upload_data1} from "./polygone_upload_data1.js";
import { polygone_upload_data_bndgroup_only_basics} from "./polygone_upload_data_bndgroup_only_basics.js";
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
  alignItems : "center"

}}, elementType: "div"  });

 projects.ui.canvas = document.querySelector(`canvas`);
 projects.ui.canvasContext = projects.ui.canvas.getContext("webgpu");

 projects.currentProject; 
 
 projects.paramsIn = {context:projects.ui.canvasContext, canvas: projects.ui.canvas , inputContainer:  projects.ui.inputContainer}
 
 projects.entries = [

  polygone_upload_data_bndgroup_only_basics2(projects.paramsIn),
  polygone_upload_data_bndgroup_only_basics1(projects.paramsIn),
  polygone_upload_data_bndgroup_only_basicsO(projects.paramsIn),
  polygone_upload_data_bndgroup_only_basics(projects.paramsIn),
  polygone_upload_data1(projects.paramsIn),
  
  
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

  projects.ui.entries =  EbkUI.createElementFirstPosition_LabeledSelect (  {
 
    options: projectOptions,
    container: projects.ui.menu,
     
    labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Projects    ' },
    selectProperties: { id: 'projectList', style: { width: '300px', padding: '3px' } }
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