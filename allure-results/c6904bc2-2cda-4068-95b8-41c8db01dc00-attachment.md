# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/registration.spec.ts >> User Registration Flow @master @sanity @regression @web
- Location: tests/web/registration.spec.ts:20:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - navigation [ref=f3e2]:
    - generic [ref=f3e3]:
      - button "$ Currency " [ref=f3e7] [cursor=pointer]:
        - strong [ref=f3e8]: $
        - text: Currency
        - generic [ref=f3e9]: 
      - list [ref=f3e11]:
        - listitem [ref=f3e12]:
          - link "" [ref=f3e13] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=information/contact
          - text: "123456789"
        - listitem [ref=f3e15]:
          - link " My Account" [ref=f3e16] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/account
            - generic [ref=f3e17]: 
            - text: My Account
        - listitem [ref=f3e19]:
          - link " Wish List (0)" [ref=f3e20] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/wishlist
            - generic [ref=f3e21]: 
            - text: Wish List (0)
        - listitem [ref=f3e22]:
          - link " Shopping Cart" [ref=f3e23] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=checkout/cart
            - generic [ref=f3e24]: 
            - text: Shopping Cart
        - listitem [ref=f3e25]:
          - link " Checkout" [ref=f3e26] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=checkout/checkout
            - generic [ref=f3e27]: 
            - text: Checkout
  - banner [ref=f3e28]:
    - generic [ref=f3e30]:
      - link [ref=f3e33] [cursor=pointer]:
        - /url: https://awesomeqa.com/ui/index.php?route=common/home
        - img "TheTestingAcademy eCommerce" [ref=f3e34]
      - generic [ref=f3e36]:
        - textbox "Search" [ref=f3e37]
        - button "" [ref=f3e39] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=f3e43] [cursor=pointer]:
        - generic [ref=f3e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=f3e46]:
    - generic: 
    - list [ref=f3e48]:
      - listitem [ref=f3e49]:
        - link "Desktops" [ref=f3e50] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=20
      - listitem [ref=f3e51]:
        - link "Laptops & Notebooks" [ref=f3e52] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=18
      - listitem [ref=f3e53]:
        - link "Components" [ref=f3e54] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=25
      - listitem [ref=f3e55]:
        - link "Tablets" [ref=f3e56] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=57
      - listitem [ref=f3e57]:
        - link "Software" [ref=f3e58] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=17
      - listitem [ref=f3e59]:
        - link "Phones & PDAs" [ref=f3e60] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=24
      - listitem [ref=f3e61]:
        - link "Cameras" [ref=f3e62] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=33
      - listitem [ref=f3e63]:
        - link "MP3 Players" [ref=f3e64] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=34
  - generic [ref=f3e65]:
    - list [ref=f3e66]:
      - listitem [ref=f3e67]:
        - link "" [ref=f3e68] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=common/home
      - listitem [ref=f3e70]:
        - link "Account" [ref=f3e71] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=account/account
      - listitem [ref=f3e72]:
        - link "Register" [ref=f3e73] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=account/register
    - generic [ref=f3e74]:
      - generic [ref=f3e75]: 
      - text: "Warning: E-Mail Address is already registered!"
    - generic [ref=f3e76]:
      - generic [ref=f3e77]:
        - heading "Register Account" [level=1] [ref=f3e78]
        - paragraph [ref=f3e79]:
          - text: If you already have an account with us, please login at the
          - link "login page" [ref=f3e80] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/login
          - text: .
        - generic [ref=f3e81]:
          - group "Your Personal Details" [ref=f3e82]:
            - text: "*"
            - generic [ref=f3e84]:
              - generic [ref=f3e85]: "* First Name"
              - textbox "* First Name" [ref=f3e87]:
                - /placeholder: First Name
                - text: Quinn
            - generic [ref=f3e88]:
              - generic [ref=f3e89]: "* Last Name"
              - textbox "* Last Name" [ref=f3e91]:
                - /placeholder: Last Name
                - text: Bauch
            - generic [ref=f3e92]:
              - generic [ref=f3e93]: "* E-Mail"
              - textbox "* E-Mail" [ref=f3e95]:
                - /placeholder: E-Mail
                - text: Mina26@gmail.com
            - generic [ref=f3e96]:
              - generic [ref=f3e97]: "* Telephone"
              - textbox "* Telephone" [ref=f3e99]:
                - /placeholder: Telephone
                - text: 781.743.9000 x5874
          - group "Your Password" [ref=f3e100]:
            - generic [ref=f3e102]:
              - generic [ref=f3e103]: "* Password"
              - textbox "* Password" [ref=f3e105]:
                - /placeholder: Password
                - text: OiMkUUGyPP
            - generic [ref=f3e106]:
              - generic [ref=f3e107]: "* Password Confirm"
              - textbox "* Password Confirm" [ref=f3e109]:
                - /placeholder: Password Confirm
                - text: OiMkUUGyPP
          - group "Newsletter" [ref=f3e110]:
            - generic [ref=f3e112]:
              - generic [ref=f3e113]: Subscribe
              - generic [ref=f3e114]:
                - generic [ref=f3e115] [cursor=pointer]:
                  - radio "Yes" [ref=f3e116]
                  - text: "Yes"
                - generic [ref=f3e117] [cursor=pointer]:
                  - radio "No" [checked] [ref=f3e118]
                  - text: "No"
          - generic [ref=f3e119]:
            - text: I have read and agree to the
            - link "Privacy Policy" [ref=f3e120] [cursor=pointer]:
              - /url: https://awesomeqa.com/ui/index.php?route=information/information/agree&information_id=3
            - checkbox [checked] [ref=f3e121]
            - button "Continue" [ref=f3e122] [cursor=pointer]
      - complementary [ref=f3e123]:
        - generic [ref=f3e124]:
          - link "Login" [ref=f3e125] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/login
          - link "Register" [ref=f3e126] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/register
          - link "Forgotten Password" [ref=f3e127] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/forgotten
          - link "My Account" [ref=f3e128] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/account
          - link "Address Book" [ref=f3e129] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/address
          - link "Wish List" [ref=f3e130] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/wishlist
          - link "Order History" [ref=f3e131] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/order
          - link "Downloads" [ref=f3e132] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/download
          - link "Recurring payments" [ref=f3e133] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/recurring
          - link "Reward Points" [ref=f3e134] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/reward
          - link "Returns" [ref=f3e135] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/return
          - link "Transactions" [ref=f3e136] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/transaction
          - link "Newsletter" [ref=f3e137] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/newsletter
  - contentinfo [ref=f3e138]:
    - generic [ref=f3e139]:
      - generic [ref=f3e140]:
        - generic [ref=f3e141]:
          - heading "Information" [level=5] [ref=f3e142]
          - list [ref=f3e143]:
            - listitem [ref=f3e144]:
              - link "About Us" [ref=f3e145] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=4
            - listitem [ref=f3e146]:
              - link "Delivery Information" [ref=f3e147] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=6
            - listitem [ref=f3e148]:
              - link "Privacy Policy" [ref=f3e149] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=3
            - listitem [ref=f3e150]:
              - link "Terms & Conditions" [ref=f3e151] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=5
        - generic [ref=f3e152]:
          - heading "Customer Service" [level=5] [ref=f3e153]
          - list [ref=f3e154]:
            - listitem [ref=f3e155]:
              - link "Contact Us" [ref=f3e156] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/contact
            - listitem [ref=f3e157]:
              - link "Returns" [ref=f3e158] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/return/add
            - listitem [ref=f3e159]:
              - link "Site Map" [ref=f3e160] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/sitemap
        - generic [ref=f3e161]:
          - heading "Extras" [level=5] [ref=f3e162]
          - list [ref=f3e163]:
            - listitem [ref=f3e164]:
              - link "Brands" [ref=f3e165] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=product/manufacturer
            - listitem [ref=f3e166]:
              - link "Gift Certificates" [ref=f3e167] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/voucher
            - listitem [ref=f3e168]:
              - link "Affiliate" [ref=f3e169] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=affiliate/login
            - listitem [ref=f3e170]:
              - link "Specials" [ref=f3e171] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=product/special
        - generic [ref=f3e172]:
          - heading "My Account" [level=5] [ref=f3e173]
          - list [ref=f3e174]:
            - listitem [ref=f3e175]:
              - link "My Account" [ref=f3e176] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/account
            - listitem [ref=f3e177]:
              - link "Order History" [ref=f3e178] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/order
            - listitem [ref=f3e179]:
              - link "Wish List" [ref=f3e180] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/wishlist
            - listitem [ref=f3e181]:
              - link "Newsletter" [ref=f3e182] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/newsletter
      - separator [ref=f3e183]
      - paragraph [ref=f3e184]:
        - text: Powered By
        - link "OpenCart" [ref=f3e185] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: TheTestingAcademy eCommerce © 2026
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: User Registration Flow
  3  |  *
  4  |  * Tags: @master @sanity @regression
  5  |  *
  6  |  * Steps:
  7  |  * 1) Open the application
  8  |  * 2) Navigate to My Account → Register
  9  |  * 3) Verify the registration page is displayed
  10 |  * 4) Generate unique customer data and fill the form
  11 |  * 5) Accept Privacy Policy and submit
  12 |  * 6) Verify registration success
  13 |  * 7) Verify the account-created confirmation
  14 |  * 8) Verify the account is accessible
  15 |  */
  16 | 
  17 | import { test, expect } from '../../fixtures/pageFixtures';
  18 | import { RandomDataUtil } from '../../utils/dataGenerator';
  19 | 
  20 | test('User Registration Flow @master @sanity @regression @web', async ({ homePage, registerPage, successPage, myAccountPage }) => {
  21 |     const firstName = RandomDataUtil.getFirstName();
  22 |     const lastName = RandomDataUtil.getLastName();
  23 |     const email = RandomDataUtil.getEmail();
  24 |     const telephone = RandomDataUtil.getPhoneNumber();
  25 |     const password = RandomDataUtil.getPassword();
  26 | 
  27 |     await test.step('1) Open the application', async () => {
  28 |         await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
  29 |     });
  30 | 
  31 |     await test.step('2) Navigate to My Account → Register', async () => {
  32 |         await homePage.clickMyAccount();
  33 |         await homePage.clickRegister();
  34 |     });
  35 | 
  36 |     await test.step('3) Verify the registration page is displayed', async () => {
  37 |         const isRegisterPage = await registerPage.isRegisterPageExists();
  38 |         expect(isRegisterPage).toBeTruthy();
  39 |     });
  40 | 
  41 |     await test.step('4) Fill the registration form with unique data', async () => {
  42 |         await registerPage.completeRegistration(firstName, lastName, email, telephone, password);
  43 |     });
  44 | 
  45 |     await test.step('5) Verify registration success', async () => {
  46 |         const isSuccess = await successPage.isSuccessPageExists();
> 47 |         expect(isSuccess).toBeTruthy();
     |                           ^ Error: expect(received).toBeTruthy()
  48 |     });
  49 | 
  50 |     await test.step('6) Verify the account-created confirmation heading', async () => {
  51 |         const headingText = await successPage.getSuccessHeadingText();
  52 |         expect(headingText).toContain('Your Account Has Been Created!');
  53 |     });
  54 | 
  55 |     await test.step('7) Navigate to My Account and verify account is accessible', async () => {
  56 |         await successPage.clickContinue();
  57 |         const isMyAccount = await myAccountPage.isMyAccountPageExists();
  58 |         expect(isMyAccount).toBeTruthy();
  59 |     });
  60 | 
  61 |     console.log('✅ User Registration completed successfully!');
  62 | });
```