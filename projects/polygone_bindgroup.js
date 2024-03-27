
import { Ebk} from "../modules/ebika.js";
import { EbkUI} from "../modules/ebikaUI.js";
import { EbkColors} from "../modules/ebikaColors.js";

const polygone_bindgroup = (params = {context:{}}) => {
    let ops = {};

    
    ops.desc = "polygone bindgroup";
    
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

        params.inputContainer.innerHTML = "" 

        EbkUI.editElement({ element:  params.inputContainer,   properties:{  style: {

            display : "flex", 
            flexDirection :"row", 
            flexWrap : "nowrap" , 
            justifyContent : "flex-start", 
            alignItems : "center"
          
          }}});


        ops.ui.vertex1 = EbkUI.createElement_LabeledVertexInputs({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue', display: "grid" }, text: 'vertex 1' },
            colorProperties:  { type:"color", style: { width: '50px' } },
            inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } },
                               { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } }
                             ] 
          });

          ops.ui.vertex1.color.value = EbkColors.rgbToHexa({color:[130, 55, 188] });
          ops.ui.vertex1.x.value = -0.7;
          ops.ui.vertex1.y.value = -0.7;
          


          EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })
          

         ops.ui.vertex2 = EbkUI.createElement_LabeledVertexInputs({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue', display: "grid" }, text: 'vertex 1' },
            colorProperties:  { type:"color", style: { width: '50px' } },
            inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } },
                               { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } }
                             ] 
        });

        ops.ui.vertex2.color.value = EbkColors.rgbToHexa({color:[0, 55, 188] });

        ops.ui.vertex2.x.value =  0.7;
        ops.ui.vertex2.y.value = -0.7;
        


        EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })  

        ops.ui.vertex3 = EbkUI.createElement_LabeledVertexInputs({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue', display: "grid" }, text: 'vertex 1' },
            colorProperties:  { type:"color", style: { width: '50px' } },
            inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } },
                               { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } }
                             ] 
        });

        ops.ui.vertex3.color.value = EbkColors.rgbToHexa({color:[178, 200, 188] });

        ops.ui.vertex3.x.value =  0;
        ops.ui.vertex3.y.value =  0.9;
        

        EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })  
          

   

         EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })
  

         ops.ui.colorBg = EbkUI.createElement_LabeledInput({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue', display: "grid" }, text: 'background' },
            inputProperties: { id: 'colorbgid', type:"color", style: { width: '50px' } }
         }).inputElement;

         ops.ui.colorBg.value = EbkColors.rgbToHexa({color:[0, 55, 188] });


    }
    

    // Initialiser les structures de données. 
    ops.iniDataStructures = () => {

        ops.objects.edgCount =  Ebk.Rand.iRanges({ranges:[[4., 12]], clamps:[[0,1]]})   
        ops.objects.vxCount = 3 * ops.objects.edgCount;
        ops.objects.count = 3;
        ops.objects.mag = 0.3;
        ops.objects.phase = 0.17;

        ops.objects.attr = {};
        ops.objects.attr.coords = {};

        ops.objects.unif = {};
        ops.objects.unif.vxCoords = {};
        ops.objects.unif.vxColors = {};
        ops.objects.unif.insceOffsets  = {};
        ops.objects.unif.insceColors   = {};


        ops.objects.unif.vxCoords.data = new Float32Array(2*ops.objects.vxCount);
        ops.objects.unif.vxColors.data = new Float32Array(3*ops.objects.vxCount);
        ops.objects.unif.insceOffsets.data  = new Float32Array(2*ops.objects.count);
        ops.objects.unif.insceColors.data   = new Float32Array(3*ops.objects.count);

 
    }

    ops.getVertexInfo = (vertex) => {

        let  vertex1 = {};
        vertex1.x =  Number( vertex.x.value);
        vertex1.y =  Number( vertex.y.value);
        let color =  EbkColors.hexToRGBNrmzd( {hexaColor: vertex.color.value } ); 
        vertex1.r =  color [0]; 
        vertex1.g =  color [1];
        vertex1.b =  color [2]; 

        return vertex1; 
    }

    
    ops.iniGeometry = () => {

        let pgnVxNdx = (edgndx) => {
           return   Ebk.Sequence.GridWholeNumber.dataGetSum({step:edgndx});
        }

        let cirAngle = (cirNdx, cirNdxMax, ph = 0.99 ) => {
           
           // let ph = Ebk.Rand.fRanges({ranges:[[0., 0.3]], clamps:[[0,1]]}) 

            return ph + 2*Math.PI* (cirNdx) / (cirNdxMax-1)
        }

        let pgnAngle = (edgndx, ph = 0.99  ) => {
            return  cirAngle(pgnVxNdx(edgndx), pgnVxNdx(ops.objects.edgCount), ph); 
        }

        let pgnvxCoords  = (pgnvxNdx, ph = 0.99 ) => {

            let angle = pgnAngle(pgnvxNdx, ph);
            let ray   = ops.objects.mag;

            return { x :  ray*Math.cos(angle) , y:  ray*Math.sin(angle) }
        }


        let geoAngle = (vi, vxCount) => {
            return 2*Math.PI* (vi) / (vxCount-1)
        }


        let geoRay  = (vi, vxCount, ph, mag) => {
            return mag * vi * 0.1 // Math.sin(geoAngle(vi, vxCount, ph));
        }

        let geovxCoords  = (vi, vxCount ) => {

            let angle = geoAngle(vi, vxCount,  ops.objects.phase);
            let ray   = geoRay(vi, vxCount,  ops.objects.phase, ops.objects.mag );

            return { x :  ray*Math.cos(angle) , y:  ray*Math.sin(angle) }
        }

        let ph = Ebk.Rand.fRanges({ranges:[[0., 5.3]], clamps:[[0,1]]}) 

        for (let pgnvxNdx = 1; pgnvxNdx < ops.objects.edgCount; pgnvxNdx++) {



            let ctr = {x: 0, y: 0};

            

            let pt0 = pgnvxCoords(pgnvxNdx -1, ph);  

            let pt1 = pgnvxCoords(pgnvxNdx, ph); 

            ops.objects.unif.vxCoords.data[3*2*(pgnvxNdx)]   = ctr.x;
            ops.objects.unif.vxCoords.data[3*2*(pgnvxNdx)+1] = ctr.y;

            ops.objects.unif.vxCoords.data[3*2*(pgnvxNdx)+2] = pt0.x;
            ops.objects.unif.vxCoords.data[3*2*(pgnvxNdx)+3] = pt0.y;

            ops.objects.unif.vxCoords.data[3*2*(pgnvxNdx)+4] = pt1.x;
            ops.objects.unif.vxCoords.data[3*2*(pgnvxNdx)+5] = pt1.y;

            let color1 =  [0.2, 0.8, 0.5];

            let color2 =  [0.6, 0.1, 0.1]; 

            let color3 =  [0.1, 0.1, 0.6];

            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)]   = color1[0];
            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+1] = color1[1];
            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+2] = color1[2];

            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+3] = color2[0];
            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+4] = color2[1];
            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+5] = color2[2];

            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+6] = color3[0];
            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+7] = color3[1];
            ops.objects.unif.vxColors.data[3*3*(pgnvxNdx)+8] = color3[2];

 
        }


        let ctr = {x: 0, y: 0};

        let last = ops.objects.edgCount -1

        let pt0 = pgnvxCoords(last , ph);  

        let pt1 = pgnvxCoords(0, ph); 

        ops.objects.unif.vxCoords.data[3*2*(last)]   = ctr.x;
        ops.objects.unif.vxCoords.data[3*2*(last)+1] = ctr.y;

        ops.objects.unif.vxCoords.data[3*2*(last)+2] = pt0.x;
        ops.objects.unif.vxCoords.data[3*2*(last)+3] = pt0.y;

        ops.objects.unif.vxCoords.data[3*2*(last)+4] = pt1.x;
        ops.objects.unif.vxCoords.data[3*2*(last)+5] = pt1.y;


        let color1 =  [0.2, 0.8, 0.5];

        let color2 =  [0.6, 0.1, 0.1]; 

        let color3 =  [0.1, 0.1, 0.6];

        ops.objects.unif.vxColors.data[3*3*(last)]   = color1[0];
        ops.objects.unif.vxColors.data[3*3*(last)+1] = color1[1];
        ops.objects.unif.vxColors.data[3*3*(last)+2] = color1[2];

        ops.objects.unif.vxColors.data[3*3*(last)+3] = color2[0];
        ops.objects.unif.vxColors.data[3*3*(last)+4] = color2[1];
        ops.objects.unif.vxColors.data[3*3*(last)+5] = color2[2];

        ops.objects.unif.vxColors.data[3*3*(last)+6] = color3[0];
        ops.objects.unif.vxColors.data[3*3*(last)+7] = color3[1];
        ops.objects.unif.vxColors.data[3*3*(last)+8] = color3[2];


        console.log(ops.objects.unif  )

               

             
                 
    }

    ops.iniInstancesOffsetsAndColor = () => {
        

        for (let ii = 0; ii<ops.objects.count; ii++) {

            ops.objects.unif.insceOffsets.data[2*ii] = Ebk.Rand.fRanges({ranges:[[-1.,1.]], clamps:[[0,1]]});
            ops.objects.unif.insceOffsets.data[2*ii + 1] = Ebk.Rand.fRanges({ranges:[[-1.,1.]], clamps:[[0,1]]});

            ops.objects.unif.insceColors.data[3*ii] = Ebk.Rand.fRanges({ranges:[[0.2, 1.]], clamps:[[0,1]]});
            ops.objects.unif.insceColors.data[3*ii + 1] = Ebk.Rand.fRanges({ranges:[[0.2,1.]], clamps:[[0,1]]});
            ops.objects.unif.insceColors.data[3*ii + 2] = Ebk.Rand.fRanges({ranges:[[0.2,1.]], clamps:[[0,1]]});

        }

    }    
 
    // initialiser les données 
    ops.iniData = () => {

        let vtx1 = ops.getVertexInfo(ops.ui.vertex1);
        let vtx2 = ops.getVertexInfo(ops.ui.vertex2);
        let vtx3 = ops.getVertexInfo(ops.ui.vertex3);
        
        ops.iniGeometry();

        ops.iniInstancesOffsetsAndColor();

        // ops.objects.attr.coords.data = new Float32Array([

        //     vtx1.x, vtx1.y, vtx1.r, vtx1.g, vtx1.b,     // data for first vertex
        //     vtx2.x, vtx2.y, vtx2.r, vtx2.g, vtx2.b,     // data for second vertex
        //     vtx3.x, vtx3.y, vtx3.r, vtx3.g, vtx3.b,  

        // ]); 






               
        ops.env.shaderCode = `
        

        fn color_blendMULT(colorA: vec3f, colorB: vec3f  )->vec3f {
            return  (colorA * colorB);
        } 

        fn color_blendSCREEN(colorA: vec3f, colorB: vec3f  )->vec3f {
 
            return  vec3f(
                1.0 - (1.0 - colorA.r) * (1.0 - colorB.r)
            ,
                1.0 - (1.0 - colorA.g) * (1.0 - colorB.g)
            ,
                1.0 - (1.0 - colorA.b) * (1.0 - colorB.b)
            );
        } 

        fn color_blendOVERLAY(colorA: vec3f, colorB: vec3f )->vec3f {
            //colorA Base color (background) 
            //colorB Blend color (foreground)  

            var colorOutPut: vec3f; 

            var luminance = 0.2126 * colorA.r +  0.7152 * colorA.g + 0.0722 * colorA.b;

            if (luminance < 0.5) {  // "Multiply"
                colorOutPut = color_blendMULT(colorA, colorB);
            } else {  // "screen"
                color_blendSCREEN(colorA, colorB);
            }

            return  colorOutPut;
        } 

        fn color_blendAVG(colorA: vec3f, colorB: vec3f  )->vec3f {
            return  (colorA + colorB) / 2;
        }

        struct VertexOut {
            @builtin(position) pos: vec4f, 
            @location(0) color: vec4f, 
        }

        @group(0) @binding(0) var <storage> geovx_coords:  array<vec2f>;
        @group(0) @binding(1) var <storage> geovx_colors:  array<vec3f>;
        @group(0) @binding(2) var <storage> insce_offsets: array<vec2f>;
        @group(0) @binding(3) var <storage> insce_colors:  array<vec3f>;
      

        @vertex fn vs(@builtin(instance_index) ii: u32, @builtin(vertex_index) vi: u32)-> VertexOut {

          var vertexOut : VertexOut; 

          var mat_translation = mat3x3(
            vec3f(1, 0, 0),
            vec3f(0, 1, 0 ),
            vec3f(insce_offsets[ii], 1 ),
         );

          var vertex = vec3f(geovx_coords[vi], 0);
       
          vertexOut.pos = vec4f( mat_translation*vertex, 1.0);

          vertexOut.color = vec4f( color_blendSCREEN(insce_colors[ii], geovx_colors[vi] ), 1.0);
          
          //vertexOut.color = vec4f( insce_colors[ii], 1.0);

          return vertexOut;

        }

        @fragment fn fs(@location(0) color: vec4f) -> @location(0) vec4f {
           return color;
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
         
        // ops.env.vertexBufferLayout = [
        //     {
        //        attributes: [{shaderLocation: 0, offset: 0, format:"float32x2"}, 
        //                     {shaderLocation: 1, offset: 8, format:"float32x3"}], 
             
        //        arrayStride: 20,
        //        stepMode: "vertex"
        //     }
        // ]
        

        // @group(0) @binding(0) var <uniform> geovx_coords:  array<vec2f>;
        // @group(0) @binding(1) var <uniform> geovx_colors:  array<vec3f>;
        // @group(0) @binding(2) var <uniform> insce_offsets: array<vec2f>;
        // @group(0) @binding(3) var <uniform> insce_colors:  array<vec3f>;


        ops.env.bindGroupLayout = ops.env.device.createBindGroupLayout({
                                           
            entries: [
                    
                {
                    binding: 0, 
                    visibility: GPUShaderStage.VERTEX,
                    buffer:{
                        type:"read-only-storage"
                    }
                }  , 

                {
                    binding: 1, 
                    visibility: GPUShaderStage.VERTEX, 
                    buffer: {type: "read-only-storage"}
                     
                } , 

                {
                    binding: 2, 
                    visibility: GPUShaderStage.VERTEX, 
                    buffer: {
                        type: "read-only-storage"
                    }
                } , 

                {
                    binding: 3, 
                    visibility: GPUShaderStage.VERTEX, 
                    buffer: {
                        type: "read-only-storage"
                    }
                } 
            ]
        });

        let pipelineDesc = {

            layout: ops.env.device.createPipelineLayout({
                bindGroupLayouts: [ops.env.bindGroupLayout]
                
            }), 

            vertex: {
                module: ops.env.shaderModule, 
                entryPoint: "vs"
                // buffers: ops.env.vertexBufferLayout 
            } , 

            fragment: {
                module: ops.env.shaderModule, 
                entryPoint: "fs", 
                targets: [{
                    format: ops.env.contextFomat
                }]
            }, 

            primitive: {
                topology: "triangle-strip"
            }
        }


        ops.env.pipeline = ops.env.device.createRenderPipeline(pipelineDesc);

        ops.objects.unif.vxCoords.buffer = ops.env.device.createBuffer({
            size: ops.objects.unif.vxCoords.data.byteLength, 
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.unif.vxCoords.buffer, 0, ops.objects.unif.vxCoords.data);


        ops.objects.unif.vxColors.buffer = ops.env.device.createBuffer({
            size: ops.objects.unif.vxColors.data.byteLength, 
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.unif.vxColors.buffer, 0, ops.objects.unif.vxColors.data);


        ops.objects.unif.insceOffsets.buffer = ops.env.device.createBuffer({
            size: ops.objects.unif.insceOffsets.data.byteLength, 
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.unif.insceOffsets.buffer, 0, ops.objects.unif.insceOffsets.data);


        ops.objects.unif.insceColors.buffer = ops.env.device.createBuffer({
            size: ops.objects.unif.insceColors.data.byteLength, 
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.unif.insceColors.buffer, 0, ops.objects.unif.insceColors.data);


        ops.objects.vxCount = 3 * ops.objects.edgCount;

        ops.env.bindGroup = ops.env.device.createBindGroup({
            layout: ops.env.bindGroupLayout, 
            entries: [
                {
                  binding: 0, 
                  resource: {
                    buffer:  ops.objects.unif.vxCoords.buffer, offset: 0, size: 4*2*ops.objects.vxCount
                  }
                } ,
                {
                    binding: 1, 
                    resource: {
                      buffer:  ops.objects.unif.vxColors.buffer, offset: 0, size: 4*3*ops.objects.vxCount
                    }
                } ,
                {
                    binding: 2, 
                    resource: {
                      buffer:  ops.objects.unif.insceOffsets.buffer, offset: 0, size: 4*2*ops.objects.count
                    }
                } ,
                {
                    binding: 3, 
                    resource: {
                      buffer:  ops.objects.unif.insceColors.buffer, offset: 0, size: 4*3*ops.objects.count
                    }
                  } ,
                                                               
            
            ]
        });
        
        
    }

    // dessiner
    ops.draw = () => {

        let color = EbkColors.hexToRGBNrmzd({hexaColor: ops.ui.colorBg.value }) ; 


        let renderPassDesc = {
            colorAttachments: [
                { 
                    clearValue: [color[0] , color[1], color[2], 1.0], 
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
        passEncoder.draw(3*ops.objects.vxCount, ops.objects.count);
        passEncoder.end();

        let commandBuffer = commandEncoder.finish();

        ops.env.device.queue.submit([commandBuffer]);
        
    }


    // Modifer le frame 


    // Déclencher l'animation


    // Exécuter le programme. 

    ops.colorInput =() =>{
        let color = EbkColors.hexToRGBNrmzd({hexaColor: ops.ui.color.value }) ; 
        ops.objects.unif.color.data = new Float32Array([
            color[0], color[1], color[2]
        ]);

        ops.env.device.queue.writeBuffer( ops.objects.unif.color.buffer, 0, ops.objects.unif.color.data);

        ops.draw();
    }

    ops.vertexChange = () => {


        let vtx1 = ops.getVertexInfo(ops.ui.vertex1);
        let vtx2 = ops.getVertexInfo(ops.ui.vertex2);
        let vtx3 = ops.getVertexInfo(ops.ui.vertex3);
        

        ops.objects.attr.coords.data = new Float32Array([

            vtx1.x, vtx1.y, vtx1.r, vtx1.g, vtx1.b,      
            vtx2.x, vtx2.y, vtx2.r, vtx2.g, vtx2.b,    
            vtx3.x, vtx3.y, vtx3.r, vtx3.g, vtx3.b,  

        ]); 

        ops.env.device.queue.writeBuffer( ops.objects.attr.coords.buffer, 0, ops.objects.attr.coords.data);

        ops.draw(); 
 
    }


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

        ops.ui.colorBg.oninput = ops.draw;

        ops.ui.vertex1.color.oninput = ops.vertexChange;
        ops.ui.vertex1.x.oninput = ops.vertexChange;
        ops.ui.vertex1.y.oninput = ops.vertexChange;

        ops.ui.vertex2.color.oninput = ops.vertexChange;
        ops.ui.vertex2.x.oninput = ops.vertexChange;
        ops.ui.vertex2.y.oninput = ops.vertexChange;

        ops.ui.vertex3.color.oninput = ops.vertexChange;
        ops.ui.vertex3.x.oninput = ops.vertexChange;
        ops.ui.vertex3.y.oninput = ops.vertexChange;

        
    }

    // Libére la mémoire   
    ops.release = () =>{

       // Release the vertex buffer layout
        // if (vertexBufferLayout) {
        //   vertexBufferLayout = null;
        // }

       // Release the bind group
        // if (ops.env.unifBindGroup) {
        //    // ops.env.unifBindGroup.destroy();
        //     ops.env.unifBindGroup = null;
        // }


        // // Release the bind group layout
        // if (ops.env.vertexBufferLayout) {
        //     ops.env.vertexBufferLayout = null;
        // }

        // // Release the pipeline
        // if (ops.env.pipeline) {
        //     ops.env.pipeline = null;
        // }

        // // Release the vertex buffer
        // if (ops.objects.attr.coords.buffer) {
        //     ops.objects.attr.coords.buffer.destroy();
        //     ops.objects.attr.coords.buffer = null;
        // }



        // if (ops.env.device) {
        //     ops.env.device.destroy();
        //     ops.env.device = null;
        // }
    
        // // Release the adapter (optional)
        // if (ops.env.adapter) {
        //     ops.env.adapter = null;
        // }

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


export {polygone_bindgroup}
export default polygone_bindgroup;