
import { Ebk} from "../modules/ebika.js";
import { EbkUI} from "../modules/ebikaUI.js";
import { EbkColors} from "../modules/ebikaColors.js";

const circleTriangleStripRandomAttributes = (params = {context:{}}) => {
    let ops = {};

    
    ops.desc = "Circle Triangle Strip Random attributes";
    
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
          ops.ui.circleTriangleStrip.x.value = -0.7;
          ops.ui.circleTriangleStrip.y.value = -0.7;
          
 
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
          ops.ui.circleTriangleStrip1.x.value = 0.7;
          ops.ui.circleTriangleStrip1.y.value = 0.7;
          
 
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
        ops.objects.attr.offsets = {};
        ops.objects.attr.colors = {};

        ops.objects.count = 1; 
        ops.objects.vertexCount = 32; 
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


    ops.getRandomInfo = () => {

        let xmin = Number(ops.ui.circleTriangleStrip.x.value);
        let ymin = Number(ops.ui.circleTriangleStrip.y.value);

        let xmax = Number(ops.ui.circleTriangleStrip1.x.value);
        let ymax = Number(ops.ui.circleTriangleStrip1.y.value);


        let color =  EbkColors.hexToRGBNrmzd( {hexaColor: ops.ui.circleTriangleStrip.color.value } ); 
 
        let color1 =  EbkColors.hexToRGBNrmzd( {hexaColor: ops.ui.circleTriangleStrip1.color.value } ); 
 
 
        let  vertex1 = {};
        vertex1.x =  Ebk.Rand.fRanges({ranges:[[xmin, xmax]], clamps:[[0,1]]}); 
        vertex1.y =  Ebk.Rand.fRanges({ranges:[[ymin, ymax]], clamps:[[0,1]]}); 
        
        vertex1.r =  Ebk.Rand.fRanges({ranges:[[color[0], color1[0]]], clamps:[[0,1]]});
        vertex1.g =  Ebk.Rand.fRanges({ranges:[[color[1], color1[1]]], clamps:[[0,1]]});
        vertex1.b =  Ebk.Rand.fRanges({ranges:[[color[2], color1[2]]], clamps:[[0,1]]});
       


        return vertex1; 
    }

    
 
    // initialiser les données 
    ops.iniData = () => {

        // let circleInfo = ops.getVertexInfo(ops.ui.circleTriangleStrip);

        
        ops.objects.attr.coords.data = new Float32Array(ops.objects.vertexCount*2);
        ops.objects.attr.offsets.data = new Float32Array(ops.objects.count*2);
        ops.objects.attr.colors.data = new Float32Array(ops.objects.count*3);

        
        ops.objects.attr.coords.data[0] = 0.1; 
        ops.objects.attr.coords.data[1] = 0; 
        
        for(let vxndx = 1; vxndx<= ((ops.objects.vertexCount)/2)-1; vxndx++)  {

             let angle = (2*Math.PI/ops.objects.vertexCount)*vxndx; 

            ops.objects.attr.coords.data[4*(vxndx - 1)+2] = 0.1*Math.cos(angle); 
            ops.objects.attr.coords.data[4*(vxndx - 1)+3] = -0.1*Math.sin(angle);
            ops.objects.attr.coords.data[4*(vxndx - 1)+4] = 0.1*Math.cos(angle);
            ops.objects.attr.coords.data[4*(vxndx - 1)+5] = 0.1*Math.sin(angle); 
        }

        ops.objects.attr.coords.data[2*ops.objects.vertexCount -2] = -0.1; 
        ops.objects.attr.coords.data[2*ops.objects.vertexCount -1] = 0; 
        

        

        for(let indx = 0; indx<ops.objects.count; indx++)  {

            let circleInfo = ops.getRandomInfo();

            ops.objects.attr.offsets.data[2*indx] = circleInfo.x 
            ops.objects.attr.offsets.data[2*indx+1] = circleInfo.y; 

            ops.objects.attr.colors.data[3*indx] = circleInfo.r; 
            ops.objects.attr.colors.data[3*indx+1] = circleInfo.g; 
            ops.objects.attr.colors.data[3*indx+2] = circleInfo.b; 

        }    

        ops.env.shaderCode = `
        
        struct VertexOut {
            @builtin(position) pos: vec4f, 
            @location(0) color: vec4f, 
        }

        @vertex fn vs(@location(0) coord: vec2f, @location(1) offset: vec2f, @location(2) color: vec3f )-> VertexOut {

          var vertexOut : VertexOut; 
          
          vertexOut.pos = vec4f(coord + offset, 0.0, 1.0);
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
         
        ops.env.vertexBufferLayout = [
            {
               attributes: [{shaderLocation: 0, offset: 0, format:"float32x2"}], 
               arrayStride: 8,
               stepMode: "vertex"
            } , 

            {
                attributes: [{shaderLocation: 1, offset: 0, format:"float32x2"}], 
                arrayStride: 8,
                stepMode: "instance"
             } , 
             {
                attributes: [{shaderLocation: 2, offset: 0, format:"float32x3"}], 
                arrayStride: 12,
                stepMode: "instance"
             } , 

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
                topology: "triangle-strip"
            }
        }

        ops.env.pipeline = ops.env.device.createRenderPipeline(pipelineDesc);

        ops.objects.attr.coords.buffer = ops.env.device.createBuffer({
            size: ops.objects.attr.coords.data.byteLength, 
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.attr.coords.buffer, 0, ops.objects.attr.coords.data);
        

        ops.objects.attr.offsets.buffer = ops.env.device.createBuffer({
            size: ops.objects.attr.offsets.data.byteLength, 
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.attr.offsets.buffer, 0, ops.objects.attr.offsets.data);


        ops.objects.attr.colors.buffer = ops.env.device.createBuffer({
            size: ops.objects.attr.colors.data.byteLength, 
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST

        });

        ops.env.device.queue.writeBuffer( ops.objects.attr.colors.buffer, 0, ops.objects.attr.colors.data);
        
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
        passEncoder.setVertexBuffer(1, ops.objects.attr.offsets.buffer );
        passEncoder.setVertexBuffer(2, ops.objects.attr.colors.buffer );
        passEncoder.draw(ops.objects.vertexCount, ops.objects.count);
        passEncoder.end();

        let commandBuffer = commandEncoder.finish();

        ops.env.device.queue.submit([commandBuffer]);
        
    }


    // Modifer le frame 


    // Déclencher l'animation


    // Exécuter le programme. 


    ops.instanceChange = () => {


        // let circleInfo = ops.getVertexInfo(ops.ui.circleTriangleStrip);
        let circleInfo = ops.getRandomInfo();

        ops.objects.attr.offsets.data = new Float32Array([
            circleInfo.x, circleInfo.y
        ]); 

        ops.objects.attr.colors.data = new Float32Array([
            circleInfo.r, circleInfo.g , circleInfo.b
        ]); 

         
        ops.env.device.queue.writeBuffer(  ops.objects.attr.offsets.buffer, 0,  ops.objects.attr.offsets.data);
        ops.env.device.queue.writeBuffer(  ops.objects.attr.colors.buffer, 0,  ops.objects.attr.colors.data);

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

        ops.ui.circleTriangleStrip.color.oninput = ops.instanceChange;
        ops.ui.circleTriangleStrip.x.oninput = ops.instanceChange;
        ops.ui.circleTriangleStrip.y.oninput = ops.instanceChange;

        ops.ui.circleTriangleStrip1.color.oninput = ops.instanceChange;
        ops.ui.circleTriangleStrip1.x.oninput = ops.instanceChange;
        ops.ui.circleTriangleStrip1.y.oninput = ops.instanceChange;
        
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

        // Release the vertex buffer
        if (ops.objects.attr.offsets.buffer) {
            ops.objects.attr.offsets.buffer.destroy();
            ops.objects.attr.offsets.buffer = null;
        }

        // Release the vertex buffer
        if (ops.objects.attr.colors.buffer) {
            ops.objects.attr.colors.buffer.destroy();
            ops.objects.attr.colors.buffer = null;
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


export {circleTriangleStripRandomAttributes}
export default circleTriangleStripRandomAttributes;