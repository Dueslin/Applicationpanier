import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductdetailsComponentsPage, ProductdetailsDeleteDialog, ProductdetailsUpdatePage } from './productdetails.page-object';

const expect = chai.expect;

describe('Productdetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productdetailsComponentsPage: ProductdetailsComponentsPage;
  let productdetailsUpdatePage: ProductdetailsUpdatePage;
  let productdetailsDeleteDialog: ProductdetailsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Productdetails', async () => {
    await navBarPage.goToEntity('productdetails');
    productdetailsComponentsPage = new ProductdetailsComponentsPage();
    await browser.wait(ec.visibilityOf(productdetailsComponentsPage.title), 5000);
    expect(await productdetailsComponentsPage.getTitle()).to.eq('Productdetails');
  });

  it('should load create Productdetails page', async () => {
    await productdetailsComponentsPage.clickOnCreateButton();
    productdetailsUpdatePage = new ProductdetailsUpdatePage();
    expect(await productdetailsUpdatePage.getPageTitle()).to.eq('Create or edit a Productdetails');
    await productdetailsUpdatePage.cancel();
  });

  it('should create and save Productdetails', async () => {
    const nbButtonsBeforeCreate = await productdetailsComponentsPage.countDeleteButtons();

    await productdetailsComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await productdetailsUpdatePage.save();
    expect(await productdetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productdetailsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last Productdetails', async () => {
    const nbButtonsBeforeDelete = await productdetailsComponentsPage.countDeleteButtons();
    await productdetailsComponentsPage.clickOnLastDeleteButton();

    productdetailsDeleteDialog = new ProductdetailsDeleteDialog();
    expect(await productdetailsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Productdetails?');
    await productdetailsDeleteDialog.clickOnConfirmButton();

    expect(await productdetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
