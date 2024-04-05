 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";

Ebk.Geometry = {};



/////// Ebk.ClassModel
Ebk.Geometry.Polygon = class EbkGeometryPolygon {
    #params;
    #process;
  
    
    constructor(params ={ beltVtxCount: 6 }) {
               
        this.name = `Ebk.Geometry.Polygon`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );
        this.#cirFndVtxCountGen();

  
    }
    
    _update(params = { beltVtxCount: 6 }){
        
        this.#params =  Object.assign(this.#params,  params );
        this.#cirFndVtxCountGen(); 
                
    }


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

    belt(params = {beltNdx :0}){
        return Ebk.Sequence.GridWholeNumber.dataGetSum({step:params.beltNdx}); 
    }

    #cirFndVtxCountGen(){
        this.cirFndVtxCount =    this.belt({beltNdx: this.#params.beltVtxCount});
    }

    #circleCoords(cirNdx, phase = 0){
        let angle = phase + 2 * Math.PI * (cirNdx/ this.cirFndVtxCount-1);
          
         return {x : Math.cos(angle), y: Math.sin(angle)};
    }

    coords( params = {beltNdx : 0, phase:0}) {
        return this.#circleCoords(this.belt({beltNdx: params.beltNdx}), params.phase );
    }

    vtxCount( ) {
        return {indexed: this.#params.beltVtxCount + 1, uIndexed: this.#params.beltVtxCount * 3  }
    }

    #compOfDataUindexed( params = {beltNdx : 0, phase:0}) {
         
        let curr = {}, next = {}, ctr = {x: 0, y: 0};

        curr =  this.coords({beltNdx : params.beltNdx, phase: params.phase});

        if (params.beltNdx < this.#params.beltVtxCount -1) {
            next =  this.coords({beltNdx : params.beltNdx + 1, phase: params.phase});
        } else {

            next =  this.coords({beltNdx : 0, phase: params.phase});
        }

        return { curr, next, ctr}
    }

    #compOfDataIndexed( params = {beltNdx : 0, phase:0}) {
        let curr = {},  ctr = {x: 0, y: 0};
        curr =  this.coords({beltNdx : params.beltNdx, phase: params.phase});
        return { curr, ctr} 
    }

    compOfData( params = {beltNdx : 0, phase:0}) {
        return {indexed: this.#compOfDataUindexed({beltNdx : params.beltNdx, phase: params.phase}),
                uIndexed: this.#compOfDataIndexed({beltNdx : params.beltNdx, phase: params.phase})  }
    }
}  

Ebk.Geometry.Polygon.ClassModelTests = (paramsTestOptions =[
    
    {
        creation:  { beltVtxCount: 6, beltNdx :0,  phase:0 } , 

        update:  { beltVtxCount: 6, beltNdx :0,  phase:0 }  , 
    
    }
    
    ] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.Polygon, paramsTestOptions, exceptions );

}


let EbkGeometry = Ebk.Geometry

export {EbkGeometry}
export default EbkGeometry;