import { element, by, ElementFinder } from 'protractor';

export class BadgeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-badge div table .btn-danger'));
    title = element.all(by.css('jhi-badge div h2#page-heading span')).first();

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

export class BadgeUpdatePage {
    pageTitle = element(by.id('jhi-badge-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tagInput = element(by.id('field_tag'));
    typeSelect = element(by.id('field_type'));
    personSelect = element(by.id('field_person'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTagInput(tag) {
        await this.tagInput.sendKeys(tag);
    }

    async getTagInput() {
        return this.tagInput.getAttribute('value');
    }

    async setTypeSelect(type) {
        await this.typeSelect.sendKeys(type);
    }

    async getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    async typeSelectLastOption() {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async personSelectLastOption() {
        await this.personSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async personSelectOption(option) {
        await this.personSelect.sendKeys(option);
    }

    getPersonSelect(): ElementFinder {
        return this.personSelect;
    }

    async getPersonSelectedOption() {
        return this.personSelect.element(by.css('option:checked')).getText();
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

export class BadgeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-badge-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-badge'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
