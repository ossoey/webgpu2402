import { EbkUI} from "../modules/ebikaUI.js";
import { EbkColors} from "../modules/ebikaColors.js";

const triangleColoredForeNBackGround = (params = {context:{}}) => {
    let ops = {};

    
    ops.desc = "Triangle Colored Fore and BackGround";
    
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
            alignItems : "center" ,
           
          
            padding: '0px 0px 0px 50px'          
          }}});

         
          

        ops.ui.color = EbkUI.createElement_LabeledInput({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue'  }, text: 'Color ' },
            inputProperties: { id: 'colorid', type:"color", style: {   width: '50px' } }
         }).inputElement;

   
         ops.ui.color.value = EbkColors.rgbToHexa({color:[130, 55, 188] });

         

         EbkUI.createAndAppendElement({container: params.inputContainer, properties: {innerHTML:"&nbsp;&nbsp;&nbsp " }, elementType: "div"  })
  

         ops.ui.colorBg = EbkUI.createElement_LabeledInput({
 
            container: params.inputContainer,
            // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            labelProperties: { style: { color: 'blue' }, text: 'background ' },
            inputProperties: { id: 'colorbgid', type:"color", style: { width: '50px' } }
         }).inputElement;

         ops.ui.colorBg.value = EbkColors.rgbToHexa({color:[0, 55, 188] });


    }
    

    // Initialiser les structures de données. 
    ops.iniDataStructures = () => {
        ops.objects.attr = {};
        ops.objects.attr.coords = {};

        ops.objects.unif = {};
        ops.objects.unif.color = {};


    }


    // initialiser les données 
    ops.iniData = () => {
        ops.objects.attr.coords.data = new Float32Array([

            -0.8, -0.8, 
             0.8, -0.8, 
             0.0, 0.8  

        ]); 

               
        let color = EbkColors.hexToRGBNrmzd({hexaColor: ops.ui.color.value }) ; 
        ops.objects.unif.color.data = new Float32Array([
            color[0], color[1], color[2]
        ]);
                   
        ops.env.shaderCode = `
        
        @group(0) @binding(0) var<uniform> color: vec3f;

        @vertex fn vs(@builtin(vertex_index) vertexIndex : u32)-> @builtin(position) vec4f {

          var pos = array(
             vec2f(-0.9, -0.6), 
             vec2f( 0.9, -0.6), 
             vec2f( 0.0, 0.8), 
           ); 


          return vec4f(pos[vertexIndex], 0.0, 1.0);

        }

        @fragment fn fs() -> @location(0) vec4f {
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
         
        ops.env.unifBindGroupLayout = ops.env.device.createBindGroupLayout(
            {entries:[
                {
                    binding: 0, 
                    visibility: GPUShaderStage.FRAGMENT, 
                    buffer: {type: "uniform"}
                }
            ]}
        )

        let pipelineDesc = {

            layout: ops.env.device.createPipelineLayout({
                bindGroupLayouts: [ops.env.unifBindGroupLayout]
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

        ops.objects.unif.color.buffer = ops.env.device.createBuffer({
            size: ops.objects.unif.color.data.byteLength, 
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.unif.color.buffer, 0, ops.objects.unif.color.data);

        ops.env.unifBindGroup = ops.env.device.createBindGroup({
            layout:  ops.env.unifBindGroupLayout, 
            entries: [
                { binding: 0, 
                  resource: {buffer: ops.objects.unif.color.buffer, offset: 0, size: 3*4 }
                }
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
        passEncoder.setBindGroup(0, ops.env.unifBindGroup  );
        passEncoder.draw(3);
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
        ops.ui.color.oninput = ops.colorInput;
        
    }

    // Libére la mémoire   
    ops.release = () =>{

       // Release the vertex buffer layout
        // if (vertexBufferLayout) {
        //   vertexBufferLayout = null;
        // }

       // Release the bind group
        if (ops.env.unifBindGroup) {
           // ops.env.unifBindGroup.destroy();
            ops.env.unifBindGroup = null;
        }


        // Release the bind group layout
        if (ops.env.unifBindGroupLayout) {
            ops.env.unifBindGroupLayout = null;
        }

        // Release the pipeline
        if (ops.env.pipeline) {
            ops.env.pipeline = null;
        }

        // Release the vertex buffer
        if (ops.objects.unif.color.buffer) {
            ops.objects.unif.color.buffer.destroy();
            ops.objects.unif.color.buffer = null;
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


export {triangleColoredForeNBackGround}
export default triangleColoredForeNBackGround;