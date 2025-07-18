import axios from "axios"
import {useState } from "react";
import { useQuery } from "@tanstack/react-query";
import style from './Categories.module.css'
import {motion} from 'framer-motion' 
import Loader from "../Loader/Loader";
import { FadeIn } from "../Variants";
import { useTranslation } from 'react-i18next';

export default function Category() {    
  const [loader, setLoader] = useState(false)
  const [categoryDetails, setBrandsDetails] = useState([])
  const [showDetails, setShowDetails] = useState(false)
      const { t, i18n } = useTranslation();
  const divValidation = {
    hidden : {
      y  :-300,
      opacity : 0,
    },
    visible :{
      y : 0,
      opacity : 1,
      transition :{
        duration : .5,
        delay : .5,  

      }
    }
}

        function getCategory(){
          return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        }
    let {data,isLoading}= useQuery({
      queryKey: ['getCategory'],
      queryFn : getCategory
    })
    async function PrandsDetails(id) {
      setShowDetails(true)
          try{
            setLoader(true)
            let data=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
               setBrandsDetails(data?.data?.data)
              //  console.log(data?.data?.data);
               setLoader(false)
          }catch{
            setLoader(false)
          }
    }

  return<>
  <h1 className=" text-gray-500 dark:text-gray-400 text-xl  px-10 font-semibold mb-4">{t("AllCategory")}</h1>

            {showDetails==true ? <>
              <div className=" fixed top-0 overflow-hidden left-0 right-0 z-50 h-screen  w-full bg-black bg-opacity-50">
              <motion.div 
                variants={divValidation}
                initial = "hidden"
                animate = "visible"
              className=" absolute lg:left-64 lg:right-64 z-50 top-6 py-10 mx-8 md:mx-24 rounded-xl dark:bg-gray-800 bg-white">
                <div className=" flex justify-end me-5 -translate-y-7">

              <i onClick={()=>setShowDetails(false)} className="text-2xl cursor-pointer dark:text-gray-300  text-black fa-solid fa-xmark"></i>
                </div>
                <div className=" flex justify-center py-6 px-10 items-center border-t-gray-200 dark:border-gray-700 border-t border-b  border-b-gray-200 h-full w-ful">
              <div className=" flex-col w-1/2 text-white flex ">
                <h3 className=" text-main text-xl lg:text-3xl mb-2">{categoryDetails.name}</h3>
                <h4 className=" text-sm text-gray-600">{categoryDetails.slug}</h4>
              </div>
              <div className="w-1/2">
                <img src={categoryDetails.image} className="w-4/5" alt="" />
              </div>
                </div>
                <div className=" flex w-ful translate-y-3 justify-end me-4">
                  <button onClick={()=>setShowDetails(false)} className=" bg-gray-500 lg:py-2 py-1 px-2 lg:px-4 rounded-md text-white"> {t('close')}</button>
                </div>
              </motion.div>
              </div>
            </> : null}
              {isLoading ?
              <div className=" flex mt-40 h-3/4 justify-center items-center">
                <Loader></Loader>
                </div>: <>
                  <div className=" flex  flex-wrap lg:p-6 gap-y-4 justify-start text-center">
                    
                      {data?.data?.data.map((cat)=> <div onClick={()=>PrandsDetails(cat._id)}  key={cat._id} className="m-auto cursor-pointer p-4 lg:p-2 w-full md:w-1/2  lg:w-1/3">
                      
                      <div className=" shadow-md overflow-hidden bg-slate-100 dark:bg-gray-900  group  w-full  hover:border-main hover:shadow-main hover:shadow-sm duration-500 transition-all rounded-sm">
                        <img className="w-full  h-[230px] object-cover" src={cat.image} alt="" />
                        <div className=" p-2 lg:px-3">

                            <h3 className=' text-xl py-4 text-main'>{cat.name}</h3>
                            <button onClick={()=>PrandsDetails(cat._id)}  className=' w-full text-center hover:bg-green-400 group-hover:translate-y-0 translate-y-full duration-500 group-hover:opacity-100 py-2 px-4 opacity-0 bg-main text-white mt-2 mb-2 rounded'>{t('viewdetails')}</button>
                        </div>
                      </div>
                        </div>
                      )}        
                      </div>
                    </>
                    }
                  </>
}

