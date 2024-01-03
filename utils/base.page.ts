import type { Page } from '@playwright/test';

export class BasePage {
   
    public readonly page : Page

    constructor(page:Page){
            this.page = page
    }
 
    public async goToUrl(url){
        this.page.goto(url)
    }

    public async checkVisible(locator) {
         return this.page.isVisible(locator)
    }
    
    public async doClick(locator) {
        if(await this.page.isVisible(locator)){
            await this.page.click(locator)
        }
    }
    
    public async doSendKeys(locator, text='') {
        if(text=='' || text == null){
            if(await this.page.isVisible(locator))
                await this.page.keyboard.press('Tab')
            else
                await this.page.fill(locator,text)
        }
    }

    public async getText(locator){
        await this.page.waitForSelector(locator)
        return this.page.textContent(locator)
    }

    public async doClear(locator){
        (await this.page.waitForSelector(locator)).fill('')
    }

    public async isEnable(locator){
        await this.page.waitForSelector(locator)
        return await this.page.isEnabled(locator)
    }

}