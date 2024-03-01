import { EbkUI} from "../modules/ebikaUI.js";

const triangle = (params = {context:{}}) => {
    let ops = {};
    
    ops.desc = "Triangle";
    ops.ui = {};
    ops.env = {};
    ops.objects = {};
     
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


    }
    
    ops.release = () =>{

    }


    ops.run = () =>{
        ops.createUI();
    }


    return {

        desc: ops.desc, 

        releaseResources: () => {
           ops.release(); 
        } , 

        run : () =>{
            ops.run();
        }
    };
}


export {triangle}
export default triangle;