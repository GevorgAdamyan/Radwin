import mainPage from '../pageobjects/mainPage'

describe('Adding AP and changing the height', () => {
    before(async() => {
        await mainPage.goTo('https://ispdesign.ui.com/');
        await mainPage.searchLocation('New York, NY, USA');
        await mainPage.addAP();
        await mainPage.selectStation2()
    })



    it('Adding AP and inserting the height', async () => {
        await mainPage.insertHeight('30');
        let strencgthBox = await mainPage.getStrengthBox();
        await expect(strencgthBox).toHaveTextContaining('-44')
    });

    it('Adding AP and inserting the height lower then AP location', async () => {
        await mainPage.insertHeight('3');
        let strencgthBox = await mainPage.getStrengthBox();
        await expect(strencgthBox).toHaveTextContaining('Link Obstructed')
    });
});



