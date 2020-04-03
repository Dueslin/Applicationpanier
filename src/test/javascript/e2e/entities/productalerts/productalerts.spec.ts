import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductalertsComponentsPage, ProductalertsDeleteDialog, ProductalertsUpdatePage } from './productalerts.page-object';

const expect = chai.expect;

describe('Productalerts e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productalertsComponentsPage: ProductalertsComponentsPage;
  let productalertsUpdatePage: ProductalertsUpdatePage;
  let productalertsDeleteDialog: ProductalertsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Productalerts', async () => {
    await navBarPage.goToEntity('productalerts');
    productalertsComponentsPage = new ProductalertsComponentsPage();
    await browser.wait(ec.visibilityOf(productalertsComponentsPage.title), 5000);
    expect(await productalertsComponentsPage.getTitle()).to.eq('Productalerts');
  });

  it('should load create Productalerts page', async () => {
    await productalertsComponentsPage.clickOnCreateButton();
    productalertsUpdatePage = new ProductalertsUpdatePage();
    expect(await productalertsUpdatePage.getPageTitle()).to.eq('Create or edit a Productalerts');
    await productalertsUpdatePage.cancel();
  });

  it('should create and save Productalerts', async () => {
    const nbButtonsBeforeCreate = await productalertsComponentsPage.countDeleteButtons();

    await productalertsComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await productalertsUpdatePage.save();
    expect(await productalertsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productalertsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Productalerts', async () => {
    const nbButtonsBeforeDelete = await productalertsComponentsPage.countDeleteButtons();
    await productalertsComponentsPage.clickOnLastDeleteButton();

    productalertsDeleteDialog = new ProductalertsDeleteDialog();
    expect(await productalertsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Productalerts?');
    await productalertsDeleteDialog.clickOnConfirmButton();

    expect(await productalertsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
