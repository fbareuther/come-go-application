/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdjustmentSchemaComponentsPage, AdjustmentSchemaDeleteDialog, AdjustmentSchemaUpdatePage } from './adjustment-schema.page-object';

const expect = chai.expect;

describe('AdjustmentSchema e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let adjustmentSchemaUpdatePage: AdjustmentSchemaUpdatePage;
    let adjustmentSchemaComponentsPage: AdjustmentSchemaComponentsPage;
    let adjustmentSchemaDeleteDialog: AdjustmentSchemaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AdjustmentSchemas', async () => {
        await navBarPage.goToEntity('adjustment-schema');
        adjustmentSchemaComponentsPage = new AdjustmentSchemaComponentsPage();
        expect(await adjustmentSchemaComponentsPage.getTitle()).to.eq('comeGoApp.adjustmentSchema.home.title');
    });

    it('should load create AdjustmentSchema page', async () => {
        await adjustmentSchemaComponentsPage.clickOnCreateButton();
        adjustmentSchemaUpdatePage = new AdjustmentSchemaUpdatePage();
        expect(await adjustmentSchemaUpdatePage.getPageTitle()).to.eq('comeGoApp.adjustmentSchema.home.createOrEditLabel');
        await adjustmentSchemaUpdatePage.cancel();
    });

    it('should create and save AdjustmentSchemas', async () => {
        const nbButtonsBeforeCreate = await adjustmentSchemaComponentsPage.countDeleteButtons();

        await adjustmentSchemaComponentsPage.clickOnCreateButton();
        await adjustmentSchemaUpdatePage.setNameInput('name');
        expect(await adjustmentSchemaUpdatePage.getNameInput()).to.eq('name');
        await adjustmentSchemaUpdatePage.setKeyInput('key');
        expect(await adjustmentSchemaUpdatePage.getKeyInput()).to.eq('key');
        await adjustmentSchemaUpdatePage.setValidFromInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await adjustmentSchemaUpdatePage.getValidFromInput()).to.contain('2001-01-01T02:30');
        const selectedActive = adjustmentSchemaUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await adjustmentSchemaUpdatePage.getActiveInput().click();
            expect(await adjustmentSchemaUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await adjustmentSchemaUpdatePage.getActiveInput().click();
            expect(await adjustmentSchemaUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        await adjustmentSchemaUpdatePage.save();
        expect(await adjustmentSchemaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await adjustmentSchemaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AdjustmentSchema', async () => {
        const nbButtonsBeforeDelete = await adjustmentSchemaComponentsPage.countDeleteButtons();
        await adjustmentSchemaComponentsPage.clickOnLastDeleteButton();

        adjustmentSchemaDeleteDialog = new AdjustmentSchemaDeleteDialog();
        expect(await adjustmentSchemaDeleteDialog.getDialogTitle()).to.eq('comeGoApp.adjustmentSchema.delete.question');
        await adjustmentSchemaDeleteDialog.clickOnConfirmButton();

        expect(await adjustmentSchemaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
