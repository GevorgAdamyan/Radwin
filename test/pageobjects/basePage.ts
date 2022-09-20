export default class BasePage {
    async goTo(url: string): Promise<string> {
        await browser.maximizeWindow();
        return browser.url(url)
    }

    protected async clickOnElement(element: WebdriverIO.Element): Promise<void> {
        await element.click();
    }

    protected async type(element: WebdriverIO.Element, text: string | number): Promise<void> {
        await this.clickOnElement(element);
        await element.clearValue();
        await element.setValue(text)
    }
}
