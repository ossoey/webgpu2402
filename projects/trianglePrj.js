
export function create(canvas, context) {
    let ops = {};
    
    ops.ui = {};
    ops.env = {};
    ops.objects = {};
     


    return {

        desc: "Triangle", 

        releaseResources: () => {
            console.log('Releasing Triangle Project Resources');
            // Release project-specific resources
            // Dispose of pipeline, shader, buffers, etc.
        } , 

        run : () =>{

        }
    };
}