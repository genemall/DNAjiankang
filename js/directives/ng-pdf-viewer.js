angular.module('pdf-viewer', []).directive('pdfViewer', ['$q', function($q) {
    return {
        restrict: 'E',
        scope: {
            url: '@'
        },
        link: function(scope, element, attrs) {
            scope.$watch('url', function(url) {
                if(!url) {
                    return;
                }

                PDFJS.getDocument(scope.url).then(function(pdf) {

                    var getPages = function(pageNum, pageCount) {
                        var canvas = document.createElement('canvas');
                        canvas.className = attrs.class ? attrs.class : '';
                        element[0].appendChild(canvas);
                        pdf.getPage(pageNum).then(function(page) {
                           var scale = 0.57;
                           var viewportScaled = page.getViewport(scale);
                            context        = canvas.getContext('2d'),
                            renderContext = {
                                canvasContext: context,
                                viewport:      viewportScaled
                            };

                            canvas.height = viewportScaled.height*1.1;
                            canvas.width  = viewportScaled.width;

                            page.render(renderContext);

                            if (pageNum  < pageCount) {
                                getPages(pageNum + 1, pageCount);
                            }
                        });
                    };
                    getPages(1, pdf.numPages);
                });
            });
        }
    };
}]);
