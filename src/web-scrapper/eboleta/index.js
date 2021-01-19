import { Crawler } from '../crawler';
import { splitNumber  } from '../utils';
import { ticketType  } from '../constants';


class Eboleta {


    constructor(){
        this.userInput = "#input-14";
        this.passwordInput = "#input-15";
        this.loginErrorMessage = `Unauthenticated access is not supported for this identity pool`;
        this.affectBallot = {
    
            id: 'list-item-166-0',
            text: ticketType.boletaAfecta,
    
        }
    
        this.exentBallot = {
    
            id: 'list-item-169-1',
            text: ticketType.boletaExtensa,
    
        }
    
        this.url = 'https://eboleta.sii.cl/';
        this.crawler = new Crawler({ 
            url: this.url
        });

    }
    async login ({

        user,
        password

    }){
        try {
            this.user = user;
        this.password = password;

        await this.crawler.initialize();

        this.crawler.page.on( 'requestfinished', async req => {

            if(req.method() === 'POST'){

                const res = req.response();
                const text = await res.text();
                text.includes( this.loginErrorMessage );
            }

        });

        //fills user input
        await this.crawler.fill( 
            this.userInput , 
            this.user 
        );
        
        //fills password input
        await this.crawler.fill( 
            this.passwordInput , 
            this.password 
        );
    
        await this.crawler.clickByText("Ingresar");
        await this.crawler.page.waitForSelector(".v-main__wrap");
        } catch (error) {
            return error;   
        }
    }

    async emitTicket({ 
        amount ,
        type , 
        receiver, 
        detail 
    }){
        await this.pressNumpad( amount );

        await this.crawler.sleep();

        await this.crawler.clickByText("Emitir");

        await this.crawler.sleep();
        
        await this.crawler.clickByText("Elija tipo boleta", "label");

        await this.crawler.sleep();

        await this.selectBallot( type );

        await this.crawler.sleep();

        //Fills receiver input if reciver is defined
        await this.fillReceiverFormIfNeeded( receiver );

        const downloadButton = await this.getDownloadButton();

        const ticketHref = await downloadButton.evaluate( node => node.getAttribute('href') );
        return ticketHref;

    }

    async pressNumpad( quantity ){

        const quantitySplitted = splitNumber( quantity );

        await this.crawler.waitForButtonContent( "Emitir" );

        await this.crawler.sleep(3000);

        for( const number of quantitySplitted ){

            await this.crawler.clickByText(number);

        }

    }

    async selectBallot( ballotType ){

        switch(ballotType){

            case ticketType.boletaAfecta:{
                await this.crawler.clickBy( this.affectBallot );
                return
            }

            case ticketType.boletaExtensa:{
                await this.crawler.clickBy( this.exentBallot );
                return
            }

        }

    }

    async getDownloadButton(){

        const dialog = await this.crawler.page.$(`#app > div[role=document]`);

        const [_,emitButton] = await dialog.$x(`//button[contains( . , 'Emitir')]`);

        await this.crawler.sleep();

        if(emitButton){

            await emitButton.click();

        }

        const downloadButton = await this.crawler.waitForContent("Descargar","a");

        return downloadButton;

    }

    async fillReceiverFormIfNeeded(receiver){

        if( receiver ){

            const rutInput = '#input-113';
            const nameInput = '#input-119';
            const emailInput = '#input-123';
            const addressInput = '#input-121';

            const receiverSwitchSelector = `#app > div.v-dialog__content.v-dialog__content--active > div > div.v-card.v-sheet.theme--light > div.v-card__text > div > v-template:nth-child(1) > div:nth-child(3) > div > div > div`;

            await this.crawler.clickBy({

                selector: receiverSwitchSelector

            });

            await this.crawler.sleep();

            await this.crawler.fill(
                rutInput,
                receiver.rut
            )

            
            await this.crawler.fill(
                nameInput,
                receiver.name
            )

            
            await this.crawler.fill(
                emailInput,
                receiver.email
            )

            
            await this.crawler.fill(
                addressInput,
                receiver.address
            )

        }

    }
}


export const eboleta = new Eboleta();