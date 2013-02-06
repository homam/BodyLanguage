var MLearning;
(function (MLearning) {
    (function (Achievements) {
        (function (Offline) {
            var OfflineAchievementsListener = (function () {
                function OfflineAchievementsListener(allAchievements) {
                    this.notAwardedAchievements = allAchievements.filter(function (f) {
                        return !f.awarded();
                    });
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
            Offline.OfflineAchievementsListener = OfflineAchievementsListener;            
        })(Achievements.Offline || (Achievements.Offline = {}));
        var Offline = Achievements.Offline;
    })(MLearning.Achievements || (MLearning.Achievements = {}));
    var Achievements = MLearning.Achievements;
})(MLearning || (MLearning = {}));
