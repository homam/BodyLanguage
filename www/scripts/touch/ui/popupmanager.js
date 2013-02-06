var MLearning;
(function (MLearning) {
    (function (UI) {
        var PopupManager = (function () {
            function PopupManager() {
                this.queue = [];
            }
            PopupManager.prototype.open = function (ipopup) {
                var self = this;
                this.queue.push(ipopup);
                if(this.queue.length == 1) {
                    this._pop();
                }
            };
            PopupManager.prototype._pop = function () {
                var self = this;
                var ipopup = this.queue[0];
                if(!!ipopup) {
                    var element = ipopup.popupElement;
                    window.location.hash = element.attr("id");
                    element.find(".close").unbind("click").bind("click", function () {
                        self.queue.pop();
                        ipopup.onAfterClose();
                        setTimeout(function () {
                            self.next();
                        }, 500);
                    });
                }
            };
            PopupManager.prototype.next = function () {
                if(this.queue.length > 0) {
                    this._pop();
                } else {
                    this.onFree();
                }
            };
            PopupManager.prototype.onFree = function () {
                var evt = document.createEvent("Event");
                evt.initEvent("popUpManagerIsFree", true, true);
                document.dispatchEvent(evt);
            };
            return PopupManager;
        })();
        UI.PopupManager = PopupManager;        
    })(MLearning.UI || (MLearning.UI = {}));
    var UI = MLearning.UI;
})(MLearning || (MLearning = {}));
var MLearning;
(function (MLearning) {
    (function (UI) {
        var AchievmentPopupManager = (function () {
            function AchievmentPopupManager(popupManager, achievementsListener) {
                this.popupManager = popupManager;
                this.achievementsListener = achievementsListener;
                this.queue = [];
                var self = this;
                document.addEventListener('popUpManagerIsFree', function () {
                    return self.next();
                }, false);
                setTimeout(function () {
                    achievementsListener.listen(function (ach) {
                        self.open(ach.Name);
                    });
                }, 2000);
            }
            AchievmentPopupManager.prototype.open = function (achievementName) {
                console.log(this.queue, achievementName);
                if(this.queue.filter(function (a) {
                    return a == achievementName;
                }).length == 0) {
                    this.queue.push(achievementName);
                    if(this.queue.length == 1) {
                        this.next();
                    }
                } else {
                    console.log('ach has already been in queue');
                }
            };
            AchievmentPopupManager.prototype._open = function (achievementName) {
                var self = this;
                var popup = $('#achivementPopup');
                popup.find('.popup-ach-icon').attr('src', '/Shared/images/achievements-icons/' + achievementName + '.jpg');
                popup.find('.popup-ach-name').html(achievementName);
                this.popupManager.open({
                    popupElement: popup,
                    onAfterClose: function () {
                        self.queue.pop();
                        self.achievementsListener.userNotified(achievementName);
                    }
                });
            };
            AchievmentPopupManager.prototype.next = function () {
                if(this.queue.length > 0) {
                    this._open(this.queue[0]);
                }
            };
            return AchievmentPopupManager;
        })();
        UI.AchievmentPopupManager = AchievmentPopupManager;        
    })(MLearning.UI || (MLearning.UI = {}));
    var UI = MLearning.UI;
})(MLearning || (MLearning = {}));
