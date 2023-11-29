
import { PagedResultDto } from "./dto/pagedResultDto";

import http from "./httpService";





class RequestMethods{
        public async  getAll<T >(ApiName: string ,pagedResultRequestDto: any): Promise<PagedResultDto<T>> {
        
            let result = await http.get(`api/services/app/${ApiName}/GetAll`,{params :pagedResultRequestDto});
            return result.data.result;
        }

        public async get<T>(ApiName: string , entityDto:T ){
            let result = await http.get(`api/services/app/${ApiName}/Get`,{params :entityDto});
                return result.data.result;
        }

        public async  create<T>(ApiName: string , createOrUpdateInput:T) {
            let result = await http.post(`api/services/app/${ApiName}/Create`, createOrUpdateInput);
            return result.data.result;
        }

        public async update<T>(ApiName: string , updateInput:T){
            let result = await http.put(`api/services/app/${ApiName}/Update`, updateInput);
            return result.data.result;
        }

        public async delete<T>(ApiName: string , entityDto:T){
            let result = await http.delete(`api/services/app/${ApiName}/delete`, {params: entityDto});
            return result.data.result;
        }

}

export default new RequestMethods()