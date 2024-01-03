import  {expect, type Locator, type Page} from '@playwright/test'
import { BasePage } from '../utils/base.page';

export class RegistrationPage extends BasePage{
    readonly page: Page
    readonly signInLink : string
    readonly username : string
    readonly fname : string
    readonly lname : string
    readonly email : string
    readonly mobileno : string
    readonly password : string
    readonly confpassword : string
    readonly signUpBtn : string
    readonly passwordEye : string

    constructor( page : Page ){
        super(page)
        this.page = page
        this.signInLink = 'xpath=//a[contains(text(),\' Sign Up \')]'
        this.username = 'xpath=//input[@id=\'signup_user_name\']'
        this.fname = 'xpath=//input[@id=\'signup_f_name\']'
        this.lname = 'xpath=//input[@id=\'signup_s_name\']'
        this.email = 'xpath=//input[@id=\'signup_email\']'
        this.mobileno = 'xpath=//input[@id=\'signup_mobile\']'
        this.password = 'xpath=//input[@id=\'signup_new_password\']'
        this.confpassword = 'xpath=//input[@id=\'signup_confirm_password\']'
        this.signUpBtn = 'xpath=//button[contains(text(),\'Sign up\')]'
        this.passwordEye = ''
    }
    
    async goto(url) {
        await this.goToUrl(url);
    }

    async checkSignInBtn(){
        await this.doClick(this.signUpBtn)

    }

    async register(value){
        await this.doSendKeys(this.username, value[0])
        await this.doSendKeys(this.fname, value[1])
        await this.doSendKeys(this.lname, value[2])
        await this.doSendKeys(this.email, value[3])
        await this.doSendKeys(this.mobileno, value[4])
        await this.doSendKeys(this.password, value[5])
        await this.doSendKeys(this.confpassword, value[6])
    }

    async fillUsername(value){
        await this.doSendKeys(this.username, value)
    }

    async fillFName(value){
        await this.doSendKeys(this.fname, value)
    }

    async fillLName(value){
        await this.doSendKeys(this.lname, value)
    }

    async fillEmail(value) {
        await this.doSendKeys(this.email, value)
    }

    async fillMobileno(value){
        await this.doSendKeys(this.mobileno, value)

    }

    async fillPassword(value){
        await this.doSendKeys(this.password, value)
    }

    async fillConfPassword(value){
        await this.doSendKeys(this.confpassword, value)
    }
}