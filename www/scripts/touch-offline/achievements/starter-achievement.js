var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Achievements) {
        (function (Offline) {
            var StarterAchievement = (function (_super) {
                __extends(StarterAchievement, _super);
                function StarterAchievement() {
                    _super.apply(this, arguments);

                }
                StarterAchievement.prototype._getRespondingEvents = function () {
                    return [
                        Offline.UserEvent.CourseStarted
                    ];
                };
                StarterAchievement.prototype.getName = function () {
                    return 'Starter';
                };
                StarterAchievement.prototype.getProgress = function () {
                    return this.service.currentCourseStartedDate() != null ? 1 : 0;
                };
                return StarterAchievement;
            })(Offline.AchievementBase);
            Offline.StarterAchievement = StarterAchievement;            
        })(Achievements.Offline || (Achievements.Offline = {}));
        var Offline = Achievements.Offline;
    })(MLearning.Achievements || (MLearning.Achievements = {}));
    var Achievements = MLearning.Achievements;
})(MLearning || (MLearning = {}));
