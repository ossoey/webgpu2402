
import { Ebk} from "../modules/ebika.js";
import { EbkUI} from "../modules/ebikaUI.js";
import { EbkColors} from "../modules/ebikaColors.js";

const squareInGrid = (params = {context:{}}) => {
    let ops = {};

    
    ops.desc = "SquareInGrid";
    
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
    ops.env.aspect = ops.env.canvas.width / ops.env.canvas.height;
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



        // ops.ui.circleTriangleStrip = EbkUI.createElement_LabeledVertexInputs({
 
        //     container: params.inputContainer,
        //     // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
        //     labelProperties: { style: { color: 'blue', display: "grid" }, text: 'Attributs' },
        //     colorProperties:  { type:"color", style: { width: '50px' } },
        //     inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } },
        //                        { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } }
        //                      ] 
        //   });

        //   ops.ui.circleTriangleStrip.color.value = EbkColors.rgbToHexa({color:[130, 55, 188] });
        //   ops.ui.circleTriangleStrip.x.value = -0.9;
        //   ops.ui.circleTriangleStrip.y.value = -0.9;
          
 
        //  EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })
  

         
        // ops.ui.circleTriangleStrip1 = EbkUI.createElement_LabeledVertexInputs({
 
        //     container: params.inputContainer,
        //     // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
        //     labelProperties: { style: { color: 'blue', display: "grid" }, text: 'Attributs 1' },
        //     colorProperties:  { type:"color", style: { width: '50px' } },
        //     inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } },
        //                        { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } }
        //                      ] 
        //   });

        //   ops.ui.circleTriangleStrip1.color.value = EbkColors.rgbToHexa({color:[13, 200, 18] });
        //   ops.ui.circleTriangleStrip1.x.value = 0.9;
        //   ops.ui.circleTriangleStrip1.y.value = 0.9;
          
 
        //  EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })



        ops.ui.othersContainer = EbkUI.createAndAppendElement({container: params.inputContainer, properties: { 
            style: { width: '100px', display: "block" }
         }, 
            elementType: "div",  });

        ops.ui.colorBg = EbkUI.createElement_LabeledInput({

            container: ops.ui.othersContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue', display: "grid", padding: "5px"}, text: 'background' },
            inputProperties: { id: 'colorbgid', type:"color", style: { width: '50px' } }
            }).inputElement;   

        ops.ui.colorBg.value = EbkColors.rgbToHexa({color:[0, 55, 188] });


        // ops.ui.anim =  EbkUI.createElement_LabeledInput({
 
        //     container: ops.ui.othersContainer,
        //     // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
        //     labelProperties: { style: { color: 'blue' },  text: 'Anim' },
        //     inputProperties: { id: 'mySelect', type: "checkbox",  style: { width: '30px' } }
        //  }).inputElement;

        // ops.ui.anim.checked = true;

        //  EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })


        //  ops.ui.objectsContainer = EbkUI.createAndAppendElement({container: params.inputContainer, properties: { 
        //     style: { width: '100px', display: "block" }
        //  }, 
        //     elementType: "div",  });
  

        //  ops.ui.objectCount =  EbkUI.createElement_LabeledInput({
 
        //     container: ops.ui.objectsContainer,
        //     // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
        //     labelProperties: { style: { color: 'blue' },  text: 'object count ', width: '30px' },
        //     inputProperties:{ type:"range", min:"1", max:"6000", value:"30", step:"1" , style: { width: '100px' }}
        //  }).inputElement;

        //  ops.ui.objectCount.value = 200;



        //  ops.ui.objectVertexCount =  EbkUI.createElement_LabeledInput({
 
        //     container: ops.ui.objectsContainer,
        //     // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
        //     labelProperties: { style: { color: 'blue' },  text: 'Vertex count ', width: '30px' },
        //     inputProperties:{  type:"range", min:"4", max:"16", value:"10", step:"1" , style: { width: '100px' }}
        //  }).inputElement;

        //  ops.ui.objectVertexCount.value = 6;

        //  ops.ui.rayon =  EbkUI.createElement_LabeledInput({
 
        //     container: ops.ui.objectsContainer,
        //     // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
        //     labelProperties: { style: { color: 'blue' },  text: 'Ray ', width: '30px' },
        //     inputProperties:{ type:"range", min:"0.009", max:"0.1", value:"10", step:"0.0001" , style: { width: '100px' }}
        //  }).inputElement;

        //  ops.ui.rayon.value = 0.05;


        


    }
    

    // Initialiser les structures de données. 
    ops.iniDataStructures = () => {
        ops.objects.attr = {};
        ops.objects.unif = {};
        ops.objects.attr.coords = {};

        ops.objects.unif.gridSize = {};

    }

    // initialiser les données 
    ops.iniData = () => {

        // let circleInfo = ops.getVertexInfo(ops.ui.circleTriangleStrip);

        
        ops.objects.attr.coords.data = new Float32Array([
            -0.8, -0.8, 0.4, 0.8, 0.9,  
             0.8, -0.8,  0.1, 0.8, 0.9,  
             0.8,  0.8, 0.9, 0.8, 0.9,

             -0.8, -0.8, 0.3, 0.5, 0.9,
              0.8,  0.8, 0.4, 0.8, 0.9,
             -0.8, 0.8, 0.4, 0.8, 0.9,
        ]);


        ops.objects.gridSize = 10;

        ops.objects.unif.gridSize.data = new Float32Array([
            ops.objects.gridSize,  ops.objects.gridSize
        ]);


        

        ops.env.shaderCode = `
        
        struct VertexOut {
            @builtin(position) pos: vec4f, 
            @location(0) color: vec4f, 
        }

        @group(0) @binding(0) var <uniform> grid: vec2f;

        @vertex fn vs(@builtin(instance_index) ii: u32,  @location(0) coord: vec2f, @location(1) color: vec3f )-> VertexOut {


          var vertexOut : VertexOut; 
        //   var offset: vec2f;
          let i = f32(ii);  

        let tt = 1.0;
        
        var mat = mat2x2(
            vec2f((2/grid[0])*tt, 0),
               vec2f(0,  (2/grid[1])*tt )
         );


        let offset = vec2f( (2/grid[0])*(i % grid[0]) -1+0.01, (2/grid[1])* floor(i / grid[0]) -1+0.01);

        vertexOut.pos  = vec4f(offset + mat*(((7)*(coord+0.8))/(1.6*grid) ), 0.0, 1.0);
        vertexOut.color = vec4f(color, 1.0);

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
 

        ops.env.unformBindGroupLayout = ops.env.device.createBindGroupLayout({
            entries: [
                {
                    binding:0,
                    visibility: GPUShaderStage.VERTEX,  
                    buffer: {
                        type: "uniform"
                     }
                }
            ]
        })
         
        ops.env.vertexBufferLayout = [
            {
               attributes: [{shaderLocation: 0, offset: 0, format:"float32x2"} , 
                            {shaderLocation: 1, offset: 8, format:"float32x3"}
               ], 
               arrayStride: 20,
               stepMode: "vertex"
            }

        ]
        

        let pipelineDesc = {

            layout: ops.env.device.createPipelineLayout({
                bindGroupLayouts: [ ops.env.unformBindGroupLayout]
            }), 

            vertex: {
                module: ops.env.shaderModule, 
                entryPoint: "vs", 
                buffers: ops.env.vertexBufferLayout 
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

        ops.objects.attr.coords.buffer = ops.env.device.createBuffer({
            size: ops.objects.attr.coords.data.byteLength, 
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.attr.coords.buffer, 0, ops.objects.attr.coords.data);
        
        ops.objects.unif.gridSize.buffer = ops.env.device.createBuffer({
            size: ops.objects.unif.gridSize.data.byteLength, 
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.unif.gridSize.buffer, 0,  ops.objects.unif.gridSize.data); 

        ops.env.bindGroup = ops.env.device.createBindGroup({
            layout: ops.env.unformBindGroupLayout,
            entries: [
                { binding: 0, 
                  resource: {
                    buffer: ops.objects.unif.gridSize.buffer ,offset: 0, size: 2*4 
                   
                  }
                
                }
            ]
        })


        
    }

    // dessiner
    ops.draw = () => {

        ops.env.aspect = ops.env.canvas.width / ops.env.canvas.height;

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
    
    
            ops.env.commandEncoder = ops.env.device.createCommandEncoder();
            let passEncoder = ops.env.commandEncoder.beginRenderPass(renderPassDesc);
            passEncoder.setPipeline(ops.env.pipeline);
            passEncoder.setBindGroup(0, ops.env.bindGroup);
            passEncoder.setVertexBuffer(0, ops.objects.attr.coords.buffer );
           
            passEncoder.draw(6, ops.objects.gridSize* ops.objects.gridSize);
            passEncoder.end();
    
            ops.env.commandBuffer = ops.env.commandEncoder.finish();
    
            ops.env.device.queue.submit([ops.env.commandBuffer]);
    


        
    }


    // Modifer le frame 
    ops.editFrame = () => {



        ops.draw(); 

        ops.env.animationPointer = requestAnimationFrame(ops.editFrame);

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

         
    }

    ops.rerun = async () =>{

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


        
        cancelAnimationFrame(ops.env.animationPointer);

        // Release the bind group layout
        if (ops.env.vertexBufferLayout) {
            ops.env.vertexBufferLayout = null;
        }

        // Release the pipeline
        if (ops.env.pipeline) {
            ops.env.pipeline = null;
        }




        if (ops.env.commandEncoder) {
           
            ops.env.commandEncoder = null;
        }
        

        if (ops.env.commandEncoder) {
            ops.env.commandEncoder.destroy();
            ops.env.commandEncoder = null;
        }
    

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


export {squareInGrid}
export default squareInGrid;