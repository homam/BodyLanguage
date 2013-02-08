var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        var StepNavigtionPageBase = (function (_super) {
            __extends(StepNavigtionPageBase, _super);
            function StepNavigtionPageBase() {
                _super.apply(this, arguments);

            }
            StepNavigtionPageBase.prototype.onReady = function (_data) {
                _super.prototype.onReady.call(this, _data);
            };
            StepNavigtionPageBase.prototype._registerTouchWipe = function () {
                var self = this;
                this._touchWipeResult = touchwipe({
                    wipeLeft: function () {
                        return self.next();
                    },
                    wipeRight: function () {
                        return self.back();
                    }
                }, window);
            };
            StepNavigtionPageBase.prototype.goto = function (index) {
                this.switchStep($($("#steps li")[index]));
            };
            StepNavigtionPageBase.prototype.next = function () {
                this.switchStep($("#steps .current").next());
            };
            StepNavigtionPageBase.prototype.back = function () {
                this.switchStep($("#steps .current").prev());
            };
            StepNavigtionPageBase.prototype.switchStep = function (el) {
                if(el.length > 0) {
                    var current = $("#steps .current").removeClass("current");
                    el.addClass("current");
                    this._currentStepId = parseInt(el.attr("data-stepid"));
                    setTimeout(function () {
                        $("#steps").height(el.find(".step-content").height());
                    }, 2200);
                    return true;
                }
                return false;
            };
            StepNavigtionPageBase.prototype.destructor = function () {
                console.log("destructor", this);
                this._touchWipeResult.destroyer();
                _super.prototype.destructor.call(this);
            };
            return StepNavigtionPageBase;
        })(MLearning.Pages.Page);
        Pages.StepNavigtionPageBase = StepNavigtionPageBase;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
