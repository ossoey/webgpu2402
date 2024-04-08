 //    Copyright (c) 2013-2024 Ossoey/webgpuYYMM.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";

Ebk.Geometry = {};



/////// Ebk.ClassModel
Ebk.Geometry.PolygonVtxUindexed = class EbkGeometryPolygonVtxUindexed {
    #params;
    #process;
  
    
    constructor(params ={ beltVtxCount: 6, instanceCount: 10, colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, -0.92 ], height: [-0.92, -0.92 ]  }  }) {
               
        this.name = `Ebk.Geometry.Polygon`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );
        
        this.buffersData = {};

        this.#cirFndVtxCountGen();

  
    }
    
    _update(params = { beltVtxCount: 6, instanceCount: 10,  colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, 0.92 ], height: [-0.92, 0.92 ]  } }){
        
        this.#params =  Object.assign(this.#params,  params );
        this.#cirFndVtxCountGen(); 
         
    }


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

    vtxCount( ) {
        return this.#params.beltVtxCount * 3;
    }

    instanceCount( ) {
        return this.#params.instanceCount;
    }
 
    belt(params = {beltNdx :0}){
        return Ebk.Sequence.GridWholeNumber.dataGetSum({step:params.beltNdx}); 
    }

    #cirFndVtxCountGen(){
        this.cirFndVtxCount =    this.belt({beltNdx: this.#params.beltVtxCount});
    }

    #circleCoords(cirNdx, phase = 0){
        let angle = phase + 2 * Math.PI * (cirNdx/ (this.cirFndVtxCount-1));
          
         return {x : Math.cos(angle), y: Math.sin(angle)};
    }

    coords( params = {beltNdx : 0, phase:0}) {
        return this.#circleCoords(this.belt({beltNdx: params.beltNdx}), params.phase );
    }

    colorRand( ) {
        let r =  Ebk.Rand.fRanges({ranges:[[this.#params.colors.start[0], this.#params.colors.end[0]]], clamps:[[0,1]]});
        let g =  Ebk.Rand.fRanges({ranges:[[this.#params.colors.start[1], this.#params.colors.end[1]]], clamps:[[0,1]]});  
        let b =  Ebk.Rand.fRanges({ranges:[[this.#params.colors.start[2], this.#params.colors.end[2]]], clamps:[[0,1]]}); 

        return {r, g, b};
    }

    offsetsRand() {
        let x =  Ebk.Rand.fRanges({ranges:[[this.#params.offsets.width[0], this.#params.offsets.width[1]]], clamps:[[0,1]]});
        let y =  Ebk.Rand.fRanges({ranges:[[this.#params.offsets.height[0], this.#params.offsets.height[1]]], clamps:[[0,1]]}); 
       
        return {x, y};
    }


    coordsRecord( params = {beltNdx : 0}) {
         
        let curr = {}, next = {}, ctr = {x: 0, y: 0};

        curr =  this.coords({beltNdx : params.beltNdx, phase: params.phase});

        if (params.beltNdx < this.#params.beltVtxCount -1) {
            next =  this.coords({beltNdx : params.beltNdx + 1, phase: params.phase});
        } else {

            next =  this.coords({beltNdx : 0, phase: params.phase});
        }

        return { curr, next, ctr}
    }

    colorRandRecord() {
         
        let curr = this.colorRand(), next = this.colorRand(), ctr = this.colorRand();

        return { curr, next, ctr}
    }


    #create_bufferDataCoordsRecords(buffer, beltNdx = 0,  phase = 0) {

        let record = this.coordsRecord(  {beltNdx : beltNdx, phase: phase});

        buffer[3*2*beltNdx] = record.curr.x; 
        buffer[3*2*beltNdx +1 ] = record.curr.y; 

        buffer[3*2*beltNdx +2 ] = record.next.x; 
        buffer[3*2*beltNdx +3 ] = record.next.y; 

        buffer[3*2*beltNdx +4 ] = record.ctr.x; 
        buffer[3*2*beltNdx +5 ] = record.ctr.y; 
    }

    #create_bufferDataColorRandRecords(buffer,  beltNdx) {

        let record = this.colorRandRecord();

        buffer[3*3*beltNdx] = record.curr.r; 
        buffer[3*3*beltNdx +1 ] = record.curr.g; 
        buffer[3*3*beltNdx +2 ] = record.curr.b; 

        buffer[3*3*beltNdx + 3] = record.next.r; 
        buffer[3*3*beltNdx + 4] = record.next.g; 
        buffer[3*3*beltNdx + 5] = record.next.b; 

        buffer[3*3*beltNdx + 6] = record.ctr.r; 
        buffer[3*3*beltNdx + 7] = record.ctr.g; 
        buffer[3*3*beltNdx + 8] = record.ctr.b; 

     


    }

    #create_bufferDataOffsetsRecords(buffer, instanceNdx  ) {

        let record = this.offsetsRand();

        buffer[2*instanceNdx] = record.x; 
        buffer[2*instanceNdx +1 ] = record.y; 
    }

    create_buffersData( params = { phase:0}) {

        this.buffersData.coords = new Float32Array(this.vtxCount()*2);  
        this.buffersData.colors = new Float32Array(this.vtxCount()*3); 
        this.buffersData.offsets = new Float32Array(this.#params.instanceCount*2);  
        

        for(let beltNdx = 0; beltNdx < this.#params.beltVtxCount; beltNdx ++ ) {
              
            this.#create_bufferDataCoordsRecords(this.buffersData.coords, beltNdx,  params.phase);
            this.#create_bufferDataColorRandRecords(this.buffersData.colors, beltNdx);

        }

     
        
        for(let instanceNdx = 0; instanceNdx < this.#params.instanceCount; instanceNdx ++ ) {
              
            this.#create_bufferDataOffsetsRecords(  this.buffersData.offsets, instanceNdx  )

        }

   }

   
}  

Ebk.Geometry.PolygonVtxUindexed.ClassModelTests = (paramsTestOptions =[
    
    {
        creation:  { beltVtxCount: 6, instanceCount: 10, beltNdx :0,  phase:0, colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, 0.92 ], height: [-0.92, 0.92 ]  } } , 

        update:  { beltVtxCount: 6, instanceCount: 10, beltNdx :0,  phase:0 , colors: {start: [0.2, 0.21, 0.23] , end: [0.8, 0.81, 0.93]}, offsets: {width: [-0.92, 0.92 ], height: [-0.92, 0.92 ]  } }  , 
    
    }
    
    ] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.PolygonVtxUindexed , paramsTestOptions, exceptions );

}


let EbkGeometry = Ebk.Geometry

export {EbkGeometry}
export default EbkGeometry;