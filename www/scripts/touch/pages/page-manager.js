var MLearning;
(function (MLearning) {
    (function (Pages) {
        var Controller = (function () {
            function Controller() {
                window['toggleSettings'] = function () {
                    $("body").toggleClass("navVisible");
                };
                $("#settings-content-overlay").on("mousedown", function () {
                    $("body").toggleClass("navVisible");
                });
                $(".footer li a").click(function () {
                    $(this).toggleClass('active');
                });
            }
            Controller.prototype.pageChanged = function (page, data) {
                if (typeof data === "undefined") { data = null; }
                if(!!this._currentPage) {
                    this._currentPage.destructor();
                }
                page.onReady(data);
                this._currentPage = page;
                window['page'] = page;
            };
            Controller.prototype.pageModelReady = function (page, model) {
            };
            Controller.prototype.findPageTypeByItsName = function (namespace, pageTypeName) {
                var pageType = null;
                if(!!MLearning.Pages[namespace]) {
                    pageType = MLearning.Pages[namespace][pageTypeName];
                }
                if(!pageType) {
                    pageType = MLearning.Pages[pageTypeName];
                }
                if(!pageType) {
                    console.log("PageType not found! " + pageTypeName);
                    pageType = MLearning.Pages.Page;
                }
                return pageType;
            };
            return Controller;
        })();
        Pages.Controller = Controller;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
