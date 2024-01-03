import  {type Locator, type Page} from '@playwright/test'
import { BasePage } from '../utils/base.page';

export class LoginClass extends BasePage {
    public readonly page: Page
    readonly signUpLink : string
    readonly forgetPasswordLink : string
    readonly signInBtn : string
    readonly userName : string
    readonly password : string
    readonly email : string
    readonly send : string

    constructor(page:Page){
        super(page)
        this.page = page
        this.signUpLink = 'xpath=//a[contains(text(),\' Sign Up \')]'
        this.forgetPasswordLink = 'xpath=//a[contains(text(),\' Forgot Password? \')]'
        this.signInBtn = 'xpath=//button[contains(text(),\' Sign in \')]'
        this.userName = 'xpath=//input[@type=\'text\']'
        this.password = 'xpath=//input[@type=\'password\']'
        this.email = 'xpath=//input'
        this.send = 'xpath=//button[contains(text(),\' Send \')]'
    }
    
    async goto(url) {
        this.goToUrl(url)
    }

    async login(value) {
        await this.doSendKeys(this.userName, value[0])
        await this.doSendKeys(this.password, value[1]);
        this.checkSignInBtn()
    }

    async checkSignInBtn(){
        await this.doClick(this.signInBtn)
    }

    async checkSignUpLink(){
        await this.doClick(this.signUpLink) 
    }

    async checkForgetPasswordLink(){
        await this.doClick(this.forgetPasswordLink)
    }

    async fillUser(value){
        await this.doSendKeys(this.userName, value)
    }

    async fillPassword(value){
        await this.doSendKeys(this.password, value)
    }

    async fillEmail(value){
        await this.doSendKeys(this.email, value)
    }

    async checkSend(){
        await this.doClick(this.send)
    }
}
