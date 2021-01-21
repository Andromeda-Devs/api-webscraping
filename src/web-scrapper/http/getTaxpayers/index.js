import {

    EmittersEndpoint

} from '../constants';

import axios from 'axios';

export const getTaxpayers = async ({
    rut
}) => {

    try{

        const res = await axios({

            url:`${EmittersEndpoint}${rut}`

        });

        const taxPayers = res.data;
        const hasTaxpayers = taxPayers.length

        if(!hasTaxpayers)
            throw new Error("User does not have valid tax payers");

        return taxPayers;

    }catch(error){

        throw error //TO DO: throw api custom error

    }

}