import { Capabilities } from 'selenium-webdriver';
import { browser } from 'protractor';
import { defineSupportCode } from 'cucumber';
const JsonFormatter = require('cucumber').JsonFormatter;
const fs = require('fs-extra');
const jsonFile = require('jsonfile');
const path = require('path');
const projectRoot = process.cwd();
