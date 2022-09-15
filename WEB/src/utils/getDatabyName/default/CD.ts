import allData from './index'

export default class CD extends allData {
    constructor(){
        super()
    }
    cityName = '123';
    getData(){
        return this.cityName
    }
}