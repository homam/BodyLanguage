var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyLevel = (function () {
    function MyLevel(levelId, bestScore, myStars) {
        this.levelId = levelId;
        this.bestScore = bestScore;
        this.myStars = myStars;
    }
    return MyLevel;
})();
var Course = (function () {
    function Course(courseId, stars) {
        this.courseId = courseId;
        this.stars = stars;
    }
    return Course;
})();
var MyCourse = (function (_super) {
    __extends(MyCourse, _super);
    function MyCourse(course, myStars) {
        _super.call(this, course.courseId, course.stars);
        this.myStars = myStars;
    }
    return MyCourse;
})(Course);
var OfflineService = (function () {
    function OfflineService() {
    }
    OfflineService.prototype.setAchievementListener = function (listener) {
        this.achievementListener = listener;
    };
    OfflineService.prototype.getAllCourses = function () {
        return [
            new Course(1, 78), 
            new Course(2, 69), 
            new Course(3, 36)
        ];
    };
    OfflineService.prototype.getMyCourses = function () {
        var promise = $.Deferred();
        promise.resolve(this.getAllCourses().map(function (course) {
            return JSON.parse(localStorage.getItem("course-" + course.courseId + "") || JSON.stringify(new MyCourse(course, 0)));
        }));
        return promise;
    };
    OfflineService.prototype.getMyCourse = function (courseId) {
        var promise = $.Deferred();
        this.getMyCourses().done(function (courses) {
            return promise.resolve(courses.filter(function (c) {
                return c.courseId == courseId;
            })[0]);
        });
        return promise;
    };
    OfflineService.prototype.getMyCurrentCourse = function () {
        return this.getMyCourse(parseInt(localStorage.getItem("current-course-id")));
    };
    OfflineService.prototype.courseVisited = function (courseId) {
        localStorage.setItem("current-course-id", courseId + "");
    };
    OfflineService.prototype.getMyLevel = function (courseId, levelId) {
        var promise = $.Deferred();
        promise.resolve(JSON.parse(localStorage.getItem("course-" + courseId + "-level-" + levelId) || JSON.stringify(new MyLevel(levelId, 0, 0))));
        return promise;
    };
    OfflineService.prototype.getMyLevelForMyCurrentCourse = function (levelId) {
        var _this = this;
        var promise = $.Deferred();
        this.getMyCurrentCourse().done(function (course) {
            return _this.getMyLevel(course.courseId, levelId).done(function (level) {
                return promise.resolve(level);
            });
        });
        return promise;
    };
    OfflineService.prototype.submitTestResults = function (result) {
        var promise = $.Deferred();
        var stars = Math.round(result.Score * 3);
        var myCurrentCourseId = parseInt(localStorage.getItem("current-course-id"));
        this.getMyLevel(myCurrentCourseId, result.LevelId).done(function (myLevel) {
            if((myLevel.bestScore || 0) < result.Score) {
                localStorage.setItem("course-" + myCurrentCourseId + "-level-" + result.LevelId, JSON.stringify(new MyLevel(result.LevelId, result.Score, stars)));
            }
            promise.resolve(stars);
        });
        return promise;
    };
    OfflineService.prototype.toggleBookmark = function (courseId, stepId, levelId) {
        var lsKey = 'course-' + courseId + '-bookmarks';
        var promise = $.Deferred();
        var bookmarks = JSON.parse(localStorage.getItem(lsKey) || '[]');
        var index = bookmarks.indexOf(stepId);
        if(index < 0) {
            bookmarks.push(stepId);
        } else {
            bookmarks.splice(index, 1);
        }
        localStorage.setItem(lsKey, JSON.stringify(bookmarks));
        promise.resolve(bookmarks);
        console.log(courseId, stepId, bookmarks);
        return promise;
    };
    OfflineService.prototype.toggleBookmakForMyCurrentCourse = function (stepId, levelId, info) {
        var courseId = parseInt(localStorage.getItem("current-course-id"));
        if(!!info) {
            var levelsContentKey = "course-" + courseId + "-content";
            var contentString = localStorage.getItem(levelsContentKey);
            var levels = [];
            if(contentString) {
                levels = JSON.parse(contentString);
            }
            var level = levels.filter(function (l) {
                return l.id == levelId;
            })[0];
            if(!level) {
                level = {
                    id: levelId,
                    steps: [],
                    title: info.levelTitle,
                    path: location.pathname.split('/').pop()
                };
                levels.push(level);
            }
            var step = level.steps.filter(function (s) {
                return s.id == stepId;
            })[0];
            if(!step) {
                step = {
                    id: stepId,
                    title: info.stepTitle
                };
                level.steps.push(step);
            }
            localStorage.setItem(levelsContentKey, JSON.stringify(levels));
        }
        return this.toggleBookmark(courseId, stepId, levelId);
    };
    OfflineService.prototype.getBookmarks = function (courseId, levelId) {
        var lsKey = 'course-' + courseId + '-bookmarks';
        var promise = $.Deferred();
        var bookmarks = JSON.parse(localStorage.getItem(lsKey) || '[]');
        promise.resolve(bookmarks);
        return promise;
    };
    OfflineService.prototype.getBookmarksForMyCurrentCourse = function (levelId) {
        return this.getBookmarks(parseInt(localStorage.getItem("current-course-id")), levelId);
    };
    OfflineService.prototype.getLibraryModelForMyCurrentCourse = function () {
        var courseId = parseInt(localStorage.getItem("current-course-id"));
        var levelsContentKey = "course-" + courseId + "-content";
        var contentString = localStorage.getItem(levelsContentKey) || "[]";
        var levels = JSON.parse(contentString) || [];
        var self = this;
        var promise = $.Deferred();
        this.getBookmarks(courseId, null).done(function (allBookmarkedSteps) {
            levels.forEach(function (level) {
                return level.steps = level.steps.filter(function (s) {
                    return allBookmarkedSteps.indexOf(s.id) > -1;
                });
            });
            promise.resolve(levels);
        });
        return promise;
    };
    OfflineService.prototype.dateAchievementAwarded = function (achievementName) {
        var obj = localStorage["ach-" + achievementName];
        if(!obj) {
            return null;
        }
        return new Date(obj);
    };
    OfflineService.prototype.awardAchievement = function (achievementName) {
        localStorage["ach-" + achievementName] = new Date().getTime();
    };
    OfflineService.prototype.userEvent = function (userEvent) {
        this.achievementListener.onUserEvent(userEvent);
    };
    OfflineService.prototype._insertDateInLocalStorageIfNotExist = function (key) {
        var date = this._getDateValueFromLocalStorage(key);
        if(!date) {
            date = new Date();
            localStorage.setItem(key, date.getTime() + "");
        }
        return date;
    };
    OfflineService.prototype._getDateValueFromLocalStorage = function (key) {
        if(!!localStorage.getItem(key)) {
            return new Date(parseInt(localStorage.getItem(key)));
        }
        return null;
    };
    OfflineService.prototype.startALevelForCurrentCourse = function (levelId) {
        var currentCourseId = parseInt(localStorage.getItem("current-course-id"));
        this._insertDateInLocalStorageIfNotExist("course-" + currentCourseId + "-started");
        var date = this._insertDateInLocalStorageIfNotExist("course-" + currentCourseId + "-" + levelId + "-started");
        this.userEvent(MLearning.Achievements.Offline.UserEvent.CourseStarted);
        return $.Deferred().resolve(date);
    };
    OfflineService.prototype.currentCourseStartedDate = function () {
        var currentCourseId = parseInt(localStorage.getItem("current-course-id"));
        return $.Deferred().resolve(this._getDateValueFromLocalStorage("course-" + currentCourseId + "-started"));
    };
    return OfflineService;
})();
