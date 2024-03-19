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
        ops.objects.attr = {};
        ops.objects.attr.coords = {};

 
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

    
 
    // initialiser les données 
    ops.iniData = () => {

        let vtx1 = ops.getVertexInfo(ops.ui.vertex1);
        let vtx2 = ops.getVertexInfo(ops.ui.vertex2);
        let vtx3 = ops.getVertexInfo(ops.ui.vertex3);
        

        ops.objects.attr.coords.data = new Float32Array([

            vtx1.x, vtx1.y, vtx1.r, vtx1.g, vtx1.b,     // data for first vertex
            vtx2.x, vtx2.y, vtx2.r, vtx2.g, vtx2.b,     // data for second vertex
            vtx3.x, vtx3.y, vtx3.r, vtx3.g, vtx3.b,  

        ]); 

               
        ops.env.shaderCode = `
        
        struct VertexOut {
            @builtin(position) pos: vec4f, 
            @location(0) color: vec4f, 
        }

        @group(0) @binding(0) var <uniform> bindgroup_coords : array<f32>;
      

        @vertex fn vs(@builtin(instance_index) ii: u32, @location(1) vertex_coords: vec2f, @location(2) vertex_color: vec3f )-> VertexOut {

          var vertexOut : VertexOut; 

          var mat_translation = mat3x3(
            vec3f((1, 0, 0),
            vec3f(0, 1, 0 ),
            vec3f(bindgroup_coords[2*ii], bindgroup_coords[2*ii+1], 1 ),

         );

         var vertex = vec3f(vertex_coords, 0);
          
          vertexOut.pos = vec4f( vertex*mat_translation, 1.0);
          vertexOut.color = vec4f(vertex_color, 1.0);
          
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
         
        ops.env.vertexBufferLayout = [
            {
               attributes: [{shaderLocation: 0, offset: 0, format:"float32x2"}, 
                            {shaderLocation: 1, offset: 8, format:"float32x3"}], 
             
               arrayStride: 20,
               stepMode: "vertex"
            }
        ]
        

        let pipelineDesc = {

            layout: "auto", 

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
        passEncoder.setVertexBuffer(0, ops.objects.attr.coords.buffer );
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


        // Release the bind group layout
        if (ops.env.vertexBufferLayout) {
            ops.env.vertexBufferLayout = null;
        }

        // Release the pipeline
        if (ops.env.pipeline) {
            ops.env.pipeline = null;
        }

        // Release the vertex buffer
        if (ops.objects.attr.coords.buffer) {
            ops.objects.attr.coords.buffer.destroy();
            ops.objects.attr.coords.buffer = null;
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


export {polygone_bindgroup}
export default polygone_bindgroup;