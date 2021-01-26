import { Crawler } from '../crawler';

class ClaveUnica {

    constructor(){

        this.userInput = "#uname";
        this.passwordInput = "#pword";
        this.url = 'https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/%3Fclient_id%3D9a76efc4c34e4bd7843206658dc45454%26response_type%3Dcode%26scope%3Dopenid%2Brun%2Bname%26redirect_uri%3Dhttps%253A%252F%252Fclaveunica.gob.cl%252Fauth%252Fcallbacklogin%26state%3DZxvJJKW5ZI3smtBBqj23bvMD1As';

        this.crawler = new Crawler({ 
            url: this.url
        });

    }

    async login ({

        user,
        password

    }){

        this.user = user;
        this.password = password;

        await this.crawler.initialize();

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
    
        await Promise.all([
            this.crawler.page.waitForNavigation({
                waitUntil: 'networkidle0'
            }),
            this.crawler.clickByText("Continuar")
        ]);

        const usernameNode = await this.crawler.selectBy({
            class: 'nameUser',
            tagName: 'h5'
        });

        const username = await usernameNode.evaluate( node => node.innerText );

        await this.crawler.clickBy({
            tagName: 'a',
            text: 'Actualizar'
        })

        const res = await this.crawler.page.waitForResponse(
            response => {

                const url = response.url();
                const req = response.request();
                const method = req.method();

                return method === 'POST' && url === 'https://iam-backend.claveunica.gob.cl/auth/accounts/info'

            }
        );

        const data = await res.text();
        const dataAsObject = JSON.parse(data);
        const profileInfo = dataAsObject.object;
        return {
            ...profileInfo,
            username
        };

    }

}


export const claveUnica = new ClaveUnica();