import { element, by, ElementFinder } from 'protractor';

export class BadgeEventComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-badge-event div table .btn-danger'));
    title = element.all(by.css('jhi-badge-event div h2#page-heading span')).first();

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

export class BadgeEventUpdatePage {
    pageTitle = element(by.id('jhi-badge-event-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    occuranceInput = element(by.id('field_occurance'));
    badgeSelect = element(by.id('field_badge'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOccuranceInput(occurance) {
        await this.occuranceInput.sendKeys(occurance);
    }

    async getOccuranceInput() {
        return this.occuranceInput.getAttribute('value');
    }

    async badgeSelectLastOption() {
        await this.badgeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async badgeSelectOption(option) {
        await this.badgeSelect.sendKeys(option);
    }

    getBadgeSelect(): ElementFinder {
        return this.badgeSelect;
    }

    async getBadgeSelectedOption() {
        return this.badgeSelect.element(by.css('option:checked')).getText();
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

export class BadgeEventDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-badgeEvent-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-badgeEvent'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
