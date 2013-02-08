var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        (function (Offline) {
            var Controller = (function (_super) {
                __extends(Controller, _super);
                function Controller() {
                                _super.call(this);
                    (function () {
                        var support = {
                            html5: true,
                            fixed: true
                        };
                        $(function () {
                            $(document.body).addClass('support-html5');
                            $(document.body).addClass('support-fixed');
                        });
                        window['DEVICE_SUPPORT'] = support;
                    })();
                }
                Controller.prototype._createAPage = function (type) {
                    var page = new (this.findPageTypeByItsName('Offline', type))();
                    (page).setService(this.service);
                    return page;
                };
                Controller.prototype.listenForPageChanges = function () {
                    var service = new OfflineService();
                    this.service = service;
                    var allAchievements = [
                        new MLearning.Achievements.Offline.StarterAchievement(service)
                    ];
                    var achievementsListener = new MLearning.Achievements.Offline.OfflineAchievementsListener(allAchievements);
                    service.setAchievementListener(achievementsListener);
                    var popupManager = new MLearning.UI.PopupManager();
                    var achievementsPopupManager = new MLearning.UI.AchievmentPopupManager(popupManager, achievementsListener);
                    achievementsListener.listen(function (ach) {
                        achievementsPopupManager.open(ach.Name);
                    });
                    $['post'] = function (url, data, callback) {
                        console.log("POST", url, data);
                        if('/Course/SubmitTestResults' == url) {
                            service.submitTestResults(data).done(function (stars) {
                                if(data.Score > 0.25) {
                                    $("#endOfLevel").removeClass('test-failed').addClass('test-succeed');
                                } else {
                                    $("#endOfLevel").addClass('test-failed').removeClass('test-succeed');
                                }
                            });
                        } else {
                            if('/Course/GetBookmkars' == url) {
                                return service.getBookmarksForMyCurrentCourse(data.LevelId);
                            } else {
                                if('/Course/ToggleStepInMyLibrary' == url) {
                                    return service.toggleBookmakForMyCurrentCourse(data.stepId);
                                } else {
                                    if('/Course/StartALevel' == url) {
                                        service.startALevelForCurrentCourse(data.levelId);
                                    }
                                }
                            }
                        }
                        var promise = $.Deferred();
                        promise.resolve();
                        return promise;
                    };
                    console.log('listenForPageChanges');
                    $(document)['pjax']('body a', '#pjax-wrap', {
                        duration: 1000
                    });
                    $(window).on('pjax:beforeSend', function () {
                        console.log("pjax beforeSend", location.href);
                        $("body").addClass("pjaxStarted");
                    });
                    $("body").on('pjax:success', function () {
                        console.log("pjax success", location.href);
                        setTimeout(function () {
                            $("body").removeClass("pjaxStarted");
                            $("body").removeClass("navVisible");
                        }, 500);
                        $("#settings-content-overlay").on("mousedown", function () {
                            $("body").toggleClass("navVisible");
                        });
                        changePage();
                    });
                    var self = this;
                    $(window).bind("load", function () {
                        changePage();
                    });
                    var changePage = function () {
                        var pathName = location.pathname.toLowerCase();
                        var locationPathEndsWith = function (str) {
                            return pathName.indexOf(str) == pathName.length - str.length;
                        };
                        var queryString = PG.Utils.getQueryString();
                        if(pathName.indexOf('userlesshome') > -1) {
                            console.log("home");
                            self.pageChanged(self._createAPage("MAHome"), null);
                        } else {
                            if(pathName.indexOf('course/flashcards') > -1 || pathName.indexOf('course/newflashcards') > -1) {
                                console.log("newflascardspage");
                                var courseId = parseInt(queryString.get('courseid'));
                                var levelId = parseInt(PG.Utils.getQueryString().get("levelid"));
                                self.pageChanged(self._createAPage('NewFlashCards'), {
                                    courseId: courseId,
                                    levelId: levelId
                                });
                            } else {
                                if(pathName.indexOf('course/test') > -1) {
                                    console.log("newtestpage");
                                    self.pageChanged(self._createAPage("NewTest"), null);
                                } else {
                                    if(pathName.indexOf('course/library') > -1) {
                                        console.log("librarypage");
                                        self.pageChanged(self._createAPage("Library"), null);
                                    } else {
                                        if(pathName.indexOf('course') > -1 && !!queryString.get('courseid')) {
                                            console.log("coursepage");
                                            self.pageChanged(self._createAPage('Chapters'), {
                                                courseId: queryString.get('courseId')
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    };
                };
                return Controller;
            })(MLearning.Pages.Controller);
            Offline.Controller = Controller;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
