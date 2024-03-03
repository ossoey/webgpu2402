import { EbkUI} from "../modules/ebikaUI.js";
 

const triangle2 = (params = {context:{}}) => {
    let ops = {};

    
    ops.desc = "Triangle2";
    
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


    }
    

    // Initialiser les structures de données. 
    ops.iniDataStructures = () => {

    }


    // initialiser les données 
    ops.iniData = () => {
        ops.env.shaderCode = `
        

           @vertex fn vs(@builtin(vertex_index) vertexIndex : u32)-> @builtin(position) vec4f {

             var pos = array(
                vec2f(-0.9, -0.6), 
                vec2f( 0.9, -0.6), 
                vec2f( 0.0, 0.8), 
              ); 


             return vec4f(pos[vertexIndex], 0.0, 1.0);

           }

           @fragment fn fs() -> @location(0) vec4f {
              return vec4f(1.0, 1.0, 0, 1);
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

        let pipelineDesc = {

            layout: "auto", 

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
        passEncoder.draw(3);
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


export {triangle2}
export default triangle2;