/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonComponentsPage, PersonDeleteDialog, PersonUpdatePage } from './person.page-object';

const expect = chai.expect;

describe('Person e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let personUpdatePage: PersonUpdatePage;
    let personComponentsPage: PersonComponentsPage;
    let personDeleteDialog: PersonDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load People', async () => {
        await navBarPage.goToEntity('person');
        personComponentsPage = new PersonComponentsPage();
        expect(await personComponentsPage.getTitle()).to.eq('comeGoApp.person.home.title');
    });

    it('should load create Person page', async () => {
        await personComponentsPage.clickOnCreateButton();
        personUpdatePage = new PersonUpdatePage();
        expect(await personUpdatePage.getPageTitle()).to.eq('comeGoApp.person.home.createOrEditLabel');
        await personUpdatePage.cancel();
    });

    it('should create and save People', async () => {
        const nbButtonsBeforeCreate = await personComponentsPage.countDeleteButtons();

        await personComponentsPage.clickOnCreateButton();
        await personUpdatePage.setUserNameInput('userName');
        expect(await personUpdatePage.getUserNameInput()).to.eq('userName');
        await personUpdatePage.setEmailInput('email');
        expect(await personUpdatePage.getEmailInput()).to.eq('email');
        await personUpdatePage.adjustmentSchemaSelectLastOption();
        await personUpdatePage.save();
        expect(await personUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Person', async () => {
        const nbButtonsBeforeDelete = await personComponentsPage.countDeleteButtons();
        await personComponentsPage.clickOnLastDeleteButton();

        personDeleteDialog = new PersonDeleteDialog();
        expect(await personDeleteDialog.getDialogTitle()).to.eq('comeGoApp.person.delete.question');
        await personDeleteDialog.clickOnConfirmButton();

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
