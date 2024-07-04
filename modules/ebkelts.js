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
      
       let funcCount = 0;
      this.getStaticMethodsOfClass(objectName).forEach(key =>{
          if((key !==`tests`)&&(key !==`test`)){
            if (typeof objectName[key] === "function")  console.log(`-->` ,key, `:` ,objectName[key](params));
          }
          funcCount++;
      });

        console.log(`Class method count : ${funcCount}`);
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
          
    
          return  this.transposeValue({ 

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
          
    
          return  this.transposeValue({ 

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
          
    
          return  this.transposeValue({ 

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
          return  `Class:Framing/transposeValueToSymUnit: ${error.message}`;
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

            result.push( this.transposeValue( { 

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
          return  `Class:Framing/transposeValuesToUnit: ${error.message}`;
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
          return  `Class:Framing/transposeValuesToSymUnit: ${error.message}`;
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
               this.transposeValue({ 
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

    static transposeVectorToUnit({ 

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
               this.transposeValueToUnit({ 
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

    static transposeVectorToNegUnit({ 

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
               this.transposeValueToNegUnit({ 
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
          return  `Class:Framing/transposeVectorToNegUnit: ${error.message}`;
      }
    }

    static transposeVectorToSymUnit({ 

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
               this.transposeValueToSymUnit({ 
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
          return  `Class:Framing/transposeVectorToSymUnit: ${error.message}`;
      }
    }


    static transposeVectors({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeVector({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
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

    static transposeVectorsToUnit({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeVectorToUnit({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
                }  
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeVectorsToUnit: ${error.message}`;
      }
    }

    static transposeVectorsToNegUnit({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeVectorToNegUnit({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
                }
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeVectorsToNegUnit: ${error.message}`;
      }
    }

    static transposeVectorsToSymUnit({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeVectorToSymUnit({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
                }
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeVectorsToSymUnit: ${error.message}`;
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
            

          let transposed = this.transposeValue({ 

            src:  { 
                frame: srcFrame , 
                value: srcValue 
            }  , 
            dst: { 
                frame: dstFrame   
            }  
        
            }  );

            if (dstFrame[0] <= dstFrame[1]) {

              return  (transposed <= dstFrame[0]) ? dstFrame[0] :  (transposed >= dstFrame[1]) ? dstFrame[1] : transposed ;

            } else if (dstFrame[0] > dstFrame[1]) {

              return  (transposed <= dstFrame[1]) ? dstFrame[1] :  (transposed >= dstFrame[0]) ? dstFrame[0] : transposed ;

            }
    
              
  
      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValue: ${error.message}`;
      }
    }

    static transposeClampValueToUnit({ 

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
            

          return this.transposeClampValue({ 

            src:  { 
                frame: srcFrame , 
                value: srcValue 
            }  , 
            dst: { 
                frame: [0, 1]   
            }  
        
            } );      
  
      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValueToUnit: ${error.message}`;
      }
    }

    static transposeClampValueToNegUnit({ 

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
            

          return this.transposeClampValue({ 

            src:  { 
                frame: srcFrame , 
                value: srcValue 
            }  , 
            dst: { 
                frame: [0, -1]   
            }  
        
            } );      
  
      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValueToNegUnit: ${error.message}`;
      }
    }

    static transposeClampValueToSymUnit({ 

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
            

          return this.transposeClampValue({ 

            src:  { 
                frame: srcFrame , 
                value: srcValue 
            }  , 
            dst: { 
                frame: [-1, 1]   
            }  
        
            } );      
  
      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValueToSymUnit: ${error.message}`;
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

            result.push( this.transposeClampValue( { 

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

    static transposeClampValuesToUnit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}  

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeClampValueToUnit( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              }  
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValuesToUnit: ${error.message}`;
      }
    }

    static transposeClampValuesToNegUnit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}  

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeClampValueToNegUnit( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              }  
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValuesToNegUnit: ${error.message}`;
      }
    }

    static transposeClampValuesToSymUnit({ 

      src:  { 
          frame: srcFrame = [1, 6], 
          values: srcValues = [1, 7, 9, -1, 2]
      } = {}  

      } = {}) {
      try {

          let vld = Validation;

          
          vld.arrayOf(srcValues, vld.number, 'src.values');
          
          let result = [];

          srcValues.forEach( value => {

            result.push( this.transposeClampValueToSymUnit( { 

              src:  { 
                  frame: srcFrame , 
                  value: value 
              }  
      
            }) );

          });
        
          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampValuesToSymUnit: ${error.message}`;
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
               this.transposeClampValue({ 
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

    static transposeClampVectorToUnit({ 

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
               this.transposeClampValueToUnit({ 
                src:  { 
                    frame: srcVectorFrame[ndx], 
                    value: value
                }  
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVectorToUnit: ${error.message}`;
      }
    }

    static transposeClampVectorToNegUnit({ 

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
               this.transposeClampValueToNegUnit({ 
                src:  { 
                    frame: srcVectorFrame[ndx], 
                    value: value
                }  
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVectorToNegUnit: ${error.message}`;
      }
    }

    static transposeClampVectorToSymUnit({ 

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
               this.transposeClampValueToSymUnit({ 
                src:  { 
                    frame: srcVectorFrame[ndx], 
                    value: value
                }  
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVectorToSymUnit: ${error.message}`;
      }
    }

    static transposeClampVectors({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeClampVector({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
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
          return  `Class:transposeClampVectors: ${error.message}`;
      }
    }

    static transposeClampVectorsToUnit({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeClampVectorToUnit({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
                }  
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVectorsToUnit: ${error.message}`;
      }
    }

    static transposeClampVectorsToNegUnit({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeClampVectorToNegUnit({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
                }  
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVectorsToNegUnit: ${error.message}`;
      }
    }

    static transposeClampVectorsToSymUnit({ 

      src:  { 
          vectorFrame: srcVectorFrame = [[1, 6], [-1, 1], [0, 5] ], 
          vectors: srcVectors = [[1, 5, -1], [0, 8, 9]]
      } = {}, 
      dst: { 
          vectorFrame: dstVectorFrame = [[10, -6], [-11, 101], [50, 15]] 
      } = {} 

      } = {}) {
      try {

          let vld = Validation;

          vld.arrayOfArraysOf(srcVectorFrame,  vld.number, 'src.vectorFrame');
          vld.arrayOfArraysOf(dstVectorFrame ,  vld.number, 'dst.vectorFrame');
          vld.arrayOfArraysOf(srcVectors ,  vld.number, 'src.vectors');

          srcVectors.forEach(elt => {

            if (!(elt.length === srcVectorFrame.length)
              ||!(elt.length === dstVectorFrame.length)
              ||!(srcVectorFrame.length === dstVectorFrame.length)) {
              throw new Error(`src.vectorFrame, dst.vectorFrame and src.vector length must be the equal`)
            }

          }); 

          let result = [];

          srcVectors.forEach( (vector ) => {
            
            result.push(
               this.transposeClampVectorToSymUnit({ 
                src:  { 
                    vectorFrame: srcVectorFrame, 
                    vector: vector
                }  
                } )
            )

          })

          return  result 

      } catch (error) {
          console.error(error.message);
          return  `Class:Framing/transposeClampVectorsToSymUnit: ${error.message}`;
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