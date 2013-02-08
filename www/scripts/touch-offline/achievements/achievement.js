var MLearning;
(function (MLearning) {
    (function (Achievements) {
        (function (Offline) {
            (function (UserEvent) {
                UserEvent._map = [];
                UserEvent.CourseStarted = 1;
                UserEvent.LevelStarted = 2;
                UserEvent.LevelFinished = 3;
                UserEvent.TestStarted = 4;
                UserEvent.TestFinished = 5;
                UserEvent.StepBookmarked = 6;
            })(Offline.UserEvent || (Offline.UserEvent = {}));
            var UserEvent = Offline.UserEvent;
            var AchievementBase = (function () {
                function AchievementBase(service) {
                    this.service = service;
                }
                AchievementBase.prototype._getRespondingEvents = function () {
                    throw 'abstract';
                };
                AchievementBase.prototype.getName = function () {
                    throw 'abstract';
                };
                AchievementBase.prototype.getProgress = function () {
                    throw 'abstract';
                };
                AchievementBase.prototype.canBeAwarded = function () {
                    return Math.abs(this.getProgress() - 1) <= 0.001;
                };
                AchievementBase.prototype.canBeAwardedIfRespondsTo = function (userEvent) {
                    return this.respondsTo(userEvent) && this.canBeAwarded();
                };
                AchievementBase.prototype.respondsTo = function (userEvent) {
                    return this._getRespondingEvents().some(function (e) {
                        return e == userEvent;
                    });
                };
                AchievementBase.prototype.tryAward = function () {
                    if(this.awarded()) {
                        return false;
                    }
                    var progress = this.getProgress();
                    return this.canBeAwarded() && this.award();
                };
                AchievementBase.prototype.tryAwardIfRespondsTo = function (userEvent) {
                    return this.respondsTo(userEvent) && this.tryAward();
                };
                AchievementBase.prototype.getDateAwarded = function () {
                    return this.service.dateAchievementAwarded(this.getName());
                };
                AchievementBase.prototype.awarded = function () {
                    return !!this.getDateAwarded();
                };
                AchievementBase.prototype.award = function () {
                    this.service.awardAchievement(this.getName());
                    return true;
                };
                return AchievementBase;
            })();
            Offline.AchievementBase = AchievementBase;            
        })(Achievements.Offline || (Achievements.Offline = {}));
        var Offline = Achievements.Offline;
    })(MLearning.Achievements || (MLearning.Achievements = {}));
    var Achievements = MLearning.Achievements;
})(MLearning || (MLearning = {}));
