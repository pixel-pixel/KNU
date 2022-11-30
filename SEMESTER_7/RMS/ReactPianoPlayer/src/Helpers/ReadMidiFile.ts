
import { parseArrayBuffer } from 'midi-json-parser';
//  midi-json-parser is npm library created by chrisguttandin

const ReadMidiFile = (file:any,type:'ref' | 'ArrayBuffer') =>{

    //Function Converting file from binarry form into ArrayBuffer
    function convertDataToArray64():Promise<ArrayBuffer | string> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event:any) => {
                resolve(event.target.result as ArrayBuffer);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
            reader.readAsArrayBuffer(file);
        });
    }
    if(type === 'ref'){
    return new Promise<Object>((resolve,reject) =>{
        convertDataToArray64().then(file=>{
            //checking if Error hasn't been returned
            if(typeof file !== 'string'){
            parseArrayBuffer(file).then(json =>{
                resolve(json);
                });
            }else{
                reject('Error ! Provided type is Not an Object !!');
            }
          })
    })
    }else{
        return new Promise<Object>((resolve,reject) =>{
            //checking if Error hasn't been returned
            parseArrayBuffer(file).then(json =>{
                    resolve(json);
            });
        })
    }
}

export default ReadMidiFile;