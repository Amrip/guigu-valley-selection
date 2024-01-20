import { defineStore } from "pinia";
import {reqC1, reqC2, reqC3} from '@/api/product/attr'
import type{CategoryResponseData} from '@/api/product/attr/type'
import type{ CategoryState } from "./type";
let useCategoryStore = defineStore('Category',{
    state:():CategoryState=>{
        return{
            c1Data:[],
            c1Id:'',
            c2Data:[],
            c2Id:'',
            c3Data:[],
            c3Id:''
        }
    },
    actions:{
        async getC1(){
            let result:CategoryResponseData = await reqC1()
            if(result.code==200){
                this.c1Data = result.data
            }
        },
        async getC2(){
            let result:CategoryResponseData = await reqC2(this.c1Id)
            if(result.code==200){
                this.c2Data = result.data
            }
        },
        async getC3(){
            let result:CategoryResponseData = await reqC3(this.c2Id)
            if(result.code==200){
                this.c3Data = result.data
            }
        }
    },
    getters:{

    }
})

export default useCategoryStore