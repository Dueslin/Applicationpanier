import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductlistComponentsPage, ProductlistDeleteDialog, ProductlistUpdatePage } from './productlist.page-object';

const expect = chai.expect;

describe('Productlist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productlistComponentsPage: ProductlistComponentsPage;
  let productlistUpdatePage: ProductlistUpdatePage;
  let productlistDeleteDialog: ProductlistDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Productlists', async () => {
    await navBarPage.goToEntity('productlist');
    productlistComponentsPage = new ProductlistComponentsPage();
    await browser.wait(ec.visibilityOf(productlistComponentsPage.title), 5000);
    expect(await productlistComponentsPage.getTitle()).to.eq('Productlists');
  });

  it('should load create Productlist page', async () => {
    await productlistComponentsPage.clickOnCreateButton();
    productlistUpdatePage = new ProductlistUpdatePage();
    expect(await productlistUpdatePage.getPageTitle()).to.eq('Create or edit a Productlist');
    await productlistUpdatePage.cancel();
  });

  it('should create and save Productlists', async () => {
    const nbButtonsBeforeCreate = await productlistComponentsPage.countDeleteButtons();

    await productlistComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await productlistUpdatePage.save();
    expect(await productlistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Productlist', async () => {
    const nbButtonsBeforeDelete = await productlistComponentsPage.countDeleteButtons();
    await productlistComponentsPage.clickOnLastDeleteButton();

    productlistDeleteDialog = new ProductlistDeleteDialog();
    expect(await productlistDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Productlist?');
    await productlistDeleteDialog.clickOnConfirmButton();

    expect(await productlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
