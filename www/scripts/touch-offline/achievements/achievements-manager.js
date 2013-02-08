/// <reference path="starter-achievement.ts" />
/// <reference path="../../Touch/AchievementsListener.ts" />
/// <reference path="achievement.ts" />
var MLearning;
(function (MLearning) {
    (function (Offline) {
        (function (Achievements) {
            var OfflineAchievementsListener = (function () {
                function OfflineAchievementsListener(allAchievements) {
                    this.notAwardedAchievements = allAchievements.filter(function (f) {
                        return !f.awarded();
                    })// filter on achs not yet awarded
                    ;
                    this.notNotifiedOfAchievements = this.notAwardedAchievements.filter(function (ach) {
                        return ach.canBeAwarded();
                    });
                }
                OfflineAchievementsListener.prototype.onUserEvent = function (userEvent) {
                    this.notNotifiedOfAchievements = this.notAwardedAchievements.filter(function (ach) {
                        return ach.canBeAwardedIfRespondsTo(userEvent);
                    });
                    if(this.notNotifiedOfAchievements && this.notNotifiedOfAchievements.length > 0) {
                        this.onAchievement(this.notNotifiedOfAchievements[0]);
                    }
                };
                OfflineAchievementsListener.prototype.listen = function (callback) {
                    this.callback = callback;
                };
                OfflineAchievementsListener.prototype.userNotified = function (achievementName) {
                    var ach = this.notAwardedAchievements.filter(function (c) {
                        return c.getName() == achievementName;
                    })[0];
                    if(ach.tryAward()) {
                        this.notAwardedAchievements = this.notAwardedAchievements.filter(function (f) {
                            return !f.awarded();
                        });
                        this.notNotifiedOfAchievements = this.notNotifiedOfAchievements.filter(function (a) {
                            return a.getName() != ach.getName();
                        });
                        // loop to the next achievement
                        if(this.notNotifiedOfAchievements.length > 0) {
                            this.onAchievement(this.notNotifiedOfAchievements[0]);
                        }
                    }
                };
                OfflineAchievementsListener.prototype.onAchievement = function (ach) {
                    this.callback({
                        Name: ach.getName(),
                        Progress: 1,
                        IsAwarded: true
                    });
                };
                return OfflineAchievementsListener;
            })();
            Achievements.OfflineAchievementsListener = OfflineAchievementsListener;            
        })(Offline.Achievements || (Offline.Achievements = {}));
        var Achievements = Offline.Achievements;
    })(MLearning.Offline || (MLearning.Offline = {}));
    var Offline = MLearning.Offline;
})(MLearning || (MLearning = {}));
