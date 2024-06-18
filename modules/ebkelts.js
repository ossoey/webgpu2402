 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.   All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
//    ebkelts.js, Ebika/elements


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
}
  
class Framing {

    static locate({
        src: {
          frame: srcFrame = [1, 6] ,
          value: srcValue = 125
        } = {},
        dst: {
          frame: dstFrame = [2, 300] 
        } = {}
        } = {}) {
        console.log("srcFrame:", srcFrame);
        console.log("srcValue:", srcValue);
        console.log("dstFrame:", dstFrame);
    }
 
    static locate1({ 

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
    
            if (  srcFrame[1] === srcFrame[0] ) {
                throw new Error(`${srcFrame[1],", " ,srcFrame[0] } must be different`);
            }

            console.log('src.frame:', srcFrame);
            console.log('src.value:', srcValue);
            console.log('dst.frame:', dstFrame);

           return  ((srcValue-srcFrame[0])/ ( srcFrame[1] - srcFrame[0] ) )* ( dstFrame[1] - dstFrame[0] ) +  srcFrame[0];

        } catch (error) {
            console.error(error.message);
        }
    }
     

  
}

class EbkEls {
    static createFraming() {
      return new Framing();
    } 

    static Framing  =  Framing;

    static Validation = Validation;
}

    
  
// // Exporting the library for use in different environments
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//     module.exports = EbkEls;
// } else {
//     window.EbkEls = EbkEls;
// }
  
export {EbkEls}