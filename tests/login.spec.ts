import { test, expect } from '@playwright/test'
import { LoginClass } from '../pages/login.page'
import { config } from '../config/config'
import { error } from '../config/errormsg'

test('has title',async({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await expect(page).toHaveTitle('Sign In - Wortal')
})

test('Validate Sign Up link',async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.checkSignUpLink()
    await expect(page).toHaveURL(config.domainUrl + config.signUpUrl)
})

test('Validate Forget Password link',async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.checkForgetPasswordLink()
    await expect(page).toHaveURL(config.domainUrl + config.forgetPwdUrl)
})

test('Validate Empty Sign up',async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.checkSignInBtn()
    await expect(login.checkVisible(error.login_err1))
    await expect(login.checkVisible(error.password_req_err))
})

test('Validate length for Email/Username',async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.fillUser('Jq')
    await expect(login.checkVisible(error.login_err2))
})

test('Validate length for Password < 3',async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.fillPassword('Jq')
    await expect(login.checkVisible(error.login_err3))
})

// test('validate password more than 30 characters',async ({page}) => {
//     const login = new LoginClass(page);
//     await login.goto(config.domainUrl + config.signUpUrl)
//     await login.fillPassword('Neel@2001 @001 @2001 #$Neel#$%sdfsrterter54646')
//     await expect(login.checkVisible(error.pwd_len_err2))
// })

test('Validate Password toggle Functionality',async ({page}) => {
})

test('Validate Wrong User',async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.login(['JQA','Neel@2001'])
    await login.checkSignInBtn()
    await page.waitForTimeout(2000)
    await expect(login.checkVisible(error.login_err4))
    //await page.locator('xpath=//button[@name,\'Try again!\']').click()
})

test('Validate Wrong Password',async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.login(['Jainisha_qa','Neel@2002'])
    await login.checkSignInBtn()
    await page.waitForTimeout(2000)
    await expect(login.checkVisible(error.login_err4))
})

test('validate login', async({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.login(['Jainisha_qa','Neel@2001'])
    await login.checkSignInBtn()
    await page.waitForTimeout(5000)
    await expect(page).toHaveTitle('Business - Wortal')
})

test('Check Empty Forget password', async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.checkSend()
    await page.waitForTimeout(5000)
    await expect(page.getByText('Email is a required field')).toBeVisible()
})

test('validate Email for forget password', async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.fillEmail('mysite.ourearth.com')
    await expect(login.checkVisible(error.email_err))
    await login.fillEmail('')
    await login.fillEmail('mysite@.com.my')
    await expect(login.checkVisible(error.email_err))
    await login.fillEmail('')
    await login.fillEmail('@you.me.net')
    await expect(login.checkVisible(error.email_err))
    await login.fillEmail('')
    await login.fillEmail('mysite123@gmail.b')
    await expect(login.checkVisible(error.email_err))
    await login.fillEmail('')
    await login.fillEmail('mysite@.org.org')
    await expect(login.checkVisible(error.email_err))
    await login.fillEmail('')
    await login.fillEmail('.mysite@mysite.org')
    await expect(login.checkVisible(error.email_err))
    await login.fillEmail('')
    await login.fillEmail('mysite()*@gmail.com')
    await expect(login.checkVisible(error.email_err))
    await login.fillEmail('')
    await login.fillEmail('mysite..1234@yahoo.com')
    await expect(login.checkVisible(error.email_err))
})

test('Check Email exist for forget password', async ({page}) => {
    const login = new LoginClass(page)
    await login.goto(config.domainUrl + config.baseUrl)
    await login.fillEmail('j@j.com')
    await login.checkSend()
    await page.waitForTimeout(5000)
    await expect(login.checkVisible(error.forget_pwd_error))
})


