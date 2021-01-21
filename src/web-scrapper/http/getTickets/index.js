import axios from 'axios';
import assert from 'assert';

import {

    HistoryEndpoint

} from '../constants';

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
            url: HistoryEndpoint, //creo que se puede mejorar
            params
        });

        const tickets = res.data.reporte;

        if( Array.isArray(tickets) && invoice){

            return tickets.find( ticket => parseInt(ticket.folio) === parseInt(invoice) );

        };

        return tickets;
    
    }catch(err){

        throw err;

    }

}