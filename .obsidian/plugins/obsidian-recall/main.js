'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.addTime = function (date, time) {
        return new Date(date.getTime() + time);
    };
    DateUtils.fromNow = function (time) {
        return this.addTime(new Date(), time);
    };
    DateUtils.DAYS_TO_MILLIS = 86400000;
    return DateUtils;
}());
var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
    }
    /**
     * Creates a copy of obj, and copies values from source into
     * the copy, but only if there already is a property with the
     * matching name.
     *
     * @param obj
     * @param source
     */
    ObjectUtils.assignOnly = function (obj, source) {
        var newObj = Object.assign(obj);
        if (source != undefined) {
            Object.keys(obj).forEach(function (key) {
                if (key in source) {
                    newObj[key] = source[key];
                }
            });
        }
        return newObj;
    };
    return ObjectUtils;
}());

var SrsAlgorithm = /** @class */ (function () {
    function SrsAlgorithm() {
    }
    SrsAlgorithm.prototype.updateSettings = function (settings) {
        this.settings = ObjectUtils.assignOnly(this.defaultSettings(), settings);
    };
    return SrsAlgorithm;
}());

var LeitnerAlgorithm = /** @class */ (function (_super) {
    __extends(LeitnerAlgorithm, _super);
    function LeitnerAlgorithm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeitnerAlgorithm.prototype.defaultSettings = function () {
        return {
            stages: 6,
            resetOnIncorrect: true,
            timings: [1, 3, 7, 14, 30, 180],
        };
    };
    LeitnerAlgorithm.prototype.defaultData = function () {
        return {
            stage: 0,
        };
    };
    LeitnerAlgorithm.prototype.srsOptions = function () {
        return ["Wrong", "Correct"];
    };
    LeitnerAlgorithm.prototype.onSelection = function (item, option, repeat) {
        var data = item.data;
        if (data.stage === "undefined") {
            data.stage = 0;
        }
        if (option == "Correct") {
            if (repeat) {
                return { correct: true, nextReview: -1 };
            }
            data.stage += 1;
            if (data.stage > this.settings.stages) {
                data.stage = this.settings.stages;
            }
            return {
                correct: true,
                nextReview: this.settings.timings[data.stage - 1] *
                    DateUtils.DAYS_TO_MILLIS,
            };
        }
        else {
            if (repeat) {
                return { correct: false, nextReview: -1 };
            }
            if (this.settings.resetOnIncorrect) {
                data.stage = 1;
            }
            else {
                data.stage = Math.max(1, data.stage - 1);
            }
            return {
                correct: false,
                nextReview: this.settings.timings[data.stage - 1] *
                    DateUtils.DAYS_TO_MILLIS,
            };
        }
    };
    LeitnerAlgorithm.prototype.displaySettings = function (containerEl, update) {
        var _this = this;
        new obsidian.Setting(containerEl)
            .setName("Stages")
            .setDesc("The number of SRS stages.")
            .addText(function (text) {
            return text
                .setPlaceholder("Stages")
                .setValue(_this.settings.stages.toString())
                .onChange(function (newValue) {
                var _a;
                var stages = Number(newValue);
                if (isNaN(stages)) {
                    new obsidian.Notice("Stages must be a number.");
                    return;
                }
                if (!Number.isInteger(stages) || stages < 1) {
                    new obsidian.Notice("Stages must be an integer larger than 0.");
                    return;
                }
                var old = _this.settings.stages;
                _this.settings.stages = stages;
                if (old < stages) {
                    (_a = _this.settings.timings).push.apply(_a, new Array(stages - old).fill(0));
                }
                else if (old > stages) {
                    _this.settings.timings = _this.settings.timings.slice(0, stages);
                }
                _this.updateTimingsList(update);
                update(_this.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Reset When Incorrect")
            .setDesc("If true, a review item is moved back to the first stage when marked as incorrect. Otherwise it simply moves back to the previous stage.")
            .addToggle(function (toggle) {
            toggle.setValue(_this.settings.resetOnIncorrect);
            toggle.onChange(function (val) {
                _this.settings.resetOnIncorrect = val;
                update(_this.settings);
            });
        });
        var timingsDiv = containerEl.createDiv("timings-setting-item setting-item");
        timingsDiv.createDiv("setting-item-info", function (div) {
            div.createDiv("setting-item-name").innerText = "Timings";
            div.createDiv("setting-item-description").innerText =
                "The timings (in days) of each SRS stage.";
        });
        this.timingsList = timingsDiv.createDiv("setting-item-control");
        this.updateTimingsList(update);
    };
    LeitnerAlgorithm.prototype.updateTimingsList = function (update) {
        var _this = this;
        this.timingsList.empty();
        this.settings.timings.forEach(function (val, ind) {
            new obsidian.TextComponent(_this.timingsList)
                .setPlaceholder(ind.toString())
                .setValue(val.toString())
                .onChange(function (newValue) {
                var num = Number(newValue);
                if (isNaN(num)) {
                    new obsidian.Notice("Timing must be a number.");
                    return;
                }
                if (!Number.isInteger(num) || num < 1) {
                    new obsidian.Notice("Stages must be an integer larger than 0.");
                    return;
                }
                _this.settings.timings[ind] = num;
                update(_this.settings);
            });
        });
    };
    return LeitnerAlgorithm;
}(SrsAlgorithm));

var Sm2Options = [
    "Blackout",
    "Incorrect",
    "Incorrect (Easy)",
    "Hard",
    "Medium",
    "Easy",
];
/**
 * Implementation of the SM2 algorithm as described at
 * https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */
var Sm2Algorithm = /** @class */ (function (_super) {
    __extends(Sm2Algorithm, _super);
    function Sm2Algorithm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sm2Algorithm.prototype.defaultSettings = function () {
        return {};
    };
    Sm2Algorithm.prototype.defaultData = function () {
        return {
            ease: 2.5,
            lastInterval: 0,
            iteration: 1,
        };
    };
    Sm2Algorithm.prototype.srsOptions = function () {
        return Sm2Options;
    };
    Sm2Algorithm.prototype.onSelection = function (item, optionStr, repeat) {
        var data = item.data;
        var interval = function (n) {
            if (n === 1) {
                return 1;
            }
            else if (n === 2) {
                return 6;
            }
            else {
                return Math.round(data.lastInterval * data.ease);
            }
        };
        var q = Sm2Options.indexOf(optionStr);
        if (repeat) {
            if (q < 3) {
                return { correct: false, nextReview: -1 };
            }
            else {
                return { correct: true, nextReview: -1 };
            }
        }
        if (q < 3) {
            data.iteration = 1;
            var nextReview = interval(data.iteration);
            data.lastInterval = nextReview;
            return {
                correct: false,
                nextReview: nextReview * DateUtils.DAYS_TO_MILLIS,
            };
        }
        else {
            var nextReview = interval(data.iteration);
            data.iteration += 1;
            data.ease = data.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
            if (data.ease < 1.3) {
                data.ease = 1.3;
            }
            data.lastInterval = nextReview;
            return {
                correct: true,
                nextReview: nextReview * DateUtils.DAYS_TO_MILLIS,
            };
        }
    };
    Sm2Algorithm.prototype.displaySettings = function (containerEl, update) { };
    return Sm2Algorithm;
}(SrsAlgorithm));

var AnkiOptions = ["Again", "Hard", "Good", "Easy"];
/**
 * This is an implementation of the Anki algorithm as described in
 * https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html
 */
var AnkiAlgorithm = /** @class */ (function (_super) {
    __extends(AnkiAlgorithm, _super);
    function AnkiAlgorithm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnkiAlgorithm.prototype.defaultSettings = function () {
        return {
            easyBonus: 1.3,
            startingEase: 2.5,
            lapseInterval: 0.5,
            graduatingInterval: 1,
            easyInterval: 4,
        };
    };
    AnkiAlgorithm.prototype.defaultData = function () {
        return {
            ease: this.settings.startingEase,
            lastInterval: 0,
            iteration: 1,
        };
    };
    AnkiAlgorithm.prototype.srsOptions = function () {
        return AnkiOptions;
    };
    AnkiAlgorithm.prototype.onSelection = function (item, optionStr, repeat) {
        var data = item.data;
        var response = AnkiOptions.indexOf(optionStr);
        var correct = true;
        var nextInterval = 0;
        if (repeat) {
            if (response == 0) {
                correct = false;
            }
            return {
                correct: correct,
                nextReview: -1,
            };
        }
        if (response == 0) {
            // Again
            data.ease = Math.max(1.3, data.ease - 0.2);
            nextInterval = data.lastInterval * this.settings.lapseInterval;
            correct = false;
        }
        else if (response == 1) {
            // Hard
            data.ease = Math.max(1.3, data.ease - 0.15);
            nextInterval = data.lastInterval * 1.2;
            if (nextInterval - data.lastInterval < 1)
                nextInterval = data.lastInterval + 1;
        }
        else if (response == 2) {
            // Good
            if (data.iteration == 1) {
                // Graduation!
                nextInterval = this.settings.graduatingInterval;
            }
            else {
                nextInterval = data.lastInterval * data.ease;
                if (nextInterval - data.lastInterval < 1)
                    nextInterval = data.lastInterval + 1;
            }
        }
        else if (response == 3) {
            data.ease += 0.15;
            if (data.iteration == 1) {
                // Graduation!
                nextInterval = this.settings.easyInterval;
            }
            else {
                nextInterval =
                    data.lastInterval * data.ease * this.settings.easyBonus;
            }
        }
        data.iteration += 1;
        data.lastInterval = nextInterval;
        return {
            correct: correct,
            nextReview: nextInterval * DateUtils.DAYS_TO_MILLIS,
        };
    };
    AnkiAlgorithm.prototype.displaySettings = function (containerEl, update) {
        var _this = this;
        new obsidian.Setting(containerEl)
            .setName("Starting Ease")
            .setDesc("The initial ease given to an item.")
            .addText(function (text) {
            return text
                .setPlaceholder("Starting Ease")
                .setValue(_this.settings.startingEase.toString())
                .onChange(function (newValue) {
                var ease = Number(newValue);
                if (isNaN(ease) || ease < 0) {
                    new obsidian.Notice("Starting ease must be a positive number.");
                    return;
                }
                if (ease < 1.3) {
                    new obsidian.Notice("Starting ease lower than 1.3 is not recommended.");
                }
                _this.settings.startingEase = ease;
                update(_this.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Easy Bonus")
            .setDesc("A bonus multiplier for items reviewed as easy.")
            .addText(function (text) {
            return text
                .setPlaceholder("Easy Bonus")
                .setValue(_this.settings.easyBonus.toString())
                .onChange(function (newValue) {
                var bonus = Number(newValue);
                if (isNaN(bonus) || bonus < 1) {
                    new obsidian.Notice("Easy bonus must be a number greater than or equal to 1.");
                    return;
                }
                _this.settings.easyBonus = bonus;
                update(_this.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Lapse Interval Modifier")
            .setDesc("A factor to modify the review interval with when an item is reviewed as wrong.")
            .addText(function (text) {
            return text
                .setPlaceholder("Lapse Interval")
                .setValue(_this.settings.lapseInterval.toString())
                .onChange(function (newValue) {
                var lapse = Number(newValue);
                if (isNaN(lapse) || lapse <= 0) {
                    new obsidian.Notice("Lapse interval must be a positive number.");
                    return;
                }
                _this.settings.lapseInterval = lapse;
                update(_this.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Graduating Interval")
            .setDesc("The interval (in days) to the next review after reviewing a new item as 'Good'.")
            .addText(function (text) {
            return text
                .setPlaceholder("Graduating Interval")
                .setValue(_this.settings.graduatingInterval.toString())
                .onChange(function (newValue) {
                var interval = Number(newValue);
                if (isNaN(interval) || interval <= 0) {
                    new obsidian.Notice("Interval must be a positive number.");
                    return;
                }
                _this.settings.graduatingInterval = interval;
                update(_this.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Easy Interval")
            .setDesc("The interval (in days) to the next review after reviewing a new item as 'Easy'.")
            .addText(function (text) {
            return text
                .setPlaceholder("Easy Interval")
                .setValue(_this.settings.easyInterval.toString())
                .onChange(function (newValue) {
                var interval = Number(newValue);
                if (isNaN(interval) || interval <= 0) {
                    new obsidian.Notice("Interval must be a positive number.");
                    return;
                }
                _this.settings.easyInterval = interval;
                update(_this.settings);
            });
        });
    };
    return AnkiAlgorithm;
}(SrsAlgorithm));

var ConfirmModal = /** @class */ (function (_super) {
    __extends(ConfirmModal, _super);
    function ConfirmModal(app, message, callback) {
        var _this = _super.call(this, app) || this;
        _this.message = message;
        _this.callback = callback;
        return _this;
    }
    ConfirmModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("p").setText(this.message);
        var buttonDiv = contentEl.createDiv("srs-flex-row");
        new obsidian.ButtonComponent(buttonDiv)
            .setButtonText("Confirm")
            .onClick(function () {
            _this.callback(true);
            _this.close();
        })
            .setCta();
        new obsidian.ButtonComponent(buttonDiv).setButtonText("Cancel").onClick(function () {
            _this.callback(false);
            _this.close();
        });
    };
    return ConfirmModal;
}(obsidian.Modal));

var algorithms = {
    Anki: new AnkiAlgorithm(),
    SM2: new Sm2Algorithm(),
    Leitner: new LeitnerAlgorithm(),
};
var DataLocation;
(function (DataLocation) {
    DataLocation["PluginFolder"] = "In Plugin Folder";
    DataLocation["RootFolder"] = "In Vault Folder";
})(DataLocation || (DataLocation = {}));
var locationMap = {
    "In Vault Folder": DataLocation.RootFolder,
    "In Plugin Folder": DataLocation.PluginFolder,
};
var DEFAULT_SETTINGS = {
    maxNewPerDay: 20,
    repeatItems: true,
    dataLocation: DataLocation.RootFolder,
    locationPath: "",
    algorithm: Object.keys(algorithms)[0],
    algorithmSettings: Object.values(algorithms)[0].settings,
};
var SrsSettingTab = /** @class */ (function (_super) {
    __extends(SrsSettingTab, _super);
    function SrsSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SrsSettingTab.prototype.display = function () {
        var plugin = this.plugin;
        var containerEl = this.containerEl;
        containerEl.empty();
        this.addNewPerDaySetting(containerEl);
        this.addRepeatItemsSetting(containerEl);
        this.addDataLocationSettings(containerEl);
        this.addAlgorithmSetting(containerEl);
        containerEl.createEl("h1").innerText = "Algorithm Settings";
        // Add algorithm specific settings
        plugin.algorithm.displaySettings(containerEl, function (settings) {
            plugin.settings.algorithmSettings = settings;
            plugin.saveData(plugin.settings);
        });
    };
    SrsSettingTab.prototype.addDataLocationSettings = function (containerEl) {
        var plugin = this.plugin;
        new obsidian.Setting(containerEl)
            .setName("Data Location")
            .setDesc("Where to store the data file for spaced repetition items.")
            .addDropdown(function (dropdown) {
            Object.values(DataLocation).forEach(function (val) {
                dropdown.addOption(val, val);
            });
            dropdown.setValue(plugin.settings.dataLocation);
            dropdown.onChange(function (val) {
                var loc = locationMap[val];
                plugin.settings.dataLocation = loc;
                plugin.store.moveStoreLocation();
                plugin.saveData(plugin.settings);
            });
        });
    };
    SrsSettingTab.prototype.addRepeatItemsSetting = function (containerEl) {
        var plugin = this.plugin;
        new obsidian.Setting(containerEl)
            .setName("Repeat Items")
            .setDesc("Should items marked as incorrect be repeated until correct?")
            .addToggle(function (toggle) {
            toggle.setValue(plugin.settings.repeatItems);
            toggle.onChange(function (value) {
                plugin.settings.repeatItems = value;
                plugin.saveData(plugin.settings);
            });
        });
    };
    SrsSettingTab.prototype.addAlgorithmSetting = function (containerEl) {
        var plugin = this.plugin;
        new obsidian.Setting(containerEl)
            .setName("Algorithm")
            .addDropdown(function (dropdown) {
            Object.keys(algorithms).forEach(function (val) {
                dropdown.addOption(val, val);
            });
            dropdown.setValue(plugin.settings.algorithm);
            dropdown.onChange(function (newValue) {
                if (newValue != plugin.settings.algorithm) {
                    new ConfirmModal(plugin.app, "Switching algorithms might reset or impact review timings on existing items.\n                            This change is irreversible. Changing algorithms only takes effect after a restart\n                            or a plugin reload. Are you sure you want to switch algorithms?\n                            ", function (confirmed) {
                        if (confirmed) {
                            plugin.settings.algorithm = newValue;
                            plugin.saveData(plugin.settings);
                        }
                        else {
                            dropdown.setValue(plugin.settings.algorithm);
                        }
                    }).open();
                }
            });
        })
            .settingEl.querySelector(".setting-item-description").innerHTML =
            'The algorithm used for spaced repetition. For more information see <a href="https://github.com/martin-jw/obsidian-recall">algorithms</a>.';
    };
    SrsSettingTab.prototype.addNewPerDaySetting = function (containerEl) {
        var plugin = this.plugin;
        new obsidian.Setting(containerEl)
            .setName("New Per Day")
            .setDesc("Maximum number of new (unreviewed) notes to add to the queue each day.")
            .addText(function (text) {
            return text
                .setPlaceholder("New Per Day")
                .setValue(plugin.settings.maxNewPerDay.toString())
                .onChange(function (newValue) {
                var newPerDay = Number(newValue);
                if (isNaN(newPerDay)) {
                    new obsidian.Notice("Timeout must be a number");
                    return;
                }
                if (newPerDay < -1) {
                    new obsidian.Notice("New per day must be -1 or greater.");
                    return;
                }
                plugin.settings.maxNewPerDay = newPerDay;
                plugin.saveData(plugin.settings);
            });
        });
    };
    return SrsSettingTab;
}(obsidian.PluginSettingTab));

var ROOT_DATA_PATH = "./tracked_files.json";
var PLUGIN_DATA_PATH = "./.obsidian/plugins/obsidian-recall/tracked_files.json";
var DEFAULT_SRS_DATA = {
    queue: [],
    repeatQueue: [],
    items: [],
    trackedFiles: [],
    lastQueue: 0,
    newAdded: 0,
};
var NEW_ITEM = {
    nextReview: 0,
    fileIndex: -1,
    timesReviewed: 0,
    timesCorrect: 0,
    errorStreak: 0,
    data: {},
};
var DataStore = /** @class */ (function () {
    function DataStore(plugin) {
        this.plugin = plugin;
        this.dataPath = this.getStorePath();
    }
    DataStore.prototype.getStorePath = function () {
        var dataLocation = this.plugin.settings.dataLocation;
        if (dataLocation == DataLocation.PluginFolder) {
            return PLUGIN_DATA_PATH;
        }
        else if (dataLocation == DataLocation.RootFolder) {
            return ROOT_DATA_PATH;
        }
    };
    DataStore.prototype.moveStoreLocation = function () {
        var _this = this;
        // TODO: Validate folder
        var adapter = this.plugin.app.vault.adapter;
        var newPath = this.getStorePath();
        if (newPath === this.dataPath) {
            return false;
        }
        try {
            this.save();
            adapter.remove(this.dataPath).then(function () {
                _this.dataPath = newPath;
                new obsidian.Notice("Successfully moved data file!");
                return true;
            }, function (e) {
                _this.dataPath = newPath;
                new obsidian.Notice("Unable to delete old data file, please delete it manually.");
                console.log(e);
                return true;
            });
        }
        catch (e) {
            new obsidian.Notice("Unable to move data file!");
            console.log(e);
            return false;
        }
    };
    DataStore.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adapter, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adapter = this.plugin.app.vault.adapter;
                        return [4 /*yield*/, adapter.exists(this.dataPath)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, adapter.read(this.dataPath)];
                    case 2:
                        data = _a.sent();
                        if (data == null) {
                            console.log("Unable to read SRS data!");
                            this.data = Object.assign({}, DEFAULT_SRS_DATA);
                        }
                        else {
                            console.log("Reading tracked files...");
                            this.data = Object.assign(Object.assign({}, DEFAULT_SRS_DATA), JSON.parse(data));
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        console.log("Tracked files not found! Creating new file...");
                        this.data = Object.assign({}, DEFAULT_SRS_DATA);
                        return [4 /*yield*/, this.plugin.app.vault.adapter.write(this.dataPath, JSON.stringify(this.data))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DataStore.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.plugin.app.vault.adapter.write(this.dataPath, JSON.stringify(this.data))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns total number of items tracked by the SRS.
     */
    DataStore.prototype.items = function () {
        return this.data.items.length;
    };
    /**
     * Returns the size of the current queue.
     */
    DataStore.prototype.queueSize = function () {
        return this.data.queue.length;
    };
    DataStore.prototype.repeatQueueSize = function () {
        return this.data.repeatQueue.length;
    };
    DataStore.prototype.getFileIndex = function (path) {
        return this.data.trackedFiles.findIndex(function (val, ind, obj) {
            return val != null && val.path == path;
        });
    };
    /**
     * Returns whether or not the given file path is tracked by the SRS.
     * @param path The path of the file.
     */
    DataStore.prototype.isTracked = function (path) {
        return this.getFileIndex(path) >= 0;
    };
    DataStore.prototype.isQueued = function (item) {
        return this.data.queue.includes(item);
    };
    DataStore.prototype.isInRepeatQueue = function (item) {
        return this.data.repeatQueue.includes(item);
    };
    /**
     * Returns when the given item is reviewed next (in hours).
     */
    DataStore.prototype.nextReview = function (itemId) {
        var item = this.data.items[itemId];
        if (item == null) {
            return -1;
        }
        var now = new Date();
        return (item.nextReview - now.getTime()) / (1000 * 60 * 60);
    };
    DataStore.prototype.getItemsOfFile = function (path) {
        var _this = this;
        var result = [];
        var file = this.data.trackedFiles[this.getFileIndex(path)];
        Object.values(file.items).forEach(function (item) {
            result.push(_this.data.items[item]);
        });
        return result;
    };
    DataStore.prototype.getNext = function () {
        var id = this.getNextId();
        if (id != null) {
            return this.data.items[id];
        }
        return null;
    };
    DataStore.prototype.getNextId = function () {
        if (this.queueSize() > 0) {
            return this.data.queue[0];
        }
        else if (this.data.repeatQueue.length > 0) {
            return this.data.repeatQueue[0];
        }
        else {
            return null;
        }
    };
    DataStore.prototype.getFilePath = function (item) {
        return this.data.trackedFiles[item.fileIndex].path;
    };
    DataStore.prototype.reviewId = function (itemId, option) {
        var item = this.data.items[itemId];
        if (item == null) {
            return -1;
        }
        if (this.isInRepeatQueue(itemId)) {
            var result = this.plugin.algorithm.onSelection(item, option, true);
            this.data.repeatQueue.remove(itemId);
            if (!result.correct) {
                this.data.repeatQueue.push(itemId); // Re-add until correct.
            }
        }
        else {
            var result = this.plugin.algorithm.onSelection(item, option, false);
            item.nextReview = DateUtils.fromNow(result.nextReview).getTime();
            item.timesReviewed += 1;
            this.data.queue.remove(itemId);
            if (result.correct) {
                item.timesCorrect += 1;
                item.errorStreak = 0;
            }
            else {
                item.errorStreak += 1;
                if (this.plugin.settings.repeatItems) {
                    this.data.repeatQueue.push(itemId);
                }
            }
        }
    };
    DataStore.prototype.untrackFilesInFolderPath = function (path, recursive) {
        var folder = this.plugin.app.vault.getAbstractFileByPath(path);
        if (folder != null) {
            this.untrackFilesInFolder(folder, recursive);
        }
    };
    DataStore.prototype.untrackFilesInFolder = function (folder, recursive) {
        var _this = this;
        if (recursive == null)
            recursive = true;
        folder.children.forEach(function (child) {
            if (child instanceof obsidian.TFolder) {
                if (recursive) {
                    _this.untrackFilesInFolder(child, recursive);
                }
            }
            else if (child instanceof obsidian.TFile) {
                if (_this.isTracked(child.path)) {
                    _this.untrackFile(child.path, false);
                }
            }
        });
    };
    DataStore.prototype.trackFilesInFolderPath = function (path, recursive) {
        var folder = this.plugin.app.vault.getAbstractFileByPath(path);
        if (folder != null) {
            this.trackFilesInFolder(folder, recursive);
        }
    };
    DataStore.prototype.trackFilesInFolder = function (folder, recursive) {
        var _this = this;
        if (recursive == null)
            recursive = true;
        var totalAdded = 0;
        var totalRemoved = 0;
        folder.children.forEach(function (child) {
            if (child instanceof obsidian.TFolder) {
                if (recursive) {
                    _this.trackFilesInFolder(child, recursive);
                }
            }
            else if (child instanceof obsidian.TFile) {
                if (!_this.isTracked(child.path)) {
                    var _a = _this.trackFile(child.path, false), added = _a.added, removed = _a.removed;
                    totalAdded += added;
                    totalRemoved += removed;
                }
            }
        });
        new obsidian.Notice("Added " +
            totalAdded +
            " new items, removed " +
            totalRemoved +
            " items.");
    };
    DataStore.prototype.trackFile = function (path, notice) {
        this.data.trackedFiles.push({
            path: path,
            items: {},
        });
        var data = this.updateItems(path, notice);
        console.log("Tracked: " + path);
        this.plugin.updateStatusBar();
        return data;
    };
    DataStore.prototype.untrackFile = function (path, notice) {
        if (notice == null)
            notice = true;
        var index = this.getFileIndex(path);
        if (index == -1) {
            return;
        }
        var trackedFile = this.data.trackedFiles[index];
        var numItems = Object.keys(trackedFile.items).length;
        for (var key in trackedFile.items) {
            var ind = trackedFile.items[key];
            if (this.isQueued(ind)) {
                this.data.queue.remove(ind);
            }
            if (this.isInRepeatQueue(ind)) {
                this.data.repeatQueue.remove(ind);
            }
            this.data.items[ind] = null;
        }
        if (notice) {
            new obsidian.Notice("Untracked " + numItems + " items!");
        }
        this.data.trackedFiles[index] = null;
        this.plugin.updateStatusBar();
        console.log("Untracked: " + path);
    };
    DataStore.prototype.updateItems = function (path, notice) {
        if (notice == null)
            notice = true;
        var ind = this.getFileIndex(path);
        if (ind == -1) {
            console.log("Attempt to update untracked file: " + path);
            return;
        }
        var trackedFile = this.data.trackedFiles[ind];
        var file = this.plugin.app.vault.getAbstractFileByPath(path);
        if (!file) {
            console.log("Could not find file: " + path);
            return;
        }
        var added = 0;
        var removed = 0;
        var newItems = {};
        if ("file" in trackedFile.items) {
            newItems["file"] = trackedFile.items["file"];
        }
        else {
            var newItem = Object.assign({}, NEW_ITEM);
            newItem.data = Object.assign(this.plugin.algorithm.defaultData());
            newItem.fileIndex = ind;
            newItems["file"] = this.data.items.push(newItem) - 1;
            added += 1;
        }
        for (var key in trackedFile.items) {
            if (!(key in newItems)) {
                var itemInd = trackedFile.items[key];
                if (this.isQueued(itemInd)) {
                    this.data.queue.remove(itemInd);
                }
                if (this.isInRepeatQueue(itemInd)) {
                    this.data.repeatQueue.remove(itemInd);
                }
                this.data.items[ind] = null;
                removed += 1;
            }
        }
        trackedFile.items = newItems;
        if (notice) {
            new obsidian.Notice("Added " + added + " new items, removed " + removed + " items.");
        }
        return { added: added, removed: removed };
    };
    DataStore.prototype.renameTrackedFile = function (old, newPath) {
        var index = this.getFileIndex(old);
        // Sanity check
        if (index == -1) {
            console.log("Renamed file is not tracked!");
            return;
        }
        var fileData = this.data.trackedFiles[index];
        fileData.path = newPath;
        this.data.trackedFiles[index] = fileData;
        console.log("Updated tracking: " + old + " -> " + newPath);
    };
    DataStore.prototype.buildQueue = function () {
        var _this = this;
        console.log("Building queue...");
        var data = this.data;
        var maxNew = this.plugin.settings.maxNewPerDay;
        var now = new Date();
        if (now.getDate() != new Date(this.data.lastQueue).getDate()) {
            this.data.newAdded = 0;
        }
        var oldAdd = 0;
        var newAdd = 0;
        this.data.items.forEach(function (item, id) {
            if (item != null) {
                if (item.nextReview == 0) {
                    // This is a new item.
                    if (maxNew == -1 || data.newAdded < maxNew) {
                        item.nextReview = now.getTime();
                        data.newAdded += 1;
                        data.queue.push(id);
                        newAdd += 1;
                    }
                }
                else if (item.nextReview <= now.getTime()) {
                    if (_this.isInRepeatQueue(id)) {
                        data.repeatQueue.remove(id);
                    }
                    if (!_this.isQueued(id)) {
                        data.queue.push(id);
                        oldAdd += 1;
                    }
                }
            }
        });
        this.data.lastQueue = now.getTime();
        console.log("Added " +
            (oldAdd + newAdd) +
            " files to review queue, with " +
            newAdd +
            " new!");
    };
    DataStore.prototype.resetData = function () {
        this.data = Object.assign({}, DEFAULT_SRS_DATA);
    };
    return DataStore;
}());

var ReviewView = /** @class */ (function (_super) {
    __extends(ReviewView, _super);
    function ReviewView(leaf, plugin) {
        var _this = _super.call(this, leaf) || this;
        _this.plugin = plugin;
        var contentEl = _this.containerEl.querySelector(".view-content");
        _this.wrapperEl = contentEl.createDiv("srs-review-wrapper");
        _this.questionSubView = new ReviewQuestionView(_this);
        _this.answerSubView = new ReviewAnswerView(_this);
        _this.emptySubView = new ReviewEmptyView(_this);
        _this.currentSubView = _this.emptySubView;
        return _this;
    }
    ReviewView.prototype.setState = function (state, result) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mode = state.mode;
                        this.item = state.item;
                        return [4 /*yield*/, _super.prototype.setState.call(this, state, result)];
                    case 1:
                        _a.sent();
                        if (!this.file) {
                            this.mode = "empty";
                        }
                        if (this.mode == null || this.mode == "empty") {
                            this.currentSubView.hide();
                            this.currentSubView = this.emptySubView;
                            this.currentSubView.show();
                            return [2 /*return*/];
                        }
                        this.currentSubView.hide();
                        if (this.mode == "question") {
                            this.currentSubView = this.questionSubView;
                            this.currentSubView.show();
                        }
                        else if (this.mode == "answer") {
                            this.currentSubView = this.answerSubView;
                            this.currentSubView.show();
                        }
                        console.log("Loading item " + this.item + "...");
                        this.app.vault.cachedRead(this.file).then(function (content) {
                            var question = _this.file.basename;
                            var answer = content.trim();
                            var metadata = _this.app.metadataCache.getFileCache(_this.file);
                            if (metadata) {
                                if (metadata.headings && metadata.headings.length > 0) {
                                    question = metadata.headings[0].heading;
                                    answer = content
                                        .substr(metadata.headings[0].position.end.offset + 1)
                                        .trim();
                                }
                            }
                            _this.currentSubView.set(question, answer, _this.file);
                        }, function (err) {
                            console.log("Unable to read item: " + err);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ReviewView.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.mode = this.mode;
        return state;
    };
    ReviewView.prototype.getViewType = function () {
        return "srs-review-view";
    };
    return ReviewView;
}(obsidian.FileView));
var ReviewEmptyView = /** @class */ (function () {
    function ReviewEmptyView(view) {
        this.containerEl = view.wrapperEl.createDiv("srs-review-empty");
        this.containerEl.hidden = true;
        this.containerEl.innerText = "Your queue is empty!";
    }
    ReviewEmptyView.prototype.set = function (question, answer, file) { };
    ReviewEmptyView.prototype.show = function () {
        this.containerEl.hidden = false;
    };
    ReviewEmptyView.prototype.hide = function () {
        this.containerEl.hidden = true;
    };
    return ReviewEmptyView;
}());
var ReviewQuestionView = /** @class */ (function () {
    function ReviewQuestionView(view) {
        var answerClick = function (view) {
            view.leaf.setViewState({
                type: "srs-review-view",
                state: {
                    file: view.file.path,
                    mode: "answer",
                    item: view.item,
                },
            });
        };
        this.containerEl = view.wrapperEl.createDiv("srs-review-question");
        this.containerEl.hidden = true;
        this.questionEl = this.containerEl.createDiv("srs-question-content");
        var buttonDiv = this.containerEl.createDiv("srs-button-div");
        var buttonRow = buttonDiv.createDiv("srs-flex-row");
        var openFileRow = buttonDiv.createDiv("srs-flex-row");
        new obsidian.ButtonComponent(buttonRow)
            .setButtonText("Show Answer")
            .setCta()
            .onClick(function () { return answerClick(view); });
        new obsidian.ButtonComponent(openFileRow)
            .setButtonText("Open File")
            .onClick(function () {
            var leaf = view.app.workspace.getUnpinnedLeaf();
            leaf.setViewState({
                type: "markdown",
                state: {
                    file: view.file.path,
                },
            });
            view.app.workspace.setActiveLeaf(leaf);
        })
            .setClass("srs-review-button");
    }
    ReviewQuestionView.prototype.set = function (question, answer, file) {
        this.questionEl.empty();
        obsidian.MarkdownRenderer.renderMarkdown("# " + question, this.questionEl, file.path, null);
    };
    ReviewQuestionView.prototype.show = function () {
        this.containerEl.hidden = false;
    };
    ReviewQuestionView.prototype.hide = function () {
        this.containerEl.hidden = true;
    };
    return ReviewQuestionView;
}());
var ReviewAnswerView = /** @class */ (function () {
    function ReviewAnswerView(view) {
        var _this = this;
        var buttonClick = function (view, s) {
            view.plugin.store.reviewId(view.item, s);
            var item = view.plugin.store.getNext();
            var state = { mode: "empty" };
            if (item != null) {
                var path = view.plugin.store.getFilePath(item);
                if (path != null) {
                    state.file = path;
                    state.item = view.plugin.store.getNextId();
                    state.mode = "question";
                }
            }
            view.leaf.setViewState({
                type: "srs-review-view",
                state: state,
            });
        };
        this.containerEl = view.wrapperEl.createDiv("srs-review-answer");
        this.containerEl.hidden = true;
        var wrapperEl = this.containerEl.createDiv('srs-qa-wrapper');
        this.questionEl = wrapperEl.createDiv("srs-question-content");
        this.answerEl = wrapperEl.createDiv("srs-answer-content");
        var buttonDiv = this.containerEl.createDiv("srs-button-div");
        var buttonRow = buttonDiv.createDiv("srs-flex-row");
        var openFileRow = buttonDiv.createDiv("srs-flex-row");
        this.buttons = [];
        view.plugin.algorithm.srsOptions().forEach(function (s) {
            _this.buttons.push(new obsidian.ButtonComponent(buttonRow)
                .setButtonText(s)
                .setCta()
                .onClick(function () { return buttonClick(view, s); })
                // .setTooltip("Hotkey: " + (this.buttons.length + 1))
                .setClass("srs-review-button"));
        });
        new obsidian.ButtonComponent(openFileRow)
            .setButtonText("Open File")
            .onClick(function () {
            var leaf = view.app.workspace.getUnpinnedLeaf();
            leaf.setViewState({
                type: "markdown",
                state: {
                    file: view.file.path,
                },
            });
            view.app.workspace.setActiveLeaf(leaf);
        })
            .setClass("srs-review-button");
    }
    ReviewAnswerView.prototype.set = function (question, answer, file) {
        this.questionEl.empty();
        this.answerEl.empty();
        obsidian.MarkdownRenderer.renderMarkdown("# " + question, this.questionEl, file.path, null);
        obsidian.MarkdownRenderer.renderMarkdown(answer, this.answerEl, file.path, null);
    };
    ReviewAnswerView.prototype.show = function () {
        this.containerEl.hidden = false;
    };
    ReviewAnswerView.prototype.hide = function () {
        this.containerEl.hidden = true;
    };
    return ReviewAnswerView;
}());

var Commands = /** @class */ (function () {
    function Commands(plugin) {
        this.plugin = plugin;
    }
    Commands.prototype.addCommands = function () {
        var plugin = this.plugin;
        // plugin.addCommand({
        //     id: "view-item-info",
        //     name: "Item Info",
        //     checkCallback: (checking: boolean) => {
        //         let file = plugin.app.workspace.getActiveFile();
        //         if (file) {
        //             if (plugin.store.isTracked(file.path)) {
        //                 if (!checking) {
        //                     new ItemInfoModal(plugin, file).open();
        //                 }
        //                 return true;
        //             }
        //         }
        //         return false;
        //     },
        // });
        plugin.addCommand({
            id: "track-file",
            name: "Track Note",
            checkCallback: function (checking) {
                var file = plugin.app.workspace.getActiveFile();
                if (file != null) {
                    if (!plugin.store.isTracked(file.path)) {
                        if (!checking) {
                            plugin.store.trackFile(file.path);
                            plugin.updateStatusBar();
                        }
                        return true;
                    }
                }
                return false;
            },
        });
        plugin.addCommand({
            id: "untrack-file",
            name: "Untrack Note",
            checkCallback: function (checking) {
                var file = plugin.app.workspace.getActiveFile();
                if (file != null) {
                    if (plugin.store.isTracked(file.path)) {
                        if (!checking) {
                            plugin.store.untrackFile(file.path);
                            plugin.updateStatusBar();
                        }
                        return true;
                    }
                }
                return false;
            },
        });
        plugin.addCommand({
            id: "update-file",
            name: "Update Note",
            checkCallback: function (checking) {
                var file = plugin.app.workspace.getActiveFile();
                if (file != null) {
                    if (plugin.store.isTracked(file.path)) {
                        if (!checking) {
                            plugin.store.updateItems(file.path);
                            plugin.updateStatusBar();
                        }
                        return true;
                    }
                }
                return false;
            },
        });
        plugin.addCommand({
            id: "build-queue",
            name: "Build Queue",
            callback: function () {
                plugin.store.buildQueue();
            },
        });
        plugin.addCommand({
            id: "review-view",
            name: "Review",
            callback: function () {
                plugin.store.buildQueue();
                var item = plugin.store.getNext();
                var state = { mode: "empty" };
                if (item != null) {
                    var path = plugin.store.getFilePath(item);
                    if (path != null) {
                        state.file = path;
                        state.item = plugin.store.getNextId();
                        state.mode = "question";
                    }
                }
                var leaf = plugin.app.workspace.getUnpinnedLeaf();
                leaf.setViewState({
                    type: "store-review-view",
                    state: state,
                });
                leaf.setPinned(true);
                plugin.app.workspace.setActiveLeaf(leaf);
            },
        });
    };
    Commands.prototype.addDebugCommands = function () {
        console.log("Injecting debug commands...");
        var plugin = this.plugin;
        plugin.addCommand({
            id: "debug-print-view-state",
            name: "Print View State",
            callback: function () {
                console.log(plugin.app.workspace.activeLeaf.getViewState());
            },
        });
        plugin.addCommand({
            id: "debug-print-eph-state",
            name: "Print Ephemeral State",
            callback: function () {
                console.log(plugin.app.workspace.activeLeaf.getEphemeralState());
            },
        });
        plugin.addCommand({
            id: "debug-print-queue",
            name: "Print Queue",
            callback: function () {
                console.log(plugin.store.data.queue);
                console.log("There are " +
                    plugin.store.data.queue.length +
                    " items in queue.");
                console.log(plugin.store.data.newAdded + " new where added to today.");
            },
        });
        plugin.addCommand({
            id: "debug-clear-queue",
            name: "Clear Queue",
            callback: function () {
                plugin.store.data.queue = [];
            },
        });
        plugin.addCommand({
            id: "debug-queue-all",
            name: "Queue All",
            callback: function () {
                plugin.store.data.queue = [];
                for (var i = 0; i < plugin.store.data.items.length; i++) {
                    if (plugin.store.data.items[i] != null) {
                        plugin.store.data.queue.push(i);
                    }
                }
                console.log("Queue Size: " + plugin.store.queueSize());
            },
        });
        plugin.addCommand({
            id: "debug-print-data",
            name: "Print Data",
            callback: function () {
                console.log(plugin.store.data);
            },
        });
        plugin.addCommand({
            id: "debug-reset-data",
            name: "Reset Data",
            callback: function () {
                console.log("Resetting data...");
                plugin.store.resetData();
                console.log(plugin.store.data);
            },
        });
    };
    return Commands;
}());

var ObsidianSrsPlugin = /** @class */ (function (_super) {
    __extends(ObsidianSrsPlugin, _super);
    function ObsidianSrsPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObsidianSrsPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Loading Obsidian Recall...");
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.algorithm = algorithms[this.settings.algorithm];
                        this.algorithm.updateSettings(this.settings.algorithmSettings);
                        this.store = new DataStore(this);
                        return [4 /*yield*/, this.store.load()];
                    case 2:
                        _a.sent();
                        this.store.buildQueue();
                        this.commands = new Commands(this);
                        this.commands.addCommands();
                        this.barItem = this.addStatusBarItem();
                        this.updateStatusBar();
                        this.addSettingTab(new SrsSettingTab(this.app, this));
                        this.registerEvents();
                        this.registerView("store-review-view", function (leaf) {
                            return new ReviewView(leaf, _this);
                        });
                        this.registerInterval(window.setInterval(function () { return _this.store.save(); }, 5 * 60 * 1000));
                        return [2 /*return*/];
                }
            });
        });
    };
    ObsidianSrsPlugin.prototype.onunload = function () {
        console.log("Unloading Obsidian Recall. Saving tracked files...");
        this.store.save();
    };
    ObsidianSrsPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    ObsidianSrsPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ObsidianSrsPlugin.prototype.updateStatusBar = function () {
        var view = this.app.workspace.getActiveViewOfType(ReviewView);
        this.barItem.removeClasses(["srs-bar-tracked"]);
        if (view) {
            var text = "Remaining: " +
                (this.store.queueSize() + this.store.repeatQueueSize());
            this.barItem.setText(text);
        }
        else {
            var file = this.app.workspace.getActiveFile();
            var text = "Queue: " + this.store.queueSize();
            if (file == null) {
                this.barItem.setText(text);
            }
            else {
                if (this.store.isTracked(file.path)) {
                    var items = this.store.getItemsOfFile(file.path);
                    var mostRecent_1 = Number.MAX_SAFE_INTEGER;
                    items.forEach(function (item) {
                        if (item.nextReview < mostRecent_1) {
                            mostRecent_1 = item.nextReview;
                        }
                    });
                    var now = new Date();
                    var diff = (mostRecent_1 - now.getTime()) / (1000 * 60 * 60);
                    if (diff <= 0) {
                        text = "Next Review: Now!";
                    }
                    else {
                        if (diff >= 24) {
                            diff /= 24;
                            text = "Next Review: " + diff.toFixed(1) + " days";
                        }
                        else {
                            text = "Next Review: " + diff.toFixed(1) + " hours";
                        }
                    }
                    this.barItem.setText(text);
                    this.barItem.addClass("srs-bar-tracked");
                }
                else {
                    this.barItem.setText(text);
                }
            }
        }
    };
    ObsidianSrsPlugin.prototype.registerEvents = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("file-open", function (f) {
            _this.updateStatusBar();
        }));
        this.registerEvent(this.app.workspace.on("file-menu", function (menu, file, source, leaf) {
            if (file instanceof obsidian.TFolder) {
                var folder_1 = file;
                menu.addItem(function (item) {
                    item.setIcon("plus-with-circle");
                    item.setTitle("Track All Notes");
                    item.onClick(function (evt) {
                        _this.store.trackFilesInFolder(folder_1);
                    });
                });
                menu.addItem(function (item) {
                    item.setIcon("minus-with-circle");
                    item.setTitle("Untrack All Notes");
                    item.onClick(function (evt) {
                        _this.store.untrackFilesInFolder(folder_1);
                    });
                });
            }
            else if (file instanceof obsidian.TFile) {
                if (_this.store.isTracked(file.path)) {
                    menu.addItem(function (item) {
                        item.setIcon("minus-with-circle");
                        item.setTitle("Untrack Note");
                        item.onClick(function (evt) {
                            _this.store.untrackFile(file.path);
                        });
                    });
                }
                else {
                    menu.addItem(function (item) {
                        item.setIcon("plus-with-circle");
                        item.setTitle("Track Note");
                        item.onClick(function (evt) {
                            _this.store.trackFile(file.path);
                        });
                    });
                }
            }
        }));
        this.registerEvent(this.app.vault.on("rename", function (file, old) {
            _this.store.renameTrackedFile(old, file.path);
        }));
        this.registerEvent(this.app.vault.on("delete", function (file) {
            _this.store.untrackFile(file.path);
        }));
    };
    return ObsidianSrsPlugin;
}(obsidian.Plugin));

module.exports = ObsidianSrsPlugin;


/* nosourcemap */