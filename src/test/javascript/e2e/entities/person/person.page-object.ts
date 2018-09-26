import { element, by, ElementFinder } from 'protractor';

export class PersonComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-person div table .btn-danger'));
    title = element.all(by.css('jhi-person div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PersonUpdatePage {
    pageTitle = element(by.id('jhi-person-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userNameInput = element(by.id('field_userName'));
    emailInput = element(by.id('field_email'));
    adjustmentSchemaSelect = element(by.id('field_adjustmentSchema'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUserNameInput(userName) {
        await this.userNameInput.sendKeys(userName);
    }

    async getUserNameInput() {
        return this.userNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async adjustmentSchemaSelectLastOption() {
        await this.adjustmentSchemaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async adjustmentSchemaSelectOption(option) {
        await this.adjustmentSchemaSelect.sendKeys(option);
    }

    getAdjustmentSchemaSelect(): ElementFinder {
        return this.adjustmentSchemaSelect;
    }

    async getAdjustmentSchemaSelectedOption() {
        return this.adjustmentSchemaSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class PersonDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-person-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-person'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
