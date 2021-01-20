import axios from 'axios';
import assert from 'assert';

import * as eboletaEndpoints from '../constants';

const defaultsParams = {
    filtros: "[]",
    pagination: {
        page: 1,
        itemsPerPage:10,
        sortBy:[],
        sortDesc:[],
        groupBy:[],
        groupDesc:[],
        mustSort:false,
        multiSort:false
    }
};

export const getTickets = async (config = {}) => {

    const {
        from,
        to,
        invoice,
        taxpayer
    } = config;

    assert(
        taxpayer,
        `taxpayer must be defined`
    );

    const dinamicParams = {
        contribuyente: taxpayer,
        dateRange: {
            from,
            to
        }
    }

    try{

        const params = Object.assign( 
            {}, 
            defaultsParams, 
            dinamicParams
        )

        const res = await axios({
            url: eboletaEndpoints.historyEndpoint, //creo que se puede mejorar
            params
        });

        return res.data.reporte;
    
    }catch(err){

        throw err;

    }

}