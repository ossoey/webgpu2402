 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";

Ebk.Geometry = {};



/////// Ebk.ClassModel
Ebk.Geometry.Polygon = class EbkGeometryPolygon {
    #params;
    #process;
  
    
    constructor(params ={ beltVtxCount: 6, colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, -0.92 ], height: [-0.92, -0.92 ]  }  }) {
               
        this.name = `Ebk.Geometry.Polygon`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );
        
        this.buffers = {};

        this.#cirFndVtxCountGen();

  
    }
    
    _update(params = { beltVtxCount: 6, colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, -0.92 ], height: [-0.92, -0.92 ]  } }){
        
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

    #coordsRecordUindexed( params = {beltNdx : 0, phase:0}) {
         
        let curr = {}, next = {}, ctr = {x: 0, y: 0};

        curr =  this.coords({beltNdx : params.beltNdx, phase: params.phase});

        if (params.beltNdx < this.#params.beltVtxCount -1) {
            next =  this.coords({beltNdx : params.beltNdx + 1, phase: params.phase});
        } else {

            next =  this.coords({beltNdx : 0, phase: params.phase});
        }

        return { curr, next, ctr}
    }

    #coordsRecordIndexed( params = {beltNdx : 0, phase:0}) {
        let curr = {},  ctr = {x: 0, y: 0};
        curr =  this.coords({beltNdx : params.beltNdx, phase: params.phase});
        return { curr, ctr} 
    }

    coordsRecord( params = {beltNdx : 0, phase:0}) {
        return {uIndexed : this.#coordsRecordUindexed({beltNdx : params.beltNdx, phase: params.phase}),
                indexed: this.#coordsRecordIndexed({beltNdx : params.beltNdx, phase: params.phase})  }
    }

    create_bufferCoordsRecordsUIndexed( params = { phase:0}) {

        this.buffers.coordsRecordsUIndexed = new Float32Array(this.vtxCount().uIndexed*2);  

        for(let coordsRecordNdx = 0; coordsRecordNdx < this.#params.beltVtxCount; coordsRecordNdx ++ ) {
            let record = this.coordsRecord(  {beltNdx : coordsRecordNdx, phase: params.phase}).uIndexed;


            this.buffers.coordsRecordsUIndexed[3*2*coordsRecordNdx] = record.curr.x; 
            this.buffers.coordsRecordsUIndexed[3*2*coordsRecordNdx +1 ] = record.curr.y; 

            this.buffers.coordsRecordsUIndexed[3*2*coordsRecordNdx +2 ] = record.next.x; 
            this.buffers.coordsRecordsUIndexed[3*2*coordsRecordNdx +3 ] = record.next.y; 

            this.buffers.coordsRecordsUIndexed[3*2*coordsRecordNdx +4 ] = record.ctr.x; 
            this.buffers.coordsRecordsUIndexed[3*2*coordsRecordNdx +5 ] = record.ctr.y; 

        }

        return this.buffers.coordsRecordsUIndexed; 
   }

   create_bufferCoordsRecordsIndexed( params = { phase:0}) {

    // this.buffers.coordsRecordsIndexed = new Float32Array(2*(this.vtxCount().indexed+1));  

    // let record; 

    // for(let coordsRecordNdx = 0; coordsRecordNdx < this.#params.beltVtxCount; coordsRecordNdx ++ ) {
    //     record = this.coordsRecord(  {beltNdx : coordsRecordNdx, phase: params.phase}).indexed;

    //     this.buffers.coordsRecordsIndexed[2*coordsRecordNdx] = record.curr.x; 
    //     this.buffers.coordsRecordsIndexed[2*coordsRecordNdx +1 ] = record.curr.y; 

    // }

    // this.buffers.coordsRecordsIndexed[2*this.#params.beltVtxCount - 2] = record.ctr.x; 
    // this.buffers.coordsRecordsIndexed[2*this.#params.beltVtxCount - 1 ] = record.ctr.y; 


    // return this.buffers.coordsRecordsIndexed; 
}
                
   
}  

Ebk.Geometry.Polygon.ClassModelTests = (paramsTestOptions =[
    
    {
        creation:  { beltVtxCount: 6, beltNdx :0,  phase:0, colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, -0.92 ], height: [-0.92, -0.92 ]  } } , 

        update:  { beltVtxCount: 6, beltNdx :0,  phase:0 , colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, 0.92 ], height: [-0.92, 0.92 ]  } }  , 
    
    }
    
    ] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.Polygon, paramsTestOptions, exceptions );

}


let EbkGeometry = Ebk.Geometry

export {EbkGeometry}
export default EbkGeometry;