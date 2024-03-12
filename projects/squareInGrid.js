
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



        ops.ui.circleTriangleStrip = EbkUI.createElement_LabeledVertexInputs({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue', display: "grid" }, text: 'Attributs' },
            colorProperties:  { type:"color", style: { width: '50px' } },
            inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } },
                               { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } }
                             ] 
          });

          ops.ui.circleTriangleStrip.color.value = EbkColors.rgbToHexa({color:[130, 55, 188] });
          ops.ui.circleTriangleStrip.x.value = -0.9;
          ops.ui.circleTriangleStrip.y.value = -0.9;
          
 
         EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })
  

         
        ops.ui.circleTriangleStrip1 = EbkUI.createElement_LabeledVertexInputs({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue', display: "grid" }, text: 'Attributs 1' },
            colorProperties:  { type:"color", style: { width: '50px' } },
            inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } },
                               { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '50px' } }
                             ] 
          });

          ops.ui.circleTriangleStrip1.color.value = EbkColors.rgbToHexa({color:[13, 200, 18] });
          ops.ui.circleTriangleStrip1.x.value = 0.9;
          ops.ui.circleTriangleStrip1.y.value = 0.9;
          
 
         EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })



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


        ops.ui.anim =  EbkUI.createElement_LabeledInput({
 
            container: ops.ui.othersContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue' },  text: 'Anim' },
            inputProperties: { id: 'mySelect', type: "checkbox",  style: { width: '30px' } }
         }).inputElement;

        ops.ui.anim.checked = true;

         EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })


         ops.ui.objectsContainer = EbkUI.createAndAppendElement({container: params.inputContainer, properties: { 
            style: { width: '100px', display: "block" }
         }, 
            elementType: "div",  });
  

         ops.ui.objectCount =  EbkUI.createElement_LabeledInput({
 
            container: ops.ui.objectsContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue' },  text: 'object count ', width: '30px' },
            inputProperties:{ type:"range", min:"1", max:"6000", value:"30", step:"1" , style: { width: '100px' }}
         }).inputElement;

         ops.ui.objectCount.value = 200;



         ops.ui.objectVertexCount =  EbkUI.createElement_LabeledInput({
 
            container: ops.ui.objectsContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue' },  text: 'Vertex count ', width: '30px' },
            inputProperties:{  type:"range", min:"4", max:"16", value:"10", step:"1" , style: { width: '100px' }}
         }).inputElement;

         ops.ui.objectVertexCount.value = 6;

         ops.ui.rayon =  EbkUI.createElement_LabeledInput({
 
            container: ops.ui.objectsContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue' },  text: 'Ray ', width: '30px' },
            inputProperties:{ type:"range", min:"0.009", max:"0.1", value:"10", step:"0.0001" , style: { width: '100px' }}
         }).inputElement;

         ops.ui.rayon.value = 0.05;


        //  let reload = () =>{

        //     if  (ops.editFrame) {
        //         ops.release();
        //         ops.rerun();
        //     }
        //  }  

        // ops.ui.objectCount.onchange = () =>{
        //     reload(); 
        //  } 

        // ops.ui.objectVertexCount.onchange = () =>{
        //     reload(); 
        //  } 

        // ops.ui.rayon.onchange = () =>{
        //     reload(); 
        //  } 

        


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


        ops.objects.gridSize = 5;

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
          var offset: vec2f;
          let i = f32(ii);  

          let cell = vec2f(i % grid.x, floor(i / grid.x));

          let cellOffset = cell / grid * 2;
          let gridPos = (coord +1) / grid - 1 + cellOffset;


        //   var vertexOut : VertexOut; 
        //   var offset: vec2f;
        //   offset  = vec2f(i % grid[0], floor(i/grid[0]));
        //   vertexOut.pos = vec4f(offset+ coord, 0.0, 1.0);
        //   vertexOut.color = vec4f(color, 1.0);

        var c = cos(0.15);
        var s = sin(0.35);
    
        var mat = mat2x2(
            vec2<f32>(c, -s),
            vec2<f32>(s, c)
        );
          
          vertexOut.pos = vec4f(gridPos*mat, 0.0, 1.0);
        //   vertexOut.pos = vec4f(vec2f(gridPos[0], gridPos[1]), 0.0, 1.0);


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

        if (ops.ui.anim.checked ) {

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


        
    }


    // Modifer le frame 
    ops.editFrame = () => {


        // for(let indx = 0; indx<ops.objects.count; indx++)  {

        //     let x = 2*indx;
        //     let y = 2*indx+1;
        //     ops.objects.attr.offsets.data[x] += ops.objects.attr.speed.data[x];

        //     ops.objects.attr.offsets.data[y] += ops.objects.attr.speed.data[y];

        //     if (ops.objects.attr.offsets.data[x] > 0.9) {
        //         ops.objects.attr.speed.data[x] = -ops.objects. attr.speed.data[x];
        //     } else if (ops.objects.attr.offsets.data[x] < -0.9) {
        //         ops.objects.attr.speed.data[x] = -ops.objects.attr.speed.data[x];
        //     }

        //     if (ops.objects.attr.offsets.data[y] > 0.9) {
        //         ops.objects.attr.speed.data[y] = -ops.objects.attr.speed.data[y];
        //     } else if (ops.objects.attr.offsets.data[y] < -0.9) {
        //         ops.objects.attr.speed.data[y] = -ops.objects.attr.speed.data[y];
        //     }

            
        // }    

        // ops.env.device.queue.writeBuffer(  ops.objects.attr.offsets.buffer, 0,  ops.objects.attr.offsets.data);
        // ops.env.device.queue.writeBuffer(  ops.objects.attr.colors.buffer, 0,  ops.objects.attr.colors.data);

        ops.draw(); 

        ops.env.animationPointer = requestAnimationFrame(ops.editFrame);

    }


    // Déclencher l'animation


    // Exécuter le programme. 


    // ops.instanceChange = () => {


    //     // let circleInfo = ops.getVertexInfo(ops.ui.circleTriangleStrip);
    //     let circleInfo = ops.getRandomInfo();

        
    //     for(let indx = 0; indx<ops.objects.count; indx++)  {

    //         let circleInfo = ops.getRandomInfo();

    //         ops.objects.attr.offsets.data[2*indx] = circleInfo.x 
    //         ops.objects.attr.offsets.data[2*indx+1] = circleInfo.y; 

    //         ops.objects.attr.colors.data[3*indx] = circleInfo.r; 
    //         ops.objects.attr.colors.data[3*indx+1] = circleInfo.g; 
    //         ops.objects.attr.colors.data[3*indx+2] = circleInfo.b; 

    //     }    

         
    //     ops.env.device.queue.writeBuffer(  ops.objects.attr.offsets.buffer, 0,  ops.objects.attr.offsets.data);
    //     ops.env.device.queue.writeBuffer(  ops.objects.attr.colors.buffer, 0,  ops.objects.attr.colors.data);

    //     ops.draw(); 
 
    // }


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

        // ops.ui.circleTriangleStrip.color.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip.x.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip.y.oninput = ops.instanceChange;

        // ops.ui.circleTriangleStrip1.color.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip1.x.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip1.y.oninput = ops.instanceChange;

        // ops.editFrame();
      
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

        // ops.ui.colorBg.oninput = ops.draw;

        // ops.ui.circleTriangleStrip.color.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip.x.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip.y.oninput = ops.instanceChange;

        // ops.ui.circleTriangleStrip1.color.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip1.x.oninput = ops.instanceChange;
        // ops.ui.circleTriangleStrip1.y.oninput = ops.instanceChange;

        // ops.editFrame();
      
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

        
        cancelAnimationFrame(ops.env.animationPointer);

        // Release the bind group layout
        if (ops.env.vertexBufferLayout) {
            ops.env.vertexBufferLayout = null;
        }

        // Release the pipeline
        if (ops.env.pipeline) {
            ops.env.pipeline = null;
        }

        // // Release the vertex buffer
        // if (ops.objects.attr.coords.buffer) {
        //     ops.objects.attr.coords.buffer.destroy();
        //     ops.objects.attr.coords.buffer = null;
        // }

        // // Release the vertex buffer
        // if (ops.objects.attr.offsets.buffer) {
        //     ops.objects.attr.offsets.buffer.destroy();
        //     ops.objects.attr.offsets.buffer = null;
        // }

        // // Release the vertex buffer
        // if (ops.objects.attr.colors.buffer) {
        //     ops.objects.attr.colors.buffer.destroy();
        //     ops.objects.attr.colors.buffer = null;
        // }
    


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