import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../pages/registration.page'
import { config } from '../config/config'
import { error } from '../config/errormsg'

test('has title',async({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await expect(page).toHaveTitle('Sign Up - Wortal')
})

test('Check Sign In link',async ({page}) => {
    const register= new RegistrationPage(page);
    await register.goto(config.domainUrl + config.baseUrl)
    await register.checkSignInBtn()
    await expect(page).toHaveURL(config.domainUrl + config.baseUrl)
})

test('Check require msg',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.checkSignInBtn()
    await expect(register.checkVisible(error.user_req_err))
    await expect(register.checkVisible(error.fname_req_err))
    await expect(register.checkVisible(error.lname_req_err))
    await expect(register.checkVisible(error.email_req_err))    
    //await expect(register.checkVisible(error.mobile_req_err'))
    await expect(register.checkVisible(error.password_req_err))
    await expect(register.checkVisible(error.confpwd_req_err))
})

test('validate Username for < 3 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillUsername('ui')
    await expect(register.checkVisible(error.user_len_err1))
})

test('validate Username for > 30 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillUsername('MoJoedoMoJoedoMoJoedoMoJoedodfrt')
    await expect(register.checkVisible(error.user_len_err2))
})

test('validate Username for invalid characters',async ({page}) => {
    const register = new RegistrationPage(page)
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillUsername('Mo#$12')
    await expect(register.checkVisible(error.user_invalid_err))
})

test('validate First name for < 3 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillFName('Mo')
    await expect(register.checkVisible(error.fname_len_err1))
})

test('validate First name for > 30 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillFName('MoJoedoMoJoedoMoJoedoMoJoedodfrt')
    await expect(register.checkVisible(error.fname_len_err2))
})

test('validate First name for invalid characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillFName('Mo#$12')
    await expect(register.checkVisible(error.fname_invalid_err))
})

test('validate Last name for < 3 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillLName('Mo')
    await expect(register.checkVisible(error.lname_len_err1))
})

test('validate last name for > 30 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillLName('MoJoedoMoJoedoMoJoedoMoJoedodfrt')
    await expect(register.checkVisible(error.lanme_len_err2))
})

test('validate last name for invalid characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillLName('Mo#$12')
    await expect(register.checkVisible(error.lanme_invalid_err))
})

test('validate first and last name are same',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillFName('More')
    await register.fillLName('More')
    await expect(register.checkVisible(error.fLName_diff_err))
})

test('validate last and First name are same',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillLName('More')
    await register.fillFName('More')
    await expect(register.checkVisible(error.fLName_diff_err))
})

test('validate Email',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillEmail('mysite.ourearth.com')
    await expect(register.checkVisible(error.email_err))
    await register.fillEmail('mysite@.com.my')
    await expect(register.checkVisible(error.email_err))
    await register.fillEmail('@you.me.net')
    await expect(register.checkVisible(error.email_err))
    await register.fillEmail('mysite123@gmail.b')
    await expect(register.checkVisible(error.email_err))
    await register.fillEmail('mysite@.org.org')
    await expect(register.checkVisible(error.email_err))
    await register.fillEmail('.mysite@mysite.org')
    await expect(register.checkVisible(error.email_err))
    await register.fillEmail('mysite()*@gmail.com')
    await expect(register.checkVisible(error.email_err))
    await register.fillEmail('mysite..1234@yahoo.com')
    await expect(register.checkVisible(error.email_err))
})

test('validate contact no less than 7 digits',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillMobileno('123456')
    await expect(register.checkVisible(error.mobile_err))
})

test('validate contact no more than 15 digits',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillMobileno('1234567890123456')
    await expect(register.checkVisible(error.mobile_err))
})

test('validate password less than 6 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillPassword('Ne1@#')
    await expect(register.checkVisible(error.pwd_len_err1))
})

test('validate password more than 30 characters',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillPassword('Neel@2001 @001 @2001 #$Neel#$%sdfsrterter54646')
    await expect(register.checkVisible(error.pwd_len_err2))
})

test('validate password require 1 capital, small, special character and digit',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillPassword('eelshinf')
    await expect(register.checkVisible(error.pwd_invalid_err))
    await register.fillPassword('')
    await register.fillPassword('12345677')
    await expect(register.checkVisible(error.pwd_invalid_err))
    await register.fillPassword('')
    await register.fillPassword('@#$@#$@#_+')
    await expect(register.checkVisible(error.pwd_invalid_err))
    
})

test('validate confirm password and password',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillPassword('Neel@2001')
    await register.fillConfPassword('Neel@2001')
    await expect(register.checkVisible(error.confpwd_invalid_err))
})

test('validate password toggle facility',async ({page}) => {
})

test('validate confirm password toggle facility',async ({page}) => {
})

test('validate existed user name',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillUsername('Jainisha_QA')
    await register.fillFName('Neeln')
    await register.fillLName('Neel')
    await register.fillEmail('e@e.com')
    await register.fillMobileno('3454353345')
    await register.fillPassword('Neel@2001')
    await register.fillConfPassword('Neel@2001')
    await register.checkSignInBtn()
    await page.waitForTimeout(5000)
    await expect(register.checkVisible(error.user_exist_err))
})

test('validate existed contact no',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillUsername('Jenny')
    await register.fillFName('Neeln')
    await register.fillLName('Neel')
    await register.fillEmail('e@e.com')
    await register.fillMobileno('7228001861')
    await register.fillPassword('Neel@2001')
    await register.fillConfPassword('Neel@2001')
    await register.checkSignInBtn()
    await page.waitForTimeout(5000)
    await expect(register.checkVisible(error.mobile_exist_err))
})

test('validate existed email',async ({page}) => {
    const register = new RegistrationPage(page);
    await register.goto(config.domainUrl + config.signUpUrl)
    await register.fillUsername('Jenny')
    await register.fillFName('Neeln')
    await register.fillLName('Neel')
    await register.fillEmail('jennyrat1997@gmail.com')
    await register.fillMobileno('7228001800')
    await register.fillPassword('Neel@2001')
    await register.fillConfPassword('Neel@2001')
    await register.checkSignInBtn()
    await page.waitForTimeout(5000)
    await expect(register.checkVisible(error.email_exist_err))
})