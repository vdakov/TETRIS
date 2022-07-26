
const p1=
    [
        [2,2,0,0,0,0,0,0,0,0],
        [2,2,0,0,0,0,0,0,0,0]
    ];

const p2=
    [
        [0,2,0,0,0,0,0,0,0,0],
        [2,3,2,0,0,0,0,0,0,0]
    ];

const p3=
    [
        [2,2,0,0,0,0,0,0,0,0],
        [0,3,2,0,0,0,0,0,0,0]
    ];

const p4=
    [
        [0,3,2,0,0,0,0,0,0,0],
        [2,2,0,0,0,0,0,0,0,0]
    ];

const p5=
    [
        [0,0,0,0,0,0,0,0,0,0],
        [2,3,2,2,0,0,0,0,0,0]
    ];

const p6=
    [
        [0,0,2,0,0,0,0,0,0,0],
        [2,3,2,0,0,0,0,0,0,0]
    ];

const p7=
    [
        [2,0,0,0,0,0,0,0,0,0],
        [2,3,2,0,0,0,0,0,0,0]
    ];

piecesArr=[p1,p2,p3,p4,p5,p6,p7];


module.exports=function randomShiftedPiece(){
    let randomPiece= piecesArr[parseInt(Math.random()*piecesArr.length)]
    let shift= parseInt(Math.random()*(p1[0].length-6));


    for(let i=0; i<shift; i++){
        for(let j=0;j<randomPiece.length;j++){
            for(let k=randomPiece[j].length-2;k>=0;k--){
                if(randomPiece[j][k]!=0){
                    let temp=randomPiece[j][k];
                    randomPiece[j][k]=randomPiece[j][k+1];
                    randomPiece[j][k+1]=temp;
                }

            }
        }
    }

    return randomPiece;
};