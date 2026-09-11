import { Given, When, Then } from '@cucumber/cucumber';
import { BugFinder } from '../../../world/Bug_Finder';
import { expect } from '@playwright/test';
import { CsvReader } from '../../../utils/csvReader';
import { RegisterData } from '../../../types/RegisterData.types';
import { ExcelReader } from '../../../utils/ExcelReader';
import { RegisterAlreadyExistEmail } from '../../../types/RegisterAlreadyExistEmail.types';

const registerData = CsvReader.read<RegisterData>("RegisterData.csv");
const invalidRegisterData=ExcelReader.read<RegisterAlreadyExistEmail>("RegisterAlreadyExistEmail.xlsx","Sheet1");
Given('click the signup button', async function (this: BugFinder) {
    await this.sp.clickSignUpButton();
});

When('I enter valid registration details', async function (this: BugFinder) {

    const data = registerData[0]!;

    await this.rp.setName(data.Name);
    await this.rp.setEmail(data.Email);
    await this.rp.setMobile(data.Phone);
    await this.rp.setPassword(data.password);
    await this.rp.setConfirmPassword(data.Retype_Password);
    await this.rp.checkAcceptTerms();
});

When('I submit the registration form', async function (this: BugFinder) {
    await this.rp.clickCreateAccount();
});

Then('I should see a confirmation message indicating successful registration',async function (this: BugFinder) {

        await expect(this.rp.RegistrationSuccessMessage).toBeVisible();

        await expect(this.rp.RegistrationSuccessMessage)
            .toHaveText(/Registration submitted successfully! Your account/);
    }
);


When('the user enters the {string}, {string}, {string}, {string} and {string}',async function (this: BugFinder,name: string,email: string,phone: string,password: string,confirmPassword: string) {

        await this.rp.setName(name);
        await this.rp.setEmail(email);
        await this.rp.setMobile(phone);
        await this.rp.setPassword(password);
        await this.rp.setConfirmPassword(confirmPassword);

        // Accept terms
        await this.rp.checkAcceptTerms();
    }
);


When(
    'the user clicks the Create Account button',
    async function (this: BugFinder) {

        await this.rp.clickCreateAccount();
    }
);


Then('the user should can see the {string}',async function (this: BugFinder,expectedMessage: string) {
        if (expectedMessage === 'Please fill out this field.') {
            let message = '';
            message = await this.rp.NameInput.evaluate(
                element =>
                    (element as HTMLInputElement).validationMessage
            );
            if (!message) {
                message = await this.rp.EmailInput.evaluate(
                    element =>
                        (element as HTMLInputElement).validationMessage
                );
            }
            if (!message) {
                message = await this.rp.MobileInput.evaluate(
                    element =>
                        (element as HTMLInputElement).validationMessage
                );
            }
            expect(message).toBe(expectedMessage);
        }
        else if (expectedMessage === 'Passwords do not match') {
            await expect(this.rp.passwordMismatchMessage).toHaveText(expectedMessage);
        }
    
    });

When('the user enters the registration details with an existing email', async function (this:BugFinder) {
  // Write code here that turns the phrase above into concrete actions
    const data = invalidRegisterData[0]!;

        await this.rp.setName(data.Name);
        await this.rp.setAlreadyExistEmail(data.Email);
        await this.rp.setMobile(String(data.Phone));
        await this.rp.setPassword(data.password);
        await this.rp.setConfirmPassword(data.Retype_password);
        await this.rp.checkAcceptTerms()
});

Then('the user can see the message An account with this email already exists. Please sign in', async function (this:BugFinder) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.rp.alreadyExistEmail).toBeVisible();

  await expect(this.rp.alreadyExistEmail).toContainText('An account with this email already exists. Please sign in');
});
When('the user enters the following registration details:', async function (this:BugFinder,dataTable) {
  // Write code here that turns the phrase above into concrete actions
  
        const data = dataTable.hashes()[0];
        await this.rp.setName(data.Name);
        await this.rp.setAlreadyExistEmail(data.Email);
        await this.rp.setMobile(data.Phone);
        await this.rp.setPassword(data.password);
        await this.rp.setConfirmPassword(data.Retype_password);
        await this.rp.checkAcceptTerms();

});

Then('the user should see the message An account with this email is already registered and pending admin approval.', async function () {
  // Write code here that turns the phrase above into concrete actions
   await expect(this.rp.pendingApproval).toBeVisible();

   await expect(this.rp.pendingApproval).toContainText('An account with this email is already registered and pending admin approval.');
});