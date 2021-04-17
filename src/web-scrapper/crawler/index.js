import puppeteer  from 'puppeteer';

export class Crawler {

    constructor(config){

        const {url} = config;
        
        this.url = url;

    }
    
    async initialize(){

        const url = this.url;

        const browser =  await puppeteer.launch({
            headless: false,
            args: ["--no-sandbox"],
            'ignoreHTTPSErrors': true,
            timeout: 60000
          });
    
        // const context = await browser.defaultBrowserContext();
    
        // context.overridePermissions( url , [ "notifications" ] );

        let page = await browser.newPage();
    
        await page.goto(url);

        this._page = page;
    
    }

    async fill(query,value){

        await this._page.waitForSelector(query);
    
        await this._page.type(query,value);
        
    }

    async clickByText(query,tagName = "button"){

        const [button] = await this._page.$x(`//${tagName}[contains( . , '${query}')]`);
    
        if(button){
            
            await button.click();

            return button;
    
        }
    
        return;
    
    }

    async clickBy( config ){

        let selection = null;

        if('selector' in config){

            selection = await this._page.$(config.selector);

        }else {

            const { text , tagName = 'div', ...rest } = config;

            const params = Object
                .entries(rest)
                .map( ([attribute,value]) => `@${attribute}='${value}'` );

            let paramsAsText = params.length 
                ? "and " + params.join(" and ")
                : ``

            const [foundTag] = await this._page.$x(`//${tagName}[contains( . , '${text}') ${paramsAsText} ]`);

            selection = foundTag;
        }
    

        if(selection){
            
            await selection.click();

            return selection;
    
        }
    
        return;

    }

    async selectBy( config ){

        let selection = null;

        if('selector' in config){

            selection = await this._page.$(config.selector);

        }else {

            const { text , tagName = 'div', ...rest } = config;

            const article = text ? "and" : ""

            const params = Object
                .entries(rest)
                .map( ([attribute,value]) => `@${attribute}='${value}'` );

            let paramsAsText = params.length 
                ? article + params.join(" and ")
                : ``

            const [foundTag] = await this._page.$x(`//${tagName}[${text ? `contains( . , '${text}')`: ''} ${paramsAsText} ]`);

            selection = foundTag;
        }
    

        if(selection){
            
            return selection;
    
        }
    
        return;

    }

    async waitForButtonContent(query){

        const button = await this._page.waitForFunction(
            (query) => {

                const buttons = document.getElementsByTagName('button');

                let buttonFound = null;

                for( let _i = 0; _i < buttons.length; _i += 1 ){

                    if( buttons[_i].textContent.includes(query) ){

                        buttonFound = buttons[_i];

                    }

                }

                return buttonFound;

            },
            {},
            query
        );

        return button;

    }

    async waitForContent(query,tagName){

        const node = await this._page.waitForFunction(
            (query,tagName) => {

                const tags = document.getElementsByTagName(tagName);

                let buttonFound = null;

                for( let _i = 0; _i < tags.length; _i += 1 ){

                    if( tags[_i].textContent.includes(query) ){

                        buttonFound = tags[_i];

                    }

                }

                return buttonFound;

            },
            {},
            query,
            tagName
        );

        return node;

    }

    async sleep( ms = 1000 ){

        await this._page.waitForTimeout(ms);

    }

    get page(){

        return this._page;

    }

}


