import { webdriver_app_url, sauce_labs_username, sauce_labs_access_key } from '../_config';
var webdriver = require('selenium-webdriver'),
    username = sauce_labs_username,
    accessKey = sauce_labs_access_key,
    driver;

//Platforms - 'OS X 10.9', 'Windows 10', 'Windows 7'
//Firefox 53,  Chrome 57
driver = new webdriver.Builder().
withCapabilities({
    'browserName': 'chrome',
    'platform': 'Windows 10',
    'version': '57',
    'username': username,
    'accessKey': accessKey
}).
usingServer("http://" + username + ":" + accessKey +
    "@ondemand.saucelabs.com:80/wd/hub").
build();

driver.get();
driver.findElement(webdriver.By.id('email')).sendKeys('admin@neo.com');
driver.findElement(webdriver.By.id('password')).sendKeys('admin123');

driver.findElement(webdriver.By.xpath("//*[@id='root']/div/div/div/form/button[1]")).click();


driver.wait(webdriver.until.elementLocated(webdriver.By.linkText("Manage")), 10000).then(function(elm) {
    console.log("found manage link");
    driver.takeScreenshot();
    driver.quit();
}).catch(function(ex) {
    console.log("could not find manage link");
    driver.takeScreenshot();
    driver.quit();
});

