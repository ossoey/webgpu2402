
import { Ebk} from "../modules/ebika.js";

import { EbkUI} from "../modules/ebikaUI.js";
import { EbkColors} from "../modules/ebikaColors.js";
import { EbkGeometry} from "../modules/ebikaGeometry.js";
import { EbkEls} from "../modules/ebkelts.js";




 const   polygone_upload_data_bndgroup_only_basics2 = (params = {context:{}}) => {
        let ops = {};
    
        
        ops.desc = "polygon, upload data bindgroup only, basics2";
        
        // Préparation des données
        ops.ui = {};
        ops.env = {};
        ops.env.adpter;
        ops.env.device;
       
        ops.env.shaderCode;
        ops.env.shaderModule;
        ops.env.pipeline;    
        ops.env.canvas = params.canvas;
        ops.env.context = params.context;
        ops.env.contextFomat;
        ops.objects = {};
         
    
        // Création des ui 
        ops.createUI = () =>{

                  

          let frm = EbkEls.createFraming();
       
          frm.locate();

                let prevWidth = window.innerWidth;

                function adjustGridLayout(gridContainer ) {
                
                    
                    // Check if screen width is less than or equal to 768px
                    if (window.innerWidth < 600) {
                    // Set grid template columns to two columns
                    gridContainer.style['grid-template-columns'] =  'repeat(1, 1fr)' ;
                    } else if (window.innerWidth > 600) {
                    // Set grid template columns to four columns
                    
                    gridContainer.style['grid-template-columns'] =  'minmax(23px, auto) repeat(2, 1fr)' ;
                    }


                    
                }
        
                params.inputContainer.innerHTML = "" 
        
                EbkUI.editElement({ element:  params.inputContainer,   properties:{  style: {
        
                    display : "flex", 
                    flexDirection :"row", 
                    flexWrap : "nowrap" , 
                    justifyContent : "flex-start", 
                    alignItems : "center",
                    padding: '10px 0px 0px 30px'
                }}});


                ops.ui.objectElements = EbkUI.createElementsInContainer({ 
                    container:{container: params.inputContainer,
                        properties: { 
                        style: { color: 'blue', display: "grid",  "font-size":'11px',
                        'grid-template-columns': 'minmax(23px, auto) repeat(2, 1fr)' , gap: '3px',     
                    
                    },     textContent : ' ' }, elementType: "div"  } ,
                    
            
                elements: [
                {eltName: '00', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
                {eltName: '01', params: {properties: {textContent : 'Object'}, elementType: "div"  } } , 
                {eltName: '02', params: {properties: {textContent : ''}, elementType: "div"  } } , 

                {eltName: '10', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
                {eltName: '11', params: {properties: {textContent : 'Start'}, elementType: "div"  } } , 
                {eltName: '12', params: {properties: {textContent : 'End'}, elementType: "div"  } } , 

                {eltName: '10_0', params: {properties: {textContent : 'bg color',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: 'bgColor', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "input"  } } , 
                {eltName: '12_0', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "div"  }  } , 

                {eltName: '20', params: {properties: {textContent : 'x',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: 'positionXStart', params: {properties: {type : "range",  min:"-1", max:"1", value:"0", step:"0.01",   style: {width:"50px"} }, elementType: "input"  } } , 
                {eltName: 'positionXEnd', params: {properties: {type : "range", min:"-1", max:"1", value:"0", step:"0.01", style: {width:"50px"} }, elementType: "input"  }  } , 

                {eltName: '30', params: {properties: {textContent : 'y',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: 'positionYStart', params: {properties: {type : "range" ,  min:"-1", max:"1", value:"0", step:"0.01", style: {width:"50px"} }, elementType: "input"  } } , 
                {eltName: 'positionYEnd', params: {properties: {type : "range" ,  min:"-1", max:"1", value:"0", step:"0.01", style: {width:"50px"} }, elementType: "input"  }  } , 

                {eltName: '40', params: {properties: {textContent : 'size',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: 'sizeStart', params: {properties: {type : "range" ,  min:"0.01", max:"0.4", value:"0", step:"0.01", style: {width:"50px"} }, elementType: "input"  } } , 
                {eltName: 'sizeEnd', params: {properties: {type : "range",  min:"0.01", max:"0.4", value:"0", step:"0.01", style: {width:"50px"} }, elementType: "input"  }  } , 

                {eltName: '50', params: {properties: {textContent : 'count',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: 'count', params: {properties: {type : "range",  min:"2", max:"10000", value:"1", step:"1", style: {width:"100px"} }, elementType: "input"  } } , 
                {eltName: '52', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

                {eltName: '60', params: {properties: {textContent : 'phase',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: 'phaseStart', params: {properties: {type : "range",  min:"0", max:"6.28", value:"0", step:"0.01",  style: {width:"50px"} }, elementType: "input"  } } , 
                {eltName: 'phaseEnd', params: {properties: {type : "range",  min:"0", max:"6.28", value:"0", step:"0.01",  style: {width:"50px"} }, elementType: "input"  }  } , 
            
                
                {eltName: '70', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: '71', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
                {eltName: '72', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

                {eltName: '80', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: '81', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
                {eltName: '82', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 
            
                {eltName: '90', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: '91', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
                {eltName: '92', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

            
            ]   }    ) ;


            ops.ui.objectElements.bgColor.value = EbkColors.rgbToHexa({color:[125, 125, 125] });
            //ops.ui.objectElements.colorEnd.value = EbkColors.rgbToHexa({color:[255, 200, 50] });

            
   


            ops.ui.objectElements.positionXStart.value = -1;
            ops.ui.objectElements.positionXEnd.value = 1;

            ops.ui.objectElements.positionYStart.value = -1;
            ops.ui.objectElements.positionYEnd.value = 1;

            ops.ui.objectElements.sizeStart.value = 0.01;
            ops.ui.objectElements.sizeEnd.value = 0.4;

            ops.ui.objectElements.count.value = 10;
            
            ops.ui.objectElements.phaseStart.value = 0;
            ops.ui.objectElements.phaseEnd.value = 6.28;

            ops.ui.objectElements.bgColor.addEventListener('change', ()=>{ ops.edit(); });

            ops.ui.objectElements.count.addEventListener('change', ()=>{ ops.edit(); });
               
            ops.ui.objectElements.positionXStart.addEventListener('change', ()=>{ ops.edit();});
            
            ops.ui.objectElements.positionXEnd.addEventListener('change', ()=>{ops.edit(); });
   
            ops.ui.objectElements.positionYStart.addEventListener('change', ()=>{ ops.edit();});
            
            ops.ui.objectElements.positionYEnd.addEventListener('change', ()=>{ops.edit(); });
   

            ops.ui.objectElements.sizeStart.addEventListener('change', ()=>{ops.edit(); });
            ops.ui.objectElements.sizeEnd.addEventListener('change', ()=>{ops.edit(); });



            let vertexElementsSpace = EbkUI.createElementsInContainer({ 
                container:{container: params.inputContainer,
                    properties: { 
                    style: { color: 'blue', display: "grid",  "font-size":'11px',
                    'grid-template-columns': 'minmax(23px, auto) repeat(2, 1fr)' , gap: '3px',     
                
                },     textContent : ' ' }, elementType: "div"  } ,
                
        
            elements: [
            {eltName: '00', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
            {eltName: '01', params: {properties: {textContent : ' '}, elementType: "div"  } } , 
            {eltName: '02', params: {properties: {textContent : ''}, elementType: "div"  } } , 

        
        ]   }    ) ;


        ops.ui.vertexElements = EbkUI.createElementsInContainer({ 
            container:{container: params.inputContainer,
                properties: { 
                style: { color: 'blue', display: "grid",  "font-size":'11px',
                'grid-template-columns': 'minmax(45px, auto) repeat(2, 1fr)' , gap: '3px',     
            
            },     textContent : ' ' }, elementType: "div"  } ,
            
    
        elements: [
        {eltName: '00', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
        {eltName: '01', params: {properties: {textContent : 'Vertex'}, elementType: "div"  } } , 
        {eltName: '02', params: {properties: {textContent : ''}, elementType: "div"  } } , 

        {eltName: '10', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
        {eltName: '11', params: {properties: {textContent : 'Start'}, elementType: "div"  } } , 
        {eltName: '12', params: {properties: {textContent : 'End'}, elementType: "div"  } } , 

        {eltName: '20', params: {properties: {textContent : 'color',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'colorStart', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'colorEnd', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "input"  }  } , 

        {eltName: '30', params: {properties: {textContent : 'roughness',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'roughnessStart', params: {properties: {type : "range" ,  min:"3", max:"16", value:"0", step:"1", style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'roughnessEnd', params: {properties: {type : "range",  min:"3", max:"16", value:"0", step:"1",  style: {width:"50px"} }, elementType: "input"  }  } , 

        {eltName: '40', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '41', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '42', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

        {eltName: '50', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '51', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '52', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 


        {eltName: '60', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '61', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '62', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

        
        {eltName: '70', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '71', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '72', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 


        {eltName: '80', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '81', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '82', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 
    
        {eltName: '90', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '91', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '92', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

        {eltName: '100', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '101', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '102', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

        {eltName: '110', params: {properties: {textContent : '.',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: '111', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  } } , 
        {eltName: '112', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 

        ]   }    ) ;
        

        ops.ui.vertexElements.colorStart.value = EbkColors.rgbToHexa({color:[255, 255, 255] });
        ops.ui.vertexElements.colorEnd.value = EbkColors.rgbToHexa({color:[50, 75, 255] });
        ops.ui.vertexElements.roughnessStart.value = 3;  
        ops.ui.vertexElements.roughnessEnd.value = 16;  

        
        ops.ui.vertexElements.colorStart.addEventListener('change', ()=>{ ops.edit(); });
        ops.ui.vertexElements.colorEnd.addEventListener('change', ()=>{ ops.edit(); });

        ops.ui.vertexElements.roughnessStart.addEventListener('change', ()=>{ ops.edit(); });
        ops.ui.vertexElements.roughnessEnd.addEventListener('change', ()=>{ ops.edit(); });


        let vertexElementsSpace1 = EbkUI.createElementsInContainer({ 
            container:{container: params.inputContainer,
                properties: { 
                style: { color: 'blue', display: "grid",  "font-size":'11px',
                'grid-template-columns': 'minmax(23px, auto) repeat(2, 1fr)' , gap: '3px',     
            
            },     textContent : ' ' }, elementType: "div"  } ,
            
    
        elements: [
        {eltName: '00', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
        {eltName: '01', params: {properties: {textContent : ' '}, elementType: "div"  } } , 
        {eltName: '02', params: {properties: {textContent : ''}, elementType: "div"  } } , 

    
        ]   }    ) ;


        ops.ui.lightElements = EbkUI.createElementsInContainer({ 
            container:{container: params.inputContainer,
                properties: { 
                style: { color: 'blue', display: "grid",  "font-size":'11px',
                'grid-template-columns': 'minmax(60px, auto) repeat(2, 1fr)' , gap: '3px',     
            
            },     textContent : ' ' }, elementType: "div"  } ,
            
    
        elements: [
        {eltName: '00', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
        {eltName: '01', params: {properties: {textContent : 'Light'}, elementType: "div"  } } , 
        {eltName: '02', params: {properties: {textContent : ''}, elementType: "div"  } } , 

        {eltName: '10', params: {properties: {textContent : ' '}, elementType: "div"  } }  , 
        {eltName: '11', params: {properties: {textContent : 'Start'}, elementType: "div"  } } , 
        {eltName: '12', params: {properties: {textContent : 'End'}, elementType: "div"  } } , 

        {eltName: '20', params: {properties: {textContent : 'color',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'colorStart', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'colorEnd', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "input"  }  } , 

        {eltName: '30', params: {properties: {textContent : 'x',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'positionXStart', params: {properties: {type : "range" ,  min:"-1", max:"1", value:"0", step:"0.01",  style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'positionXEnd', params: {properties: {type : "range" ,  min:"-1", max:"1", value:"0", step:"0.01",  style: {width:"50px"} }, elementType: "input"  }  } , 

        {eltName: '40', params: {properties: {textContent : 'y',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'positionYStart', params: {properties: {type : "range" , min:"-1", max:"1", value:"0", step:"0.01", style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'positionYEnd', params: {properties: {type : "range", min:"-1", max:"1", value:"0", step:"0.01", style: {width:"50px"} }, elementType: "input"  }  } , 

        {eltName: '50', params: {properties: {textContent : 'type',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'typeStart', params: {properties: {type : "range" , min:"0", max:"4", value:"1", step:"1",  style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'typeEnd', params: {properties: {type : "range", min:"0", max:"4", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  }  } , 

        {eltName: '60', params: {properties: {textContent : 'composition',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'compositionStart', params: {properties: {type : "range", min:"1", max:"4", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'compositionEnd', params: {properties: {type : "range", min:"1", max:"4", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  }  } , 


        {eltName: '70', params: {properties: {textContent : 'intensity',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'intensityStart', params: {properties: {type : "range", min:"1", max:"100", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'intensityEnd', params: {properties: {type : "range", min:"1", max:"100", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  }  } , 


        {eltName: '80', params: {properties: {textContent : 'spectre reduicer',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'spectreReduicerStart', params: {properties: {type : "range", min:"0", max:"10000000000", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'spectreReduicerEnd', params: {properties: {type : "range", min:"0", max:"10000000000", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  }  } , 

        {eltName: '90', params: {properties: {textContent : 'count',  style: {width:"10px"}}, elementType: "div"  } }  , 
        {eltName: 'count', params: {properties: {type : "range", min:"1", max:"100", value:"1", step:"1",  style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: '92', params: {properties: {type : "range", style: {width:"50px"} }, elementType: "div"  }  } , 
    
        ]   }    ) ;


        ops.ui.lightElements.colorStart.value = EbkColors.rgbToHexa({color:[0, 100, 200] });
        ops.ui.lightElements.colorEnd.value = EbkColors.rgbToHexa({color:[125, 130, 140] });

        ops.ui.lightElements.positionXStart.value = -1;
        ops.ui.lightElements.positionXEnd.value = 1;

        ops.ui.lightElements.positionYStart.value = -1;
        ops.ui.lightElements.positionYEnd.value = 1;

        ops.ui.lightElements.typeStart.value = 1;
        ops.ui.lightElements.typeEnd.value = 4;

        ops.ui.lightElements.compositionStart.value = 1;
        ops.ui.lightElements.compositionEnd.value = 4;

        
        ops.ui.lightElements.intensityStart.value = 1;
        ops.ui.lightElements.intensityEnd.value = 100;

        ops.ui.lightElements.spectreReduicerStart.value = 0;
        ops.ui.lightElements.spectreReduicerEnd.value = 10000000000;

        ops.ui.lightElements.count.value = 3;


        ops.ui.lightElements.colorStart.addEventListener('change', ()=>{ ops.edit(); });

        ops.ui.lightElements.positionXStart.addEventListener('change', ()=>{ ops.edit(); });
        ops.ui.lightElements.positionXEnd.addEventListener('change', ()=>{ ops.edit(); });

        ops.ui.lightElements.positionYStart.addEventListener('change', ()=>{ ops.edit(); });
        ops.ui.lightElements.positionYEnd.addEventListener('change', ()=>{ ops.edit(); });

        ops.ui.lightElements.typeStart.addEventListener('change', ()=>{ ops.edit(); }); 

        ops.ui.lightElements.typeEnd.addEventListener('change', ()=>{ ops.edit(); }); 

        ops.ui.lightElements.compositionStart.addEventListener('change', ()=>{ ops.edit(); }); 
        ops.ui.lightElements.compositionEnd.addEventListener('change', ()=>{ ops.edit(); }); 

        ops.ui.lightElements.intensityStart.addEventListener('change', ()=>{ ops.edit(); }); 
        ops.ui.lightElements.intensityEnd.addEventListener('change', ()=>{ ops.edit(); }); 

        ops.ui.lightElements.spectreReduicerStart.addEventListener('change', ()=>{ ops.edit(); }); 
        ops.ui.lightElements.spectreReduicerEnd.addEventListener('change', ()=>{ ops.edit(); }); 


        //   window.addEventListener('resize', adjustGridLayout.bind(null,objectElements.container));


    
       }
        
    
        // Initialiser les structures de données. 
        ops.iniDataStructures = () => {

            let color1Nlzd = EbkColors.hexToRGBNrmzd ( {hexaColor: ops.ui.vertexElements.colorStart.value} );
            let color2Nlzd = EbkColors.hexToRGBNrmzd ( {hexaColor: ops.ui.vertexElements.colorEnd.value} );

 
    

            ops.objects.stor = {};
            ops.objects.geometry = {};
    
            ops.objects.geometry.polygon = new   Ebk.Geometry.PolygonVtxUindexed ({beltVtxCount:Ebk.Rand.iRanges({
                                                         ranges:[[Number(ops.ui.vertexElements.roughnessStart.value), Number(ops.ui.vertexElements.roughnessEnd.value)]], 
                                                         clamps:[[0,1]]}),
                                                         sizes: [Number(ops.ui.objectElements.sizeStart.value), Number(ops.ui.objectElements.sizeEnd.value)], 
                                                            instanceCount: ops.ui.objectElements.count.value,
                                                 colors: {start: [color1Nlzd[0], color1Nlzd[1], color1Nlzd[2]] ,
                                                         end: [color2Nlzd[0], color2Nlzd[1], color2Nlzd[2]]}, 
                                                 offsets: {width: [Number(ops.ui.objectElements.positionXStart.value),  Number(ops.ui.objectElements.positionXEnd.value) ],
                                                     height: [Number(ops.ui.objectElements.positionYStart.value), Number(ops.ui.objectElements.positionYEnd.value) ]  }});



            ops.objects.geometry.polygon.create_buffersData({phase: -0.063});
            ops.objects.vtxCount = ops.objects.geometry.polygon.vtxCount();
            ops.objects.count = ops.objects.geometry.polygon.instanceCount();
            

            ops.objects.stor.coords = {};
            ops.objects.stor.colors = {};
            ops.objects.stor.offsets = {};
            ops.objects.stor.lightcoords = {};
            ops.objects.stor.lightcolors = {};

            ops.objects.stor.sizes = {};

            
            ops.objects.stor.lightparams = {};


            ops.objects.stor.coords.data =  ops.objects.geometry.polygon.buffersData.coords;
            ops.objects.stor.colors.data =  ops.objects.geometry.polygon.buffersData.colors;
            ops.objects.stor.offsets.data = ops.objects.geometry.polygon.buffersData.offsets; 
            ops.objects.stor.sizes.data = ops.objects.geometry.polygon.buffersData.sizes;

            ops.objects.stor.lightparams.array = [Number(ops.ui.lightElements.typeStart.value),
                Number(ops.ui.lightElements.compositionStart.value),
                Number(ops.ui.lightElements.intensityStart.value),
                Number(ops.ui.lightElements.spectreReduicerStart.value)
       
               ];

            ops.objects.stor.lightparams.data = new Float32Array(ops.objects.stor.lightparams.array);

            let lightColor = EbkColors.hexToRGBNrmzd ( {hexaColor:  ops.ui.lightElements.colorStart.value} );

        
            ops.objects.stor.lightcoords.data = new Float32Array([
                
                Ebk.Rand.iRanges({
                    ranges:[[Number( ops.ui.lightElements.positionXStart.value), Number(ops.ui.lightElements.positionXEnd.value)]], 
                    clamps:[[0,1]]}),
                
                    Ebk.Rand.iRanges({
                        ranges:[[Number(ops.ui.lightElements.positionYStart.value), Number(ops.ui.lightElements.positionYEnd.value)]], 
                        clamps:[[0,1]]})]);


            ops.objects.stor.lightcolors.data = new Float32Array([lightColor[0], lightColor[1],  lightColor[2]]);
            
              
            // Make ui fot data below. 
            // edgeRoughness : [3, 12], -> slider
            // instanceCount : [3, 12], -> slider
            // vertex info(coords, colors), start to end, 
            // instance info(offset, colors, size, phase), start to end,
            // light(positon, color, type[1, n], composition(1..4), intensity, spectre), 

            //Object and vertex    
           



    

        }
    
    
        // initialiser les données 
        ops.iniData = () => {
            ops.env.shaderCode = Ebk.Matrix.shaderUtils +` ` 
                                + Ebk.Colors.shaderUtils + ` 



               @group(0) @binding(0) var <storage> coords: array<vec2f>;
               @group(0) @binding(1) var <storage> colors: array<vec3f>;
               @group(0) @binding(2) var <storage> offsets: array<vec2f>;
               @group(0) @binding(3) var <storage> lightcoords: vec2f;
               @group(0) @binding(4) var <storage> lightcolors: vec3f;

               @group(0) @binding(5) var <storage> sizes: array<f32>;
               @group(0) @binding(6) var <storage> lightparams: array<f32>;

               struct VertexTransfer {

                 @builtin(position) pos : vec4f, 
                 @location(0) color: vec3f, 
               

               }

   

               @vertex fn vs(@builtin(instance_index) ii : u32, @builtin(vertex_index) vi : u32)-> VertexTransfer {
    
                var output : VertexTransfer;
                
                var vxcoord =  sizes[ii]*coords[vi] + offsets[ii];

                output.pos = vec4f( vxcoord  ,0, 1);

                var melange: vec3f; 
                const arraylength = 5;
                var ensemble: array<LightDiffusion, arraylength>;


                var ld1: LightDiffusion;
                ld1.lightType = u32(lightparams[0]);
                ld1.blendOption = u32(lightparams[1]);
                ld1.lightCoords = lightcoords;
                ld1.lightColor = lightcolors;
                ld1.lightIntensity = lightparams[2];
                ld1.lightSpectre = lightparams[3];
                ld1.vxCoords = vxcoord;
                ld1.vxColor = colors[vi];


                var ld2: LightDiffusion;
                ld2.lightType = u32(lightparams[0]);
                ld2.blendOption = u32(lightparams[1]);
                ld2.lightCoords = vec2f(0.0,0.75);
                ld2.lightColor = vec3f(0.0,1.0,0);
                ld2.lightIntensity = lightparams[2];
                ld2.lightSpectre = lightparams[3];
                ld2.vxCoords = vxcoord;
                

                var ld3: LightDiffusion;
                ld3.lightType = u32(lightparams[0]);
                ld3.blendOption = u32(lightparams[1]);
                ld3.lightCoords = vec2f(0.0,-0.75);
                ld3.lightColor = vec3f(1.0,1.0,0);
                ld3.lightIntensity = lightparams[2];
                ld3.lightSpectre = lightparams[3];
                ld3.vxCoords = vxcoord;
                
                
                var ld4: LightDiffusion;
                ld4.lightType = u32(lightparams[0]);
                ld4.blendOption = u32(lightparams[1]);
                ld4.lightCoords = vec2f(0.75, 0);
                ld4.lightColor = vec3f(0.0,0.0,1.0);
                ld4.lightIntensity = lightparams[2];
                ld4.lightSpectre = lightparams[3];
                ld4.vxCoords = vxcoord;


                var ld5: LightDiffusion;
                ld5.lightType = u32(lightparams[0]);
                ld5.blendOption = u32(lightparams[1]);
                ld5.lightCoords = vec2f(-0.75, 0);
                ld5.lightColor = vec3f(1.0,0.0,0.0);
                ld5.lightIntensity = lightparams[2];
                ld5.lightSpectre = lightparams[3];
                ld5.vxCoords = vxcoord;
     
                ensemble[0] = ld1;
                ensemble[1] = ld2;
                ensemble[2] = ld3;
                ensemble[3] = ld4;
                ensemble[4] = ld5;

                melange = applyLightOnVertex(ensemble[0]);
                for (var i = 1; i < arraylength ; i++) {

                    ensemble[i].vxColor = melange;
                    melange = applyLightOnVertex( ensemble[i]);

                }

                output.color =  melange;
                return output; 

             }   
   

             @fragment fn fs(@location(0) color : vec3f) -> @location(0) vec4f {

                 return vec4f(color, 1); 
             }

        
            
            ` ;
        }
        
        // Initialier le webGPU
        ops.iniWEBGPU = async () => {
    
            if (!navigator.gpu) {
                throw new Error("This navigator does not support WEBGPU");
            }
    
            ops.env.adpter = await navigator.gpu.requestAdapter();
    
            if (!ops.env.adpter) {
                throw new Error("Navigator support WEBGPU but there is no adapter found");
            }
    
            ops.env.device = await ops.env.adpter.requestDevice();
    
            ops.env.contextFomat = navigator.gpu.getPreferredCanvasFormat();
    
            ops.env.context.configure({
                device: ops.env.device, 
                format:  ops.env.contextFomat , 
                alphaMode: "premultiplied"
            })
            
            ops.env.shaderModule = ops.env.device.createShaderModule({
                label: `Shader, ${ops.desc}`, 
                code : ops.env.shaderCode
            });
            
        }
    
        // configurer le pipeline
        ops.configPipeline = () => {

            ops.env.bindGroupLayout = ops.env.device.createBindGroupLayout({
               
                entries: [
                    { // coords
                        binding: 0 , 
                        visibility: GPUShaderStage.VERTEX, 
                        buffer: {
                            type: "read-only-storage"    
                        }
                        
                    }  , 
                    {  // colors
                        binding: 1 , 
                        visibility: GPUShaderStage.VERTEX, 
                        buffer: {
                            type: "read-only-storage"    
                        }
                        
                    }  , 

                    {    // offsets
                        binding: 2 , 
                        visibility: GPUShaderStage.VERTEX, 
                        buffer: {
                            type: "read-only-storage"    
                        }
                        
                    }  , 

                    {    // lightcoords
                        binding: 3 , 
                        visibility: GPUShaderStage.VERTEX, 
                        buffer: {
                            type: "read-only-storage"    
                        }
                        
                    }  , 

                    {    // light color
                        binding: 4 , 
                        visibility: GPUShaderStage.VERTEX , 
                        buffer: {
                            type: "read-only-storage"    
                        }
                        
                    }  , 

                    {    // light color
                        binding: 5 , 
                        visibility: GPUShaderStage.VERTEX , 
                        buffer: {
                            type: "read-only-storage"    
                        }
                        
                    }  , 


                    {    // light color
                        binding: 6 , 
                        visibility: GPUShaderStage.VERTEX , 
                        buffer: {
                            type: "read-only-storage"    
                        }
                        
                    }  , 

                
                ]
            });
    
            let pipelineDesc = {
    
                layout: ops.env.device.createPipelineLayout({
                    bindGroupLayouts: [ ops.env.bindGroupLayout]
                }), 
    
                vertex: {
                    module: ops.env.shaderModule, 
                    entryPoint: "vs"
                } , 
    
                fragment: {
                    module: ops.env.shaderModule, 
                    entryPoint: "fs", 
                    targets: [{
                        format: ops.env.contextFomat
                    }]
                }, 
    
                primitive: {
                    topology: "triangle-list"
                }
            }
    
            ops.env.pipeline = ops.env.device.createRenderPipeline(pipelineDesc);

            ops.objects.stor.coords.buffer =  ops.env.device.createBuffer(
                {
                    label: `Buffer coords${ops.desc}`, 
                    size: ops.objects.stor.coords.data.byteLength, 
                    usage: GPUBufferUsage.STORAGE |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.coords.buffer , 0 , ops.objects.stor.coords.data);

            ops.objects.stor.colors.buffer = ops.env.device.createBuffer(
                {
                    label: `Buffer colors${ops.desc}`, 
                    size: ops.objects.stor.colors.data.byteLength, 
                    usage: GPUBufferUsage.STORAGE |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.colors.buffer , 0 , ops.objects.stor.colors.data);


            ops.objects.stor.offsets.buffer =  ops.env.device.createBuffer(
                {
                    label: `Buffer offsets${ops.desc}`, 
                    size: ops.objects.stor.offsets.data.byteLength, 
                    usage: GPUBufferUsage.STORAGE |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.offsets.buffer , 0 , ops.objects.stor.offsets.data);


            ops.objects.stor.sizes.buffer =  ops.env.device.createBuffer(
                {
                    label: `Buffer offsets${ops.desc}`, 
                    size:  ops.objects.stor.sizes.data.byteLength, 
                    usage: GPUBufferUsage.STORAGE |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.sizes.buffer , 0 , ops.objects.stor.sizes.data);






           ops.objects.stor.lightcoords.buffer =  ops.env.device.createBuffer(
                {
                    label: `Buffer offsets${ops.desc}`, 
                    size: ops.objects.stor.lightcoords.data.byteLength, 
                    usage: GPUBufferUsage.STORAGE |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.lightcoords.buffer , 0 , ops.objects.stor.lightcoords.data);


            ops.objects.stor.lightcolors.buffer =  ops.env.device.createBuffer(
                {
                    label: `Buffer offsets${ops.desc}`, 
                    size: ops.objects.stor.lightcolors.data.byteLength, 
                    usage: GPUBufferUsage.STORAGE |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.lightcolors.buffer , 0 , ops.objects.stor.lightcolors.data);



            
            ops.objects.stor.lightparams.buffer =  ops.env.device.createBuffer(
                {
                    label: `Buffer offsets${ops.desc}`, 
                    size: ops.objects.stor.lightparams.data.byteLength, 
                    usage: GPUBufferUsage.STORAGE |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.lightparams.buffer , 0 , ops.objects.stor.lightparams.data);





            ops.env.bindGroup = ops.env.device.createBindGroup({
                layout: ops.env.bindGroupLayout,
                entries: [ 
                  {
                     binding: 0, // Corresponds to the binding 0 in the layout.
                     resource: { buffer:  ops.objects.stor.coords.buffer, offset: 0, size: ops.objects.vtxCount*4*2}
                  } , 
                  {
                    binding: 1, // Corresponds to the binding 0 in the layout.
                    resource: { buffer:  ops.objects.stor.colors.buffer, offset: 0, size: ops.objects.vtxCount*4*4}
                  } , 
                  {
                    binding: 2, // Corresponds to the binding 0 in the layout.
                    resource: { buffer:  ops.objects.stor.offsets.buffer, offset: 0, size: ops.objects.count*4*2}
                  } , 

                  {
                    binding: 3, // Corresponds to the binding 0 in the layout.
                    resource: { buffer:  ops.objects.stor.lightcoords.buffer, offset: 0, size: 4*2}
                  } , 

                  {
                    binding: 4, // Corresponds to the binding 0 in the layout.
                    resource: { buffer:  ops.objects.stor.lightcolors.buffer, offset: 0, size: 4*3}
                  } , 

                  {
                    binding: 5, // Corresponds to the binding 0 in the layout.
                    resource: { buffer:   ops.objects.stor.sizes.buffer, offset: 0, size: ops.objects.count*4}
                  } , 

                  {
                    binding: 6, // Corresponds to the binding 0 in the layout.
                    resource: { buffer:  ops.objects.stor.lightparams.buffer, offset: 0, size: 4*ops.objects.stor.lightparams.array.length}
                  } , 
                ]
             });

             

            
        }
    
        // dessiner
        ops.draw = () => {

            let color1Nlzd = EbkColors.hexToRGBNrmzd ( {hexaColor:  ops.ui.objectElements.bgColor.value} );
    
            let renderPassDesc = {
                colorAttachments: [
                    { 
                        clearValue: [color1Nlzd[0], color1Nlzd[1], color1Nlzd[2], 1.0], 
                        loadOp : "clear", 
                        storeOp: "store", 
                        view: ops.env.context.getCurrentTexture().createView()
                    }
                ]
            };
    
    
            let commandEncoder = ops.env.device.createCommandEncoder();
            let passEncoder = commandEncoder.beginRenderPass(renderPassDesc);
            passEncoder.setPipeline(ops.env.pipeline);
            passEncoder.setBindGroup(0, ops.env.bindGroup);
            passEncoder.draw(ops.objects.vtxCount, ops.objects.count);
            passEncoder.end();
    
            let commandBuffer = commandEncoder.finish();
    
            ops.env.device.queue.submit([commandBuffer]);
            
        }
    
    
        // Modifer le frame 
    
    
        // Déclencher l'animation
    
    
        // Exécuter le programme. 
    
        
        ops.run = async () =>{
    
            try {
                ops.createUI();
                ops.iniDataStructures();
                ops.iniData();
    
                await ops.iniWEBGPU();
                ops.configPipeline();
                
            }
            catch(e) {
                  
               alert(e.message);
               return;
    
            }
    
            ops.draw();
            
        }

        ops.edit = async () =>{

            ops.release();
    
            try {
                ops.iniDataStructures();
                ops.iniData();
    
                await ops.iniWEBGPU();
                ops.configPipeline();
                
            }
            catch(e) {
                  
               alert(e.message);
               return;
    
            }
    
            ops.draw();
            
        }
    
        // Libére la mémoire   
        ops.release = () =>{
    
            if (ops.env.device) {
                ops.env.device.destroy();
                ops.env.device = null;
            }
        
            // Release the adapter (optional)
            if (ops.env.adapter) {
                ops.env.adapter = null;
            }
    
        }
        
    
        return {
    
            desc: ops.desc, 
    
            releaseResources: () => {
               ops.release(); 
            } , 
    
            run : async () =>{
               await ops.run();
            }
        };
    }
    
    
    export { polygone_upload_data_bndgroup_only_basics2}
    export default   polygone_upload_data_bndgroup_only_basics2;