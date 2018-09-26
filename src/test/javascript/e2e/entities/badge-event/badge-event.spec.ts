/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BadgeEventComponentsPage, BadgeEventDeleteDialog, BadgeEventUpdatePage } from './badge-event.page-object';

const expect = chai.expect;

describe('BadgeEvent e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let badgeEventUpdatePage: BadgeEventUpdatePage;
    let badgeEventComponentsPage: BadgeEventComponentsPage;
    let badgeEventDeleteDialog: BadgeEventDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load BadgeEvents', async () => {
        await navBarPage.goToEntity('badge-event');
        badgeEventComponentsPage = new BadgeEventComponentsPage();
        expect(await badgeEventComponentsPage.getTitle()).to.eq('comeGoApp.badgeEvent.home.title');
    });

    it('should load create BadgeEvent page', async () => {
        await badgeEventComponentsPage.clickOnCreateButton();
        badgeEventUpdatePage = new BadgeEventUpdatePage();
        expect(await badgeEventUpdatePage.getPageTitle()).to.eq('comeGoApp.badgeEvent.home.createOrEditLabel');
        await badgeEventUpdatePage.cancel();
    });

    it('should create and save BadgeEvents', async () => {
        const nbButtonsBeforeCreate = await badgeEventComponentsPage.countDeleteButtons();

        await badgeEventComponentsPage.clickOnCreateButton();
        await badgeEventUpdatePage.setOccuranceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await badgeEventUpdatePage.getOccuranceInput()).to.contain('2001-01-01T02:30');
        await badgeEventUpdatePage.badgeSelectLastOption();
        await badgeEventUpdatePage.save();
        expect(await badgeEventUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await badgeEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last BadgeEvent', async () => {
        const nbButtonsBeforeDelete = await badgeEventComponentsPage.countDeleteButtons();
        await badgeEventComponentsPage.clickOnLastDeleteButton();

        badgeEventDeleteDialog = new BadgeEventDeleteDialog();
        expect(await badgeEventDeleteDialog.getDialogTitle()).to.eq('comeGoApp.badgeEvent.delete.question');
        await badgeEventDeleteDialog.clickOnConfirmButton();

        expect(await badgeEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
