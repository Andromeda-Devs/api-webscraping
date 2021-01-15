import { Crawler } from '../crawler';

import { splitNumber } from "../utils/splitNumber";

const sleepTime = 1000

class Eboleta {

    userInput = "#input-14";
    passwordInput = "#input-15";
    url = 'https://eboleta.sii.cl/';

    constructor({ user, password }){

        this.user = user;
        this.password = password;

        this.crawler = new Crawler({ 

            url: this.url

        });

    }

    async initialize(){

        await this.crawler.initialize();

    }

    async login (){

        await this.crawler.fill( 
            this.userInput , 
            this.user 
        );
        
        await this.crawler.fill( 
            this.passwordInput , 
            this.password 
        );
    
        await this.crawler.clickByText("Ingresar");
    
        await this.crawler.page.waitForSelector(".v-main__wrap");
    
        await this.crawler.page.screenshot({path: 'example2.png'});
    
    }

    async emitTicket({ amount , type , receiver, detail }){

        const amountSplitted = splitNumber( amount );

        await this.crawler.waitForButtonContent( "Emitir" );

        await this.crawler.page.waitForTimeout(2000);

        for( const number of amountSplitted ){

            await this.crawler.clickByText(number);

        }

        await this.crawler.page.waitForTimeout(sleepTime);

        await this.crawler.clickByText("Emitir");

        await this.crawler.page.waitForTimeout(sleepTime);
        
        await this.crawler.clickByText("Elija tipo boleta", "label");

        await this.crawler.page.waitForTimeout(sleepTime);

        await this.crawler.clickBy({
            id: 'list-item-166-0',
            text: 'Boleta afecta'
        });

        const dialog = await this.crawler.page.$(`#app > div[role=document]`);

        const [_,emitButton] = await dialog.$x(`//button[contains( . , 'Emitir')]`);

        await this.crawler.page.waitForTimeout(sleepTime);

        if(emitButton){

            await emitButton.click();

        }

        const downloadButton = await this.crawler.waitForContent("Descargar","a");

        const ticketHref = await downloadButton.evaluate( node => node.getAttribute('href') );

        return {

            ticket: ticketHref

        }

    }

}

export const create = async ({ user, password }) => {

    const eboleta = new Eboleta({ user , password });

    await eboleta.initialize();

    return eboleta;

}

