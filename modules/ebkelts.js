 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.   All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
//    ebkelts.js, Ebika/elements


class Framing {

    locate({
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
  
}

class EbkEls {
    static createFraming() {
      return new Framing();
    } 
}

    
  
// // Exporting the library for use in different environments
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//     module.exports = EbkEls;
// } else {
//     window.EbkEls = EbkEls;
// }
  
export {EbkEls}