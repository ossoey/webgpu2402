
import { Ebk} from "../modules/ebika.js";
import { EbkUI} from "../modules/ebikaUI.js";
import { EbkColors} from "../modules/ebikaColors.js";
import { EbkGeometry} from "../modules/ebikaGeometry.js";



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

                {eltName: '10', params: {properties: {textContent : 'color',  style: {width:"10px"}}, elementType: "div"  } }  , 
                {eltName: 'colorStart', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "input"  } } , 
                {eltName: 'colorEnd', params: {properties: {type : "color", style: {width:"50px"} }, elementType: "input"  }  } , 

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
                {eltName: 'count', params: {properties: {type : "range",  min:"2", max:"200000", value:"1", step:"0.01", style: {width:"50px"} }, elementType: "input"  } } , 
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


            ops.ui.objectElements.colorStart.value = EbkColors.rgbToHexa({color:[130, 255, 188] });
            ops.ui.objectElements.colorEnd.value = EbkColors.rgbToHexa({color:[255, 200, 50] });


            ops.ui.objectElements.positionXStart.value = -1;
            ops.ui.objectElements.positionXEnd.value = 1;

            ops.ui.objectElements.positionYStart.value = -1;
            ops.ui.objectElements.positionYEnd.value = 1;

            ops.ui.objectElements.sizeStart.value = 0.01;
            ops.ui.objectElements.sizeEnd.value = 0.4;

            ops.ui.objectElements.count.value = 10;
            
            ops.ui.objectElements.phaseStart.value = 0;
            ops.ui.objectElements.phaseEnd.value = 6.28;




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
        ops.ui.vertexElements.roughnessStart.value = 4;  
        ops.ui.vertexElements.roughnessEnd.value = 16;  


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
        {eltName: 'typeStart', params: {properties: {type : "range" , min:"1", max:"4", value:"1", step:"1",  style: {width:"50px"} }, elementType: "input"  } } , 
        {eltName: 'typeEnd', params: {properties: {type : "range", min:"1", max:"4", value:"1", step:"1", style: {width:"50px"} }, elementType: "input"  }  } , 

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


        ops.ui.lightElements.colorStart.value = EbkColors.rgbToHexa({color:[200, 10, 20] });
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

        //   window.addEventListener('resize', adjustGridLayout.bind(null,objectElements.container));


    
       }
        
    
        // Initialiser les structures de données. 
        ops.iniDataStructures = () => {

            ops.objects.stor = {};
            ops.objects.geometry = {};
    
            ops.objects.geometry.polygon = new   Ebk.Geometry.PolygonVtxUindexed ({beltVtxCount:16, instanceCount: 2000,colors: {start: [0.3, 0.5, 0.53] , end: [0, 0, 1]}, offsets: {width: [-0.92, 0.92 ], height: [-0.92, 0.92 ]  }});

            ops.objects.geometry.polygon.create_buffersData({phase: -0.063});
            ops.objects.vtxCount = ops.objects.geometry.polygon.vtxCount();
            ops.objects.count = ops.objects.geometry.polygon.instanceCount();
            

            ops.objects.stor.coords = {};
            ops.objects.stor.colors = {};
            ops.objects.stor.offsets = {};
            ops.objects.stor.lightcoords = {};
            ops.objects.stor.lightcolors = {};


            ops.objects.stor.coords.data =  ops.objects.geometry.polygon.buffersData.coords;
            ops.objects.stor.colors.data =  ops.objects.geometry.polygon.buffersData.colors;
            ops.objects.stor.offsets.data = ops.objects.geometry.polygon.buffersData.offsets; 
            ops.objects.stor.lightcoords.data = new Float32Array([-0.5, 0.7]);
            ops.objects.stor.lightcolors.data = new Float32Array([.8, .0,  0.]);
            
              
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


               struct VertexTransfer {

                 @builtin(position) pos : vec4f, 
                 @location(0) color: vec3f, 
                 @location(1) light_incidence: f32

               }
               
               @vertex fn vs(@builtin(instance_index) ii : u32, @builtin(vertex_index) vi : u32)-> VertexTransfer {
    
                 var output : VertexTransfer;
                 
                 var vxcoord = 0.06*coords[vi] + offsets[ii];

                 output.pos = vec4f( vxcoord  ,0, 1);
                 output.color = colors[vi];


                  output.light_incidence =   mx_2d_litght(lightcoords, vxcoord,  1.6, 3);


                 return output; 

              }
    

            //   color_blendADD,  color_blendAVG, color_blendMULT , color_blendSCREEN 

              @fragment fn fs(@location(0) color : vec3f, @location(1) light_incidence: f32) -> @location(0) vec4f {
                  return vec4f(  color_blendSCREEN ( vec3f(light_incidence*lightcolors.r, light_incidence*lightcolors.g,  light_incidence*lightcolors.b), color ), 1);
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
                        visibility: GPUShaderStage.FRAGMENT , 
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


                ]
             });


            
        }
    
        // dessiner
        ops.draw = () => {
    
            let renderPassDesc = {
                colorAttachments: [
                    { 
                        clearValue: [0.5, 0.5, 0.5, 1.0], 
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