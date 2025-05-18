import axios from "axios";
import { useState } from "react";


const usetTodoApi = () => {
    const [getAllData, setGetAllData] = useState<any>([1,2,3,4,5]);


    return {
      getAllData,

    }
}

export default usetTodoApi;