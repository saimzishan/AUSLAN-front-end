import {defineSupportCode, HookScenarioResult} from 'cucumber';
import * as path from 'path';
import {browser} from 'protractor';
import {WriteStream, ensureDirSync, createWriteStream} from 'fs-extra';
import {Heroku} from '../../helper';


interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void);
}

defineSupportCode(({After}) => {
    After(function (scenarioResult: HookScenarioResult) {
        if (Boolean(browser.params.debug) && browser.params.debug &&
            scenarioResult.status === 'failed') {
            const world = this;
            // (scenarioResult.status === 'failed') ? saveFailedScenarioScreenshot(world, scenarioResult) : Promise.resolve();
        } else {
            Heroku.sendCommandToHeroku('Assignment.destroy_all;Booking.destroy_all;MessageThread.destroy_all;User.destroy_all;Delayed::Job.destroy_all');
        }
        return browser.restart();
    });

    /**
     * Save a screenshot when a scenario failed
     */
    function saveFailedScenarioScreenshot(world: World, scenarioResult: HookScenarioResult) {
        return browser.takeScreenshot().then((screenshot) => {
            const fileName = `${scenarioResult.scenario.name
                .replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
                .toLowerCase().substr(0, 100)}.png`;

            world.attach(screenshot, 'image/png');

            saveScreenshot(screenshot, fileName);
        });
    }

    /**
     * Save a screenshot
     */
    function saveScreenshot(screenshot: string, fileName: string) {
        const screenshotPath = path.resolve(process.cwd(), '.tmp/screenshots');
        const filepath = path.resolve(screenshotPath, fileName);

        let stream: WriteStream;

        ensureDirSync(screenshotPath);
        stream = createWriteStream(filepath);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }
});
