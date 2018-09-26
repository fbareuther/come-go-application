/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HistoryComponentsPage, HistoryDeleteDialog, HistoryUpdatePage } from './history.page-object';

const expect = chai.expect;

describe('History e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let historyUpdatePage: HistoryUpdatePage;
    let historyComponentsPage: HistoryComponentsPage;
    let historyDeleteDialog: HistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Histories', async () => {
        await navBarPage.goToEntity('history');
        historyComponentsPage = new HistoryComponentsPage();
        expect(await historyComponentsPage.getTitle()).to.eq('comeGoApp.history.home.title');
    });

    it('should load create History page', async () => {
        await historyComponentsPage.clickOnCreateButton();
        historyUpdatePage = new HistoryUpdatePage();
        expect(await historyUpdatePage.getPageTitle()).to.eq('comeGoApp.history.home.createOrEditLabel');
        await historyUpdatePage.cancel();
    });

    it('should create and save Histories', async () => {
        const nbButtonsBeforeCreate = await historyComponentsPage.countDeleteButtons();

        await historyComponentsPage.clickOnCreateButton();
        await historyUpdatePage.setActualDateInput('2000-12-31');
        expect(await historyUpdatePage.getActualDateInput()).to.eq('2000-12-31');
        await historyUpdatePage.setStartEventInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await historyUpdatePage.getStartEventInput()).to.contain('2001-01-01T02:30');
        await historyUpdatePage.setEndEventInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await historyUpdatePage.getEndEventInput()).to.contain('2001-01-01T02:30');
        await historyUpdatePage.setGrossHoursInput('5');
        expect(await historyUpdatePage.getGrossHoursInput()).to.eq('5');
        await historyUpdatePage.setDeductionHoursInput('5');
        expect(await historyUpdatePage.getDeductionHoursInput()).to.eq('5');
        await historyUpdatePage.setAdditionHoursInput('5');
        expect(await historyUpdatePage.getAdditionHoursInput()).to.eq('5');
        await historyUpdatePage.setNetHoursInput('5');
        expect(await historyUpdatePage.getNetHoursInput()).to.eq('5');
        await historyUpdatePage.badgeSelectLastOption();
        await historyUpdatePage.personSelectLastOption();
        await historyUpdatePage.save();
        expect(await historyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await historyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last History', async () => {
        const nbButtonsBeforeDelete = await historyComponentsPage.countDeleteButtons();
        await historyComponentsPage.clickOnLastDeleteButton();

        historyDeleteDialog = new HistoryDeleteDialog();
        expect(await historyDeleteDialog.getDialogTitle()).to.eq('comeGoApp.history.delete.question');
        await historyDeleteDialog.clickOnConfirmButton();

        expect(await historyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
