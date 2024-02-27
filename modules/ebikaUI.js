 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";


Ebk.UI =  {


    createAndAppendElement : (params={container: {}, properties: {}, elementType: "div"  }    ) => {
        // Parameter checks
        // if (!params || !params.container || !params.properties || typeof params.properties !== 'object' || typeof params.elementType !== 'string') {
        //   console.error('Invalid parameters. Expected an object with container and properties.');
        //   return null;
        // }   
      
        //= {container:{}, properties: {},  }
        // Create a new element based on the specified type
        let newElement = document.createElement(params.elementType);
      
        // Set properties for the new element
        for (var key in params.properties) {
          if (params.properties.hasOwnProperty(key)) {
            newElement[key] = params.properties[key];
      
      
            if (params.properties.style) {
              let styleString = Object.entries(params.properties.style)
                .map(([key1, value1]) => `${key1}: ${value1}`)
                .join(';');
                newElement.setAttribute('style', styleString);
            } 
      
          }
        }
      
        // Append the new element to the specified container
        params.container.appendChild(newElement);
      
        // Return the created element
        return newElement;
    } , 


    // Function to create a labeled <input> element with a container and properties
    createElement_LabeledInput : (params= {
 
        container: {},
        // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
        labelProperties: { style: { color: 'blue' }, text: 'Select Label' },
        inputProperties: { id: 'mySelect', style: { width: '150px' } }
     }) =>{
  
  
    // Create a container div with specified properties
    // let containerDiv = createAndAppendElement({container: params.container, properties : params.divProperties, elementType: "div" });
  
    // Create a <label> element with specified properties
    let labelElement = Ebk.UI.createAndAppendElement({container:  params.container, properties : params.labelProperties, elementType: 'label'});
    labelElement.textContent = params.labelProperties.text || '';
  
    // Create a <select> element with specified properties
  
    let inputElement = Ebk.UI.createAndAppendElement({container: labelElement, properties : params.inputProperties, elementType: 'input'});
  
  
    // Return the created container div
    return {inputElement, labelElement};
  } ,

  createElement_LabeledVertexInputs : (params= {
 
    container: {},
    // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
    labelProperties: { style: { color: 'blue', display: "block" }, text: 'Select Label' },
    colorProperties:  { type:"color", style: { width: '10px' } },
    inputsProperties: [{ type:"range", min:"0", max:"1", value:"0", step:"0.01" , style: { width: '10px' } },
                       { type:"range", min:"0", max:"1", value:"0", step:"0.01" , style: { width: '10px' } }
                     ] 
   }) =>{
  
  
    // Create a container div with specified properties
    // let containerDiv = createAndAppendElement({container: params.container, properties : params.divProperties, elementType: "div" });
  
    // Create a <label> element with specified properties
    let labelElement = Ebk.UI.createAndAppendElement({container:  params.container, properties : params.labelProperties, elementType: 'label'});
    labelElement.textContent = params.labelProperties.text || '';
  
    // Create a <select> element with specified properties
    let colorElt =  Ebk.UI.createAndAppendElement({container: labelElement, properties : params.colorProperties, elementType: 'input'})
  
    let coordsEltEntries=  [Ebk.UI.createAndAppendElement({container: labelElement, properties : params.inputsProperties[0], elementType: 'input'}),
                            Ebk.UI.createAndAppendElement({container: labelElement, properties : params.inputsProperties[1], elementType: 'input'})
                        ];
   
  
    // Return the created container div
    return {x: coordsEltEntries[0], y: coordsEltEntries[1], color: colorElt, labelElement};
  }  ,


  createElement_LabeledSelect : (params= {
 
    options: [
      { value: 'option1', textContent: 'Option 1' },
      { value: 'option2', textContent: 'Option 2' },
      { value: 'option3', textContent: 'Option 3' },
      { value: 'option4', textContent: 'Option 4' }
    ],
    container: {},
    // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
    labelProperties: { style: { color: 'blue' }, text: 'Select Label' },
    selectProperties: { id: 'mySelect', style: { width: '150px' } }
  }) =>{
  
  
    // Create a container div with specified properties
    // let containerDiv = createAndAppendElement({container: params.container, properties : params.divProperties, elementType: "div" });
  
    // Create a <label> element with specified properties
    let labelElement= Ebk.UI.createAndAppendElement({container:  params.container, properties : params.labelProperties, elementType: 'label'});
    labelElement.textContent = params.labelProperties.text || '';
  
    // Create a <select> element with specified properties
  
    let selectElement= Ebk.UI.createAndAppendElement({container: labelElement, properties : params.selectProperties, elementType: 'select'});
  
    // Append the <select> element to the <label>
    // labelElement.appendChild(selectElement);
  
    // Iterate over the options and create <option> elements
    params.options.forEach(function (option) {
        Ebk.UI.createAndAppendElement({container: selectElement, properties : option, elementType: 'option'});
    });
  
    // Return the created container div
    return {selectElement, labelElement};
  }


}

let EbkUI = Ebk.UI

export {EbkUI}
export default EbkUI;