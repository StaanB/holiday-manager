import axios, { AxiosResponse } from 'axios';
import { Requisition } from '../models/models';

// My API configuration
const API_URL = 'https://holiday-manager-api.vercel.app/requisitions';

const RequisitionService = {
    async getAll(): Promise<AxiosResponse<Requisition[]>> {
        return axios.get(API_URL);
    },

    async create(requisition: Requisition): Promise<AxiosResponse<Requisition>> {
        return axios.post(API_URL, requisition);
    },

    async update(id: string, requisition: Requisition): Promise<AxiosResponse<Requisition>> {
        const url = `${API_URL}/${id}`;
        return axios.put(url, requisition);
    },

    async delete(id: string): Promise<void> {
        const url = `${API_URL}/${id}`;
        await axios.delete(url);
    },
};

export default RequisitionService;
