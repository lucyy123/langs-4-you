/// <reference types="vite/client" />


export type LanuagesTypes={
    name:string,
    code:string
}


export type LanguagesCodeTypes="hi"|"fr"|"es"|"ja"


export type Wordtype={
    word:string;
    meaning:string;
    options:string[];
}


export type initialStateType = {
    loading:boolean;
    result:string[];
    words:Wordtype[];
    error?:string;

}

export type FetchDataType={    
translations:{
    text:string
}[]
}



type ParamsType = {
    text: string,
    voice_code?: string
}

