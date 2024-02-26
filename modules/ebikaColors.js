 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";


Ebk.Colors =  {


    normalized : (params)=> {

        const [r, g, b, a] = params.color ;

        return [ Math.floor(r * 255), Math.floor(g / 255), Math.floor(b / 255), Math.floor(a / 255)];

    } ,

    normalTo255 : (params)=> {

        const [r, g, b, a] = params.color ;

        return [ r / 255, g / 255, b / 255, a / 255];

    } ,

    rgbaToGrayScale : (params)=> {

        const [r, g, b, a] = params.color ;

        return Math.round((1-a)*255 + a * (0.299 * r + 0.587 * g + 0.114 * b));

    } ,

    rgbaToGrayScaleNrmzd : (params)=> {

        return rgbaToGrayScale(params) / 255 ;

    } ,

    hexaToRGB : (params)=> {

        const hexa = params.hexaColor.substring(1); // Remove the leading '#'
        const r = parseInt(hexa.substring(0, 2), 16);
        const g = parseInt(hexa.substring(2, 4), 16);
        const b = parseInt(hexa.substring(4, 6), 16);
        return [r, g, b]; 
    } , 

    hexToRGBNrmzd : ( params )=> {

        const [r, g, b] = this.hexaToRGB(params) ;

        return  [r/255, g/255, b/255];
    } , 

    rgbToHexa : (params) => {
         
        let [r, g, b] = params.color

        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
      
        // Convert each component to hexadecimal and concatenate
        const hexRed = r.toString(16).padStart(2, '0');
        const hexGreen = g.toString(16).padStart(2, '0');
        const hexBlue = b.toString(16).padStart(2, '0');
      
        // Combine the components to form the hexadecimal color code
        const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;
      
        return hexColor.toUpperCase(); // Convert to uppercase for consistency
    }
      
    
         
}

let EbkColors = Ebk.Colors

export {EbkColors}
export default EbkColors;