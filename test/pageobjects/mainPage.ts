import { ChainablePromiseElement, ChainablePromiseArray } from "webdriverio";
import BasePage from "./basePage";

class MainPage extends BasePage {
    private get searchBar(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('[placeholder="Search address, place or coordinates"]')
    }

    private get autosuggestionList(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('[data-testid="options"]')
    }

    private get locationOption(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('.searchAddressAutocomplete__optionsContainer__option:nth-child(1)')
    }

    private get addAPBtn(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('[data-label="Add AP"]')
    }

    private get bottomBar(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('.bottomPanelBar')
    }

    private get stationsList(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('[data-testid="toggleIcon"]')
    }

    private get station2(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('li [title="Station2"]')
    }

    private get heightFields(): ChainablePromiseArray<WebdriverIO.ElementArray> {
        return $$('[data-autotest="devicePanel__heightValue"]')
    }

    get heightWarning(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('.devicePanel__heightWarning')
    }


    private get strencgthBoxes(): ChainablePromiseArray<WebdriverIO.ElementArray> {
        return $$('.linkPerformanceCharts__valueWrapper > span:nth-child(1)')
    }

    async getStrengthBox(): Promise<WebdriverIO.Element> {
        let boxes = await this.strencgthBoxes;
        return boxes[0]
    }

    private async getHeigthField(): Promise<WebdriverIO.Element> {
        let fields = await this.heightFields;
        return fields[0];
    }

    async searchLocation(location: string): Promise<void> {
        let searchBar = await this.searchBar;
        await this.type(searchBar, location);
        let list = await this.autosuggestionList;
        await list.waitForDisplayed();
        let option = await this.locationOption;
        await this.clickOnElement(option);
    }

    async addAP(): Promise<void> {
        let addBtn = await this.addAPBtn;
        await this.clickOnElement(addBtn);
    }

    async selectStation2(): Promise<void> {
        let bottomBar = await this.bottomBar;
        await bottomBar.waitForDisplayed();
        await this.clickOnElement(bottomBar);
        let stations = await this.stationsList;
        await stations.waitForDisplayed();
        await this.clickOnElement(stations);
        let station2 = await this.station2;
        await station2.waitForDisplayed();
        await this.clickOnElement(station2);
        await browser.pause(3000);
    }

    async insertHeight(height: string): Promise<void> {
        let heightField = await this.getHeigthField();
        await heightField.click();
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
        await browser.pause(2000)
        for (let i=0; i<height.length; i++) {
            await browser.keys(height[i]);
            await browser.pause(500)
        }
    }
}

export default new MainPage();
