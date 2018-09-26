/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BadgeComponentsPage, BadgeDeleteDialog, BadgeUpdatePage } from './badge.page-object';

const expect = chai.expect;

describe('Badge e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let badgeUpdatePage: BadgeUpdatePage;
    let badgeComponentsPage: BadgeComponentsPage;
    let badgeDeleteDialog: BadgeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Badges', async () => {
        await navBarPage.goToEntity('badge');
        badgeComponentsPage = new BadgeComponentsPage();
        expect(await badgeComponentsPage.getTitle()).to.eq('comeGoApp.badge.home.title');
    });

    it('should load create Badge page', async () => {
        await badgeComponentsPage.clickOnCreateButton();
        badgeUpdatePage = new BadgeUpdatePage();
        expect(await badgeUpdatePage.getPageTitle()).to.eq('comeGoApp.badge.home.createOrEditLabel');
        await badgeUpdatePage.cancel();
    });

    it('should create and save Badges', async () => {
        const nbButtonsBeforeCreate = await badgeComponentsPage.countDeleteButtons();

        await badgeComponentsPage.clickOnCreateButton();
        await badgeUpdatePage.setTagInput('tag');
        expect(await badgeUpdatePage.getTagInput()).to.eq('tag');
        await badgeUpdatePage.typeSelectLastOption();
        await badgeUpdatePage.personSelectLastOption();
        await badgeUpdatePage.save();
        expect(await badgeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await badgeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Badge', async () => {
        const nbButtonsBeforeDelete = await badgeComponentsPage.countDeleteButtons();
        await badgeComponentsPage.clickOnLastDeleteButton();

        badgeDeleteDialog = new BadgeDeleteDialog();
        expect(await badgeDeleteDialog.getDialogTitle()).to.eq('comeGoApp.badge.delete.question');
        await badgeDeleteDialog.clickOnConfirmButton();

        expect(await badgeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
