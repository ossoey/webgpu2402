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

        return Ebk.Colors.rgbaToGrayScale(params) / 255 ;

    } ,

    hexaToRGB : (params)=> {

        const hexa = params.hexaColor.substring(1); // Remove the leading '#'
        const r = parseInt(hexa.substring(0, 2), 16);
        const g = parseInt(hexa.substring(2, 4), 16);
        const b = parseInt(hexa.substring(4, 6), 16);
        return [r, g, b]; 
    } , 

    hexToRGBNrmzd : ( params )=> {

        const [r, g, b] = Ebk.Colors.hexaToRGB(params) ;

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
    }, 

    shaderUtils: `
        
        fn color_blendAVG(colorA: vec3f, colorB: vec3f  )->vec3f {
            return  (colorA + colorB) / 2;
        }

        fn color_blendADD(colorA: vec3f, colorB: vec3f  )->vec3f {

            return  vec3f(
                    min(colorA.r + colorA.r, 1)
                ,
                    min(colorA.g + colorA.g, 1)
                ,
                    min(colorA.b + colorA.b, 1)
                );
        }

        fn color_blendMULT(colorA: vec3f, colorB: vec3f  )->vec3f {
            return  (colorA * colorB);
        } 

        fn color_blendSCREEN(colorA: vec3f, colorB: vec3f)->vec3f {
 
            return  vec3f(
                1.0 - (1.0 - colorA.r) * (1.0 - colorB.r)
            ,
                1.0 - (1.0 - colorA.g) * (1.0 - colorB.g)
            ,
                1.0 - (1.0 - colorA.b) * (1.0 - colorB.b)
            );
        } 

        fn color_blendOVERLAY(colorA: vec3f, colorB: vec3f )->vec3f {
            //colorA Base color (background) 
            //colorB Blend color (foreground)  

            var colorOutPut: vec3f; 

            var luminance = 0.2126 * colorA.r +  0.7152 * colorA.g + 0.0722 * colorA.b;

            if (luminance < 0.5) {  // "Multiply"
                colorOutPut = color_blendMULT(colorA, colorB);
            } else {  // "screen"
                color_blendSCREEN(colorA, colorB);
            }

            return  colorOutPut;
        } 
            
    `


   
      
    
}

let EbkColors = Ebk.Colors

export {EbkColors}
export default EbkColors;