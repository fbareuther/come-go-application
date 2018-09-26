import { element, by, ElementFinder } from 'protractor';

export class AdjustmentSchemaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-adjustment-schema div table .btn-danger'));
    title = element.all(by.css('jhi-adjustment-schema div h2#page-heading span')).first();

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

export class AdjustmentSchemaUpdatePage {
    pageTitle = element(by.id('jhi-adjustment-schema-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    keyInput = element(by.id('field_key'));
    validFromInput = element(by.id('field_validFrom'));
    activeInput = element(by.id('field_active'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setKeyInput(key) {
        await this.keyInput.sendKeys(key);
    }

    async getKeyInput() {
        return this.keyInput.getAttribute('value');
    }

    async setValidFromInput(validFrom) {
        await this.validFromInput.sendKeys(validFrom);
    }

    async getValidFromInput() {
        return this.validFromInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
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

export class AdjustmentSchemaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-adjustmentSchema-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-adjustmentSchema'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
