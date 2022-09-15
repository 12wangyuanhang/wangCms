const cityData = import.meta.globEager('./default/**.ts')

export default (vue:any) => {
    console.log(cityData)
    const dataName:string = sessionStorage.getItem('dataName') || 'index';
    let result:any;
    for(let name in cityData){
        if(name.includes(dataName)){
            result = new cityData[name].default()
        }
    }
    return result;
}