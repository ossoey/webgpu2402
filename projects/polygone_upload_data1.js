
import { Ebk} from "../modules/ebika.js";
import { EbkUI} from "../modules/ebikaUI.js";
import { EbkColors} from "../modules/ebikaColors.js";
import { EbkGeometry} from "../modules/ebikaGeometry.js";



 const polygone_upload_data1 = (params = {context:{}}) => {
        let ops = {};
    
        
        ops.desc = "polygon, upload data vertex buffer only, basics1";
        
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
                alignItems : "center"  ,
                padding: '0px 0px 0px 50px'          
              }}});
    
              
    
        }
        
    
        // Initialiser les structures de données. 
        ops.iniDataStructures = () => {

            ops.objects.stor = {};
            ops.objects.geometry = {};
    
            ops.objects.geometry.polygon = new   Ebk.Geometry.PolygonVtxUindexed ({beltVtxCount: 5, instanceCount: 30,colors: {start: [0.15, 0.51, 0.53] , end: [1, 1, 1]}, offsets: {width: [-0.92, 0.92 ], height: [-0.92, 0.92 ]  }});

            ops.objects.geometry.polygon.create_buffersData({phase: -0.063});
            ops.objects.vtxCount = ops.objects.geometry.polygon.vtxCount();
            ops.objects.count = ops.objects.geometry.polygon.instanceCount();
            

            ops.objects.stor.coords = {};
            ops.objects.stor.colors = {};
            ops.objects.stor.offsets = {};

            ops.objects.stor.coords.data =  ops.objects.geometry.polygon.buffersData.coords;
            ops.objects.stor.colors.data =  ops.objects.geometry.polygon.buffersData.colors;
            ops.objects.stor.offsets.data = ops.objects.geometry.polygon.buffersData.offsets; 

 

            console.log(ops.objects.geometry.polygon.buffersData, ops.objects.stor)


        }
    
    
        // initialiser les données 
        ops.iniData = () => {
            ops.env.shaderCode = `



               struct VtxBufferLoad {

                    @location(0) coords:  vec2f , 
                    @location(1) colors:  vec3f ,
                    @location(2) offsets:  vec2f 

               }

               struct VertexTransfer {

                 @builtin(position) pos : vec4f, 
                 @location(0) color: vec4f

               }
               
               @vertex fn vs( 
                            vtxBufferInput:VtxBufferLoad
                
               )-> VertexTransfer {
    
                 var output : VertexTransfer;
                 
                 output.pos = vec4f(  0.1*vtxBufferInput.coords +  vtxBufferInput.offsets   ,0, 1);
                 output.color = vec4f( vtxBufferInput.colors, 1.  );
                 
                 return output; 

              }
    
              @fragment fn fs(@location(0) color : vec4f) -> @location(0) vec4f {
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

            ops.env.vtxBufferLayout = [
                { //coords
                    attributes: [{shaderLocation: 0, offset: 0, format: "float32x2"}],
                    arrayStride: 8, 
                    stepMode: "vertex"
                } , 

                { //colors
                    attributes: [{shaderLocation: 1, offset: 0, format: "float32x4"}],
                    arrayStride: 16, 
                    stepMode: "vertex"
                } ,

                { //offsets
                    attributes: [{shaderLocation: 2, offset: 0, format: "float32x2"}],
                    arrayStride: 8, 
                    stepMode: "instance"
                } , 


            ];

    
            let pipelineDesc = {
    
                layout:"auto", 
    
                vertex: {
                    module: ops.env.shaderModule, 
                    entryPoint: "vs",
                    buffers: ops.env.vtxBufferLayout
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
                    usage: GPUBufferUsage.VERTEX |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.coords.buffer , 0 , ops.objects.stor.coords.data);

            ops.objects.stor.colors.buffer = ops.env.device.createBuffer(
                {
                    label: `Buffer colors${ops.desc}`, 
                    size: ops.objects.stor.colors.data.byteLength, 
                    usage: GPUBufferUsage.VERTEX |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.colors.buffer , 0 , ops.objects.stor.colors.data);

            ops.objects.stor.offsets.buffer =  ops.env.device.createBuffer(
                {
                    label: `Buffer offsets${ops.desc}`, 
                    size: ops.objects.stor.offsets.data.byteLength, 
                    usage: GPUBufferUsage.VERTEX |  GPUBufferUsage.COPY_DST
                }
            );

            ops.env.device.queue.writeBuffer(ops.objects.stor.offsets.buffer , 0 , ops.objects.stor.offsets.data);



            
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

            passEncoder.setVertexBuffer(0, ops.objects.stor.coords.buffer);
            passEncoder.setVertexBuffer(1, ops.objects.stor.colors.buffer);
            passEncoder.setVertexBuffer(2, ops.objects.stor.offsets.buffer);

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
    
    
    export {polygone_upload_data1}
    export default polygone_upload_data1;