import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TopbarComponentsPage, TopbarDeleteDialog, TopbarUpdatePage } from './topbar.page-object';

const expect = chai.expect;

describe('Topbar e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let topbarComponentsPage: TopbarComponentsPage;
  let topbarUpdatePage: TopbarUpdatePage;
  let topbarDeleteDialog: TopbarDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Topbars', async () => {
    await navBarPage.goToEntity('topbar');
    topbarComponentsPage = new TopbarComponentsPage();
    await browser.wait(ec.visibilityOf(topbarComponentsPage.title), 5000);
    expect(await topbarComponentsPage.getTitle()).to.eq('Topbars');
  });

  it('should load create Topbar page', async () => {
    await topbarComponentsPage.clickOnCreateButton();
    topbarUpdatePage = new TopbarUpdatePage();
    expect(await topbarUpdatePage.getPageTitle()).to.eq('Create or edit a Topbar');
    await topbarUpdatePage.cancel();
  });

  it('should create and save Topbars', async () => {
    const nbButtonsBeforeCreate = await topbarComponentsPage.countDeleteButtons();

    await topbarComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await topbarUpdatePage.save();
    expect(await topbarUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await topbarComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Topbar', async () => {
    const nbButtonsBeforeDelete = await topbarComponentsPage.countDeleteButtons();
    await topbarComponentsPage.clickOnLastDeleteButton();

    topbarDeleteDialog = new TopbarDeleteDialog();
    expect(await topbarDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Topbar?');
    await topbarDeleteDialog.clickOnConfirmButton();

    expect(await topbarComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
