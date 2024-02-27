 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";


Ebk.WEBGPU =  {

    VERTEX_FORMAT: {

        "uint8x2":{ format:"uint8x2"  , type:"unsigned int" ,components:	2, bytesize:	2, wgsltype:"vec2<u32>"},
        "uint8x4":{format:"uint8x4"  ,  type:"unsigned int" ,components:	4, bytesize:	4	, wgsltype:"vec4<u32>"},
        "sint8x2":{format:"sint8x2"  ,  type:"signed int" ,components:	2, bytesize:	2	, wgsltype:"vec2<i32>"},
        "sint8x4":{format:"sint8x4"  ,  type:"signed int" ,components:	4, bytesize:	4	, wgsltype:"vec4<i32>"},
        "unorm8x2":{format:"unorm8x2"  ,  type:"unsigned normalized" ,components:	2, bytesize:	2	, wgsltype:"vec2<f32>"},
        "unorm8x4":{format:"unorm8x4"  ,  type:"unsigned normalized" ,components:	4, bytesize:	4	, wgsltype:"vec4<f32>"},
        "snorm8x2":{format:"snorm8x2"  ,  type:"signed normalized" ,components:	2, bytesize:	2	, wgsltype:"vec2<f32>"},
        "snorm8x4":{format:"snorm8x4"  ,  type:"signed normalized" ,components:	4, bytesize:	4	, wgsltype:"vec4<f32>"},
        "uint16x2":{format:"uint16x2"  ,  type:"unsigned int" ,components:	2, bytesize:	4	, wgsltype:"vec2<u32>"},
        "uint16x4":{format:"uint16x4"  ,  type:"unsigned int" ,components:	4, bytesize:	8	, wgsltype:"vec4<u32>"},
        "sint16x2":{format:"sint16x2"  ,  type:"signed int" ,components:	2, bytesize:	4	, wgsltype:"vec2<i32>"},
        "sint16x4":{format:"sint16x4"  ,  type:"signed int" ,components:	4	, bytesize:8	, wgsltype:"vec4<i32>"},
        "unorm16x2":{format:"unorm16x2"  , type:"unsigned normalized" ,components:	2, bytesize:	4	, wgsltype:"vec2<f32>"},
        "unorm16x4":{format:"unorm16x4"  ,  type:"unsigned normalized" ,components:	4, bytesize:	8	, wgsltype:"vec4<f32>"},
        "snorm16x2":{format:"snorm16x2"  ,  type:"signed normalized" ,components:	2, bytesize:	4	, wgsltype:"vec2<f32>"},
        "snorm16x4":{format:"snorm16x4"  ,  type:"signed normalized" ,components:	4, bytesize:	8	, wgsltype:"vec4<f32>"},
        "float16x2":{format:"float16x2"  ,  type:"float" ,components:	2, bytesize:	4	, wgsltype:"vec2<f16>"},
        "float16x4":{format:"float16x4"  ,  type:"float" ,components:	4, bytesize:	8	, wgsltype:"vec4<f16>"},
        "float32":{format:"float32"  , 	 type:"float" ,components:	1, bytesize:	4	, wgsltype:"f32"},
        "float32x2":{format:"float32x2"  , type:"float" ,components:	2, bytesize:	8	, wgsltype:"vec2<f32>"},
        "float32x3":{format:"float32x3"  ,  type:"float" ,components:	3, bytesize:	12	, wgsltype:"vec3<f32>"},
        "float32x4":{format:"float32x4"  ,  	type:"float" ,components:	4, bytesize:	16	, wgsltype:"vec4<f32>"},
        "uint32":{format:"uint32"  ,  	type:"unsigned int" ,components:	1, bytesize:	4	, wgsltype:"u32"},
        "uint32x2":{format:"uint32x2"  , type:"unsigned int" ,components:	2, bytesize:	8	, wgsltype:"vec2<u32>"},
        "uint32x3":{format:"uint32x3"  ,  type:"unsigned int" ,components:	3, bytesize:	12	, wgsltype:"vec3<u32>"},
        "uint32x4":{format:"uint32x4"  ,  type:"unsigned int" ,components:	4, bytesize:	16	, wgsltype:"vec4<u32>"},
        "sint32":{format:"sint32"  ,  type:"signed int" ,components:	1, bytesize:	4	, wgsltype:"i32"},
        "sint32x2":{format:"sint32x2"  , type:"signed int" ,components:	2, bytesize:	8	, wgsltype:"vec2<i32>"},
        "sint32x3":{format:"sint32x3"  ,  type:"signed int" ,components:	3, bytesize:	12	, wgsltype:"vec3<i32>"},
        "sint32x4":{format:"sint32x4"  ,  type:"signed int" ,components:	4, bytesize:	16	, wgsltype:"vec4<i32>"},
        "unorm10-10-10-2":{format:"unorm10-10-10-2"  , type:"unsigned normalized" ,components:	4, bytesize:	4	, wgsltype:"vec4<f32>"}
    
      }  ,
    
      vertexFormatValue : (format,attr) => {
      
        return Ebk.WEBGPU.VERTEX_FORMAT[format][attr];
    
      }
    

    
}

let EbkWEBGPU = Ebk.WEBGPU

export {EbkWEBGPU}
export default EbkWEBGPU;