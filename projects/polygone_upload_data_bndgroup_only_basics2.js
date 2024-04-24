
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
    
            params.inputContainer.innerHTML = "" 
    
            EbkUI.editElement({ element:  params.inputContainer,   properties:{  style: {
    
                display : "flex", 
                flexDirection :"row", 
                flexWrap : "nowrap" , 
                justifyContent : "flex-start", 
                alignItems : "center"
              
              }}});

            //   ops.ui.circleTriangleStrip = EbkUI.createElement_LabeledVertexInputs({
 
            //     container: params.inputContainer,
            //     // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
            //     labelProperties:  { style: { color: 'blue', display: "grid",  "font-size":'11px'  }, text: 'Attributs' },
            //     colorProperties:  { type:"color", style: { width: '40px', height : '18px' , padding: '0px', margin: '0px'   } },
            //     inputsProperties: [{ type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '7%',  height : '7%', 'border-radius': '7.5px'  } },
            //                        { type:"range", min:"-1", max:"1", value:"0", step:"0.01" , style: { width: '40px' ,  height : '2px'  } }
            //                      ] 
            //   });


            let grid1 =  EbkUI.createAndAddElementFirstPosition({container: params.inputContainer,
                           properties: { 
                            style: { color: 'blue', display: "grid",  "font-size":'11px',
                            'grid-template-columns': 'repeat(4, 1fr)' , gap: '10px'        
                        
                        }, 
                        
                        textContent : ' ' }, elementType: "div"  }    );

            
           let subElement1  = EbkUI.createAndAppendElement({container: grid1, properties: {textContent : ' '}, elementType: "div"  }    )
           let subElement2  = EbkUI.createAndAppendElement({container: grid1, properties: {textContent : 'subElement2'}, elementType: "div"  }    )
           let subElement3  = EbkUI.createAndAppendElement({container: grid1, properties: {textContent : 'subElement3'}, elementType: "div"  }    )
    
           let subElement4  = EbkUI.createAndAppendElement({container: grid1, properties: {textContent : 'subElement1'}, elementType: "div"  }    )
           let subElement5  = EbkUI.createAndAppendElement({container: grid1, properties: {textContent : 'subElement2'}, elementType: "div"  }    )
           let subElement6  = EbkUI.createAndAppendElement({container: grid1, properties: {textContent : 'subElement3'}, elementType: "div"  }    )
 
    
              
    
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
            ops.objects.stor.lightcolors.data = new Float32Array([.5, .8,  0]);
            
              
            // Make ui fot data below. 
            // edgeRoughness : [3, 12], -> slider
            // instanceCount : [3, 12], -> slider
            // vertex info(coords, colors), start to end, 
            // instance info(offset, colors, size, phase), start to end,
            // light(positon, color, type[1, n], composition(1..4), intensity, spectre), 
            





       


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


                 //  output.light_incidence =   mx_2d_radial_litghtfactor(lightcoords, vxcoord, 0.5 );

                  output.light_incidence =   mx_2d_litght(lightcoords, vxcoord, 9., 100000000 );


                 return output; 

              }
    

            //   color_blendADD,  color_blendAVG, color_blendMULT , color_blendSCREEN 

              @fragment fn fs(@location(0) color : vec3f, @location(1) light_incidence: f32) -> @location(0) vec4f {
                  return vec4f(  color_blendSCREEN  ( vec3f(light_incidence*lightcolors.r, light_incidence*lightcolors.g,  light_incidence*lightcolors.b), color ), 1);
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