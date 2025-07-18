import {test, expect, beforeEach, describe} from '@playwright/test'

describe('Blog app testing', async({page})=>{
  beforeEach(async({page})=>{
    await page.goto('http://localhost:5173')
  })
   test('Login form is shown', async({page})= >{
    
   })
})
