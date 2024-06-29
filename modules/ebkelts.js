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

    static arrayOfArraysOf(arr, validator, name) {
      if (!Array.isArray(arr)) {
        throw new Error(`${name} must be an array`);
      }
      arr.forEach((item) => {
        try {
          this.arrayOf(item, validator, name);
        } catch (error) {
          throw new Error(`${name} must be an array of arrays`);
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


    static transposeValue({ 

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
        return  `Class:Framing/transposeValue: ${error.message}`;
    }
    }

    static transposeValues({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transpose( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              } , 
              dst: { 
                  frame: dstFrame  
              }  
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeValues: ${error.message}`;
      }
    }

    static transposeVector({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1 , 1], [0, 5] ], 
          vector: srcVector = [1, 2, 9]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11 , 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOf(srcVector,  vld.number, 'src.vector');

          if (!(srcVector.length === srcVectorFrame.length)
            ||!(srcVector.length === dstVectorFrame.length)
            ||!(srcVectorFrame.length === dstVectorFrame.length)) {
            throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
          }

          let result = [];

          srcVector.forEach( (value, ndx) => {
            
            result.push(
               this.transpose({ 
                src:  { 
                    frame: srcVectorFrame[ndx], 
                    value: value
                } , 
                dst: { 
                    frame: dstVectorFrame[ndx]
                } 
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeVector: ${error.message}`;
      }
    }

    static transposeVectors({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1 , 1], [0, 5] ], 
          vectors: srcVectors = [[1, 2, 9], [-2, 0, 1], [5, 0.78, 4]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11 , 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');


          // if (!(srcVector.length === srcVectorFrame.length)
          //   ||!(srcVector.length === dstVectorFrame.length)
          //   ||!(srcVectorFrame.length === dstVectorFrame.length)) {
          //   throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
          // }

          let result = [];

          srcVectors.forEach( (value, ndx) => {
            
            result.push(
               this.transposeVector({ 
                src:  { 
                  vectorFrame: srcVectorFrame, 
                  vector: value
                } , 
                dst: { 
                  vectorFrame: dstVectorFrame
                } 
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeVectors: ${error.message}`;
      }
    }

    static transposeClampValue({ 

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
          return  `Class:Framing/transposeClampValue: ${error.message}`;
      }
    }

    static transposeClampValues({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeClamp( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              } , 
              dst: { 
                  frame: dstFrame  
              }  
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValues: ${error.message}`;
      }
    }

    static transposeClampVector({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1 , 1], [0, 5] ], 
          vector: srcVector = [1, 2, 9]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11 , 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOf(srcVector,  vld.number, 'src.vector');

          if (!(srcVector.length === srcVectorFrame.length)
            ||!(srcVector.length === dstVectorFrame.length)
            ||!(srcVectorFrame.length === dstVectorFrame.length)) {
            throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
          }

          let result = [];

          srcVector.forEach( (value, ndx) => {
            
            result.push(
               this.transposeClamp({ 
                src:  { 
                    frame: srcVectorFrame[ndx], 
                    value: value
                } , 
                dst: { 
                    frame: dstVectorFrame[ndx]
                } 
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVector: ${error.message}`;
      }
    }

    static transposeClampVectors({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1 , 1], [0, 5] ], 
          vectors: srcVectors = [[1, 2, 9], [-2, 0, 1], [5, 0.78, 4]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11 , 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');


          // if (!(srcVector.length === srcVectorFrame.length)
          //   ||!(srcVector.length === dstVectorFrame.length)
          //   ||!(srcVectorFrame.length === dstVectorFrame.length)) {
          //   throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
          // }

          let result = [];

          srcVectors.forEach( (value, ndx) => {
            
            result.push(
               this.transposeClampVector({ 
                src:  { 
                  vectorFrame: srcVectorFrame, 
                  vector: value
                } , 
                dst: { 
                  vectorFrame: dstVectorFrame
                } 
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVectors: ${error.message}`;
      }
    }

    static transposeValueToUnit({ 

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
          return  `Class:Framing/transposeValueToUnit: ${error.message}`;
      }
    }

    static transposeValueToNegUnit({ 

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
                frame: [0., -1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeValueToUnit: ${error.message}`;
      }
    }

    static transposeValueToSymUnit({ 

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
                frame: [-1, 1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeValueToUnit: ${error.message}`;
      }
    }

    static transposeValuesToUnit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeValueToUnit( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              } 
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeValues: ${error.message}`;
      }
    }

    static transposeValuesToNegUnit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeValueToNegUnit( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              } 
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeValues: ${error.message}`;
      }
    }

    static transposeValuesToSymUnit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeValueToSymUnit( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              } 
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeValues: ${error.message}`;
      }
    }



    
    static transposeClampValueToUnit({ 

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
          
    
          return  this.transposeClampValue({ 

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
          return  `Class:Framing/transposeClampValueToUnit: ${error.message}`;
      }
    }







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

    static transposeArray({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transpose( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              } , 
              dst: { 
                  frame: dstFrame  
              }  
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeArray: ${error.message}`;
      }
    }

    static transposeClampArray({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}, 
      dst: { 
          frame: dstFrame = [2, 300] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeClamp( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              } , 
              dst: { 
                  frame: dstFrame  
              }  
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeArray: ${error.message}`;
      }
    }

    static transposeVector({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1 , 1], [0, 5] ], 
          vector: srcVector = [1, 2, 9]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11 , 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'vectorFrame.srcVectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'vectorFrame.dstVectorFrame');
          vld.arrayOf(srcVector,  vld.number, 'src.vector');

          if (!(srcVector.length === srcVectorFrame.length)
            ||!(srcVector.length === dstVectorFrame.length)
            ||!(srcVectorFrame.length === dstVectorFrame.length)) {
            throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
          }

          let result = [];

          srcVector.forEach( (value, ndx) => {
            
            result.push(
               this.transpose({ 
                src:  { 
                    frame: srcVectorFrame[ndx], 
                    value: value
                } , 
                dst: { 
                    frame: dstVectorFrame[ndx]
                } 
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeArray: ${error.message}`;
      }
    }

    static transposeVectorClamp({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1 , 1], [0, 5] ], 
          vector: srcVector = [1, 2, 9]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11 , 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'vectorFrame.srcVectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'vectorFrame.dstVectorFrame');
          vld.arrayOf(srcVector,  vld.number, 'src.vector');

          if (!(srcVector.length === srcVectorFrame.length)
            ||!(srcVector.length === dstVectorFrame.length)
            ||!(srcVectorFrame.length === dstVectorFrame.length)) {
            throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
          }

          let result = [];

          srcVector.forEach( (value, ndx) => {
            
            result.push(
               this.transposeClamp({ 
                src:  { 
                    frame: srcVectorFrame[ndx], 
                    value: value
                } , 
                dst: { 
                    frame: dstVectorFrame[ndx]
                } 
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeArray: ${error.message}`;
      }
    }


    static toUnit({ 

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
  
    static toNegUnit({ 

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
                frame: [0., -1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }
  
    static toSymUnit({ 

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
                frame: [-1., 1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }
  
  
    static toUnitClamp({ 

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

    static toNegUnitClamp({ 

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
                frame: [0., -1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }
  
    static toSymUnitClamp({ 

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
                frame: [-1., 1.] 
            } 
    
            } );

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/normalize: ${error.message}`;
      }
    }

   
   

    static transpose__desc() {
      try {

          return { input: { 
            
            src:  { 
                frame: [1, 6], 
                value: 125 
            } ,  
            dst: { 
                frame: [2, 300] 
             }  
      
          } ,

          method: `transpose()` ,
          description: `Transpose a variable from one interval to another.` , 
          output: `real`     
        
         }

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transpose: ${error.message}`;
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
     // console.log(Tests.getParametersWithDefaults(this.transpose()));

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