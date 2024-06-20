 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.   All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
//    ebkelts.js, Ebika/elements




class Tests {

    static getStaticMethodsOfClass(cls) {
      const methodNames = Object.getOwnPropertyNames(cls);
      
      return methodNames.filter((methodName) => {
        const method = cls[methodName];
        return typeof method === "function" && methodName !== "prototype";
      });
    }

 
    static getPublicMethodOfClass(instance) {
      const prototype = Object.getPrototypeOf(instance);
      const methodNames = Object.getOwnPropertyNames(prototype);
      
      return methodNames.filter((methodName) => {
        const method = prototype[methodName];
        return typeof method === "function" && methodName !== "constructor";
      });
    }

    static testStaticMethods (objectName,params ={range:[0.,1.]}){
      
      this.getStaticMethodsOfClass(objectName).forEach(key =>{
          if((key !==`tests`)&&(key !==`test`)){
            if (typeof objectName[key] === "function")  console.log(`-->` ,key, `:` ,objectName[key](params));
          }
  
      });
    }

    static testStaticMethodsParamsOptions (objectName,paramsOptions = [ {dfdf:2} , {el:6}, {derr:56}] ){
      
      console.log(`Class:${objectName.name},  Multi-options params tests`);   

      paramsOptions.forEach((key,op) =>{
      
        console.log(`--------------------------------------`); 
        console.log(`paramsOption[${op}] = ${JSON.stringify(key)}`);
        this.testStaticMethods(objectName,key);
        console.log(`--------------------------------------`);
  
      });
    }
}


class Validation {
    static object(value, name) {
      if (typeof value !== 'object' || Array.isArray(value) || value === null) {
        throw new Error(`${name} must be an object`);
      }
    }
  
    static arrayOf(arr, validator, name) {
      if (!Array.isArray(arr)) {
        throw new Error(`${name} must be an array`);
      }
      arr.forEach((item, index) => {
        try {
          validator(item, `${name}[${index}]`);
        } catch (error) {
          throw new Error(error.message);
        }
      });
    }
  
    static number(value, name) {
      if (typeof value !== 'number' || isNaN(value)) {
        throw new Error(`${name} must be a number`);
      }
    }
  
    static integer(value, name) {
      if (!Number.isInteger(value)) {
        throw new Error(`${name} must be an integer`);
      }
    }

    static unEqual(value1, value2, name1, name2) {
      if (  value1 === value2 ) {
        throw new Error(`${name1} (${value1}) and ${name2}(${value2}) must be equal`);
      }
    }
}
  
class Framing {

    static transpose({ 

        src:  { 
            frame: srcFrame = [1, 6], 
            value: srcValue = 125 
        } = {}, 
        dst: { 
            frame: dstFrame = [2, 300] 
        } = {} 

        } = {}) {
        try {

            let vld = Validation;

            // Validate src and dst objects
            vld.object({ frame: srcFrame, value: srcValue }, 'src');
            vld.object({ frame: dstFrame }, 'dst');
    
            // Validate src properties
            vld.arrayOf(srcFrame, vld.number, 'src.frame');
            vld.number(srcValue, 'src.value');
            
            // Validate dst properties
            vld.arrayOf(dstFrame,  vld.number, 'dst.frame');

            vld.unEqual(srcFrame[0],  srcFrame[1],  "srcFrame[0]", "srcFrame[1]");
              
      
            return  (((srcValue-srcFrame[0])/ ( srcFrame[1] - srcFrame[0] ) )* ( dstFrame[1] - dstFrame[0] ))+dstFrame[0];

        } catch (error) {
            console.error(error.message);
            return  `Class:Framing/transpose: ${error.message}`;
        }
    }

    static transposeClamp({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          value: srcValue = 125 
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          // Validate src and dst objects
          vld.object({ frame: srcFrame, value: srcValue }, 'src');
          vld.object({ frame: dstFrame }, 'dst');
  
          // Validate src properties
          vld.arrayOf(srcFrame, vld.number, 'src.frame');
          vld.number(srcValue, 'src.value');
          
          // Validate dst properties
          vld.arrayOf(dstFrame,  vld.number, 'dst.frame');

          vld.unEqual(srcFrame[0],  srcFrame[1],  "srcFrame[0]", "srcFrame[1]");


          let tpse = this.transpose({ 

            src:  { 
                frame: srcFrame, 
                value: srcValue 
            }, 
            dst: { 
                frame: dstFrame
            }
    
          });
            

          let result; 

          if (dstFrame[0] < dstFrame[1] ) {
            result  = (tpse < dstFrame[0]  ) ? dstFrame[0] : (tpse > dstFrame[1]  ) ? dstFrame[1] : tpse
          } 
            
          else {
            result  = (tpse < dstFrame[1]  ) ? dstFrame[1] : (tpse > dstFrame[0]  ) ? dstFrame[0] : tpse
          }  
    
          return result;

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClamp: ${error.message}`;
      }
    }

    static unit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          value: srcValue = 125 
      } = {}, 

      } = {}) {
      try {

          let vld = Validation;
          // Validate src and dst objects
          vld.object({ frame: srcFrame, value: srcValue }, 'src');

          // Validate src properties
          vld.arrayOf(srcFrame, vld.number, 'src.frame');
          vld.number(srcValue, 'src.value');
          
    
          return  this.transpose({ 

            src:  { 
                frame: srcFrame, 
                value: srcValue 
            }, 
            dst: { 
                frame: [0., 1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }
     
    static unitClamp({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          value: srcValue = 125 
      } = {}, 

      } = {}) {
      try {

          let vld = Validation;
          // Validate src and dst objects
          vld.object({ frame: srcFrame, value: srcValue }, 'src');

          // Validate src properties
          vld.arrayOf(srcFrame, vld.number, 'src.frame');
          vld.number(srcValue, 'src.value');
          
    
          return  this.transposeClamp({ 

            src:  { 
                frame: srcFrame, 
                value: srcValue 
            }, 
            dst: { 
                frame: [0., 1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }

    static negUnit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          value: srcValue = 125 
      } = {}, 

      } = {}) {
      try {

          let vld = Validation;
          // Validate src and dst objects
          vld.object({ frame: srcFrame, value: srcValue }, 'src');

          // Validate src properties
          vld.arrayOf(srcFrame, vld.number, 'src.frame');
          vld.number(srcValue, 'src.value');
          
    
          return  this.transpose({ 

            src:  { 
                frame: srcFrame, 
                value: srcValue 
            }, 
            dst: { 
                frame: [-1., 0.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }
     
    static negUnitClamp({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          value: srcValue = 125 
      } = {}, 

      } = {}) {
      try {

          let vld = Validation;
          // Validate src and dst objects
          vld.object({ frame: srcFrame, value: srcValue }, 'src');

          // Validate src properties
          vld.arrayOf(srcFrame, vld.number, 'src.frame');
          vld.number(srcValue, 'src.value');
          
    
          return  this.transposeClamp({ 

            src:  { 
                frame: srcFrame, 
                value: srcValue 
            }, 
            dst: { 
                frame: [-1., 0.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }

    static description() {
        
      return  [
           {method: `transpose()` ,
            description: `Transpose a variable from one interval to another.` , 
            input: {  src:  {  frame: [1, 6],  value: 125 }, 
                      dst:  { frame: [2, 300] } 
                   }, 
            output: `real`     
           }
       ];


    }

    static tests(params) {
      Tests.testStaticMethodsParamsOptions(this, params);
    } 

  
}

class EbkEls {
    static createFraming() {
      return new Framing();
    } 

    static Tests = Tests;
    static Validation = Validation;
    static Framing  =  Framing;

}

    
  
// // Exporting the library for use in different environments
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//     module.exports = EbkEls;
// } else {
//     window.EbkEls = EbkEls;
// }
  
export {EbkEls}