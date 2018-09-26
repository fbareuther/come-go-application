import { element, by, ElementFinder } from 'protractor';

export class HistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-history div table .btn-danger'));
    title = element.all(by.css('jhi-history div h2#page-heading span')).first();

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

export class HistoryUpdatePage {
    pageTitle = element(by.id('jhi-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    actualDateInput = element(by.id('field_actualDate'));
    startEventInput = element(by.id('field_startEvent'));
    endEventInput = element(by.id('field_endEvent'));
    grossHoursInput = element(by.id('field_grossHours'));
    deductionHoursInput = element(by.id('field_deductionHours'));
    additionHoursInput = element(by.id('field_additionHours'));
    netHoursInput = element(by.id('field_netHours'));
    badgeSelect = element(by.id('field_badge'));
    personSelect = element(by.id('field_person'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setActualDateInput(actualDate) {
        await this.actualDateInput.sendKeys(actualDate);
    }

    async getActualDateInput() {
        return this.actualDateInput.getAttribute('value');
    }

    async setStartEventInput(startEvent) {
        await this.startEventInput.sendKeys(startEvent);
    }

    async getStartEventInput() {
        return this.startEventInput.getAttribute('value');
    }

    async setEndEventInput(endEvent) {
        await this.endEventInput.sendKeys(endEvent);
    }

    async getEndEventInput() {
        return this.endEventInput.getAttribute('value');
    }

    async setGrossHoursInput(grossHours) {
        await this.grossHoursInput.sendKeys(grossHours);
    }

    async getGrossHoursInput() {
        return this.grossHoursInput.getAttribute('value');
    }

    async setDeductionHoursInput(deductionHours) {
        await this.deductionHoursInput.sendKeys(deductionHours);
    }

    async getDeductionHoursInput() {
        return this.deductionHoursInput.getAttribute('value');
    }

    async setAdditionHoursInput(additionHours) {
        await this.additionHoursInput.sendKeys(additionHours);
    }

    async getAdditionHoursInput() {
        return this.additionHoursInput.getAttribute('value');
    }

    async setNetHoursInput(netHours) {
        await this.netHoursInput.sendKeys(netHours);
    }

    async getNetHoursInput() {
        return this.netHoursInput.getAttribute('value');
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

export class HistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-history-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-history'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
