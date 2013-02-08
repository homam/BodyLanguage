var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        var NewFlashCards = (function (_super) {
            __extends(NewFlashCards, _super);
            function NewFlashCards() {
                _super.apply(this, arguments);

                this.lastTransitionStarted = new Date();
            }
            NewFlashCards.prototype.onReady = function (data) {
                _super.prototype.onReady.call(this, data);
            };
            NewFlashCards.prototype._onReady = function (data, bookmarksGetter, bookmarkToggler) {
                this._registerTouchWipe();
                var self = this;
                this._levelId = data.levelId;
                bookmarksGetter(data.courseId, data.levelId).done(function (bookmarks) {
                    self._bookmarkedStepIds = bookmarks;
                    self._updateNavBookmarkButtonForCurrentStepId();
                });
                $("#reviewChapterButton").click(function () {
                    return self.next();
                });
                var bookmarkNotificationEl = $("#bookmarked_notification");
                $(".flashcards-nav .next").click(function () {
                    return self.next();
                });
                $(".flashcards-nav .back").click(function () {
                    return self.back();
                });
                $(".flashcards-nav .fav").click(function () {
                    if(!self._bookmarkedStepIds.some(function (b) {
                        return b == self._currentStepId;
                    })) {
                        bookmarkNotificationEl.addClass("show");
                    }
                    bookmarkToggler(self._levelId, self._currentStepId, {
                        levelTitle: $("meta[name='level-title']").attr("content"),
                        stepTitle: $(".level-step.current meta[name='step-title']").attr("content")
                    }).done(function (bookmarks) {
                        self._bookmarkedStepIds = bookmarks;
                        self._updateNavBookmarkButtonForCurrentStepId();
                    });
                });
                bookmarkNotificationEl.on('webkitAnimationEnd', function () {
                    return bookmarkNotificationEl.removeClass("show");
                });
                bookmarkNotificationEl.on('animationEnd', function () {
                    return bookmarkNotificationEl.removeClass("show");
                });
                this.popstateDelegate = function (e) {
                    if(!e.state) {
                        console.log("popstate no state");
                        return;
                    }
                    var state = e.state;
                    console.log("popstate", state.index);
                    if(!!state && !isNaN(state.index)) {
                        self.switchStep($($("#steps").find("li[data-index=" + e.state.index + "]")[0]), false);
                    }
                };
                window.addEventListener("popstate", this.popstateDelegate, true);
                setTimeout(function () {
                    $(".image .script-image").each(function () {
                        $(this).parent().html($(this).html());
                    });
                }, 500);
                var query = $.parsequery(location.href);
                var stepId = parseInt(query.get('stepid'));
                if(!!stepId) {
                    self.switchStep($($("#steps").find("li[data-stepid=" + stepId + "]")[0]));
                } else {
                    self.goto(0);
                }
                this._starrify($(".best-result .stars"));
                _super.prototype.onReady.call(this, data);
            };
            NewFlashCards.prototype.switchStep = function (el, addToPushState) {
                if (typeof addToPushState === "undefined") { addToPushState = true; }
                if(_super.prototype.switchStep.call(this, el)) {
                    if(addToPushState) {
                        this.addToPushState(el);
                    }
                    $(".flashcards-nav .next")[(el.next().length > 0) ? 'addClass' : 'removeClass']("enabled");
                    $(".flashcards-nav .back")[(el.prev().length > 0) ? 'addClass' : 'removeClass']("enabled");
                    $(".flashcards-nav .fav")[!!this._currentStepId ? 'addClass' : 'removeClass']("enabled");
                    this._updateNavBookmarkButtonForCurrentStepId();
                    return true;
                }
                return false;
            };
            NewFlashCards.prototype._updateNavBookmarkButtonForCurrentStepId = function () {
                var _this = this;
                var bookmarked = !!this._currentStepId && !!this._bookmarkedStepIds && this._bookmarkedStepIds.some(function (b) {
                    return b == _this._currentStepId;
                });
                $(".flashcards-nav .fav")[bookmarked ? 'addClass' : 'removeClass']("added");
                return bookmarked;
            };
            NewFlashCards.prototype.addToPushState = function (li) {
                var stepid = parseInt(li.attr('data-stepid'));
                var query = $.parsequery(location.pathname + location.search);
                if(!!stepid) {
                    query.SET('stepid', stepid + "");
                }
                console.log("addToPushState", li.attr('data-index'), query.toString() + location.hash);
                history.pushState({
                    index: +li.attr('data-index')
                }, '', query.toString() + location.hash);
            };
            NewFlashCards.prototype.destructor = function () {
                window.removeEventListener('popstate', this.popstateDelegate, true);
                _super.prototype.destructor.call(this);
            };
            return NewFlashCards;
        })(Pages.StepNavigtionPageBase);
        Pages.NewFlashCards = NewFlashCards;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
