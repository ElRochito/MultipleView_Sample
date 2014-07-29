var thumbSelected = null;

var init = function init_() {
    var _left = 10;

    for (var i = 0; i < 15; i++) {
        var thumb = Ti.UI.createView({
            index: i,
            clickable: true
        });

        thumb.add(Ti.UI.createLabel({
            text: "Thumb " + i,
            touchEnabled: false
        }));

        thumb.applyProperties($.createStyle({
            classes: ['thumb'],
            left: _left
        }));

        $.timeline.add(thumb);

        _left += 200;
    };
};

var onClickThumb = function onClickThumb_(_event) {
    Ti.API.info(_event.source)

    if (typeof _event.source.clickable !== 'undefined') {
        var left = 0;

        if (thumbSelected) {
            left = thumbSelected.left;
            $.removeClass(thumbSelected, 'thumbSelected');
            thumbSelected.applyProperties($.createStyle({
                classes: ['thumb'],
                left: left
            }));
            $.add.visible = false;
            if (thumbSelected.index == _event.source.index) {
                thumbSelected = null;
                return;
            }
        }

        thumbSelected = _event.source;

        $.addClass(_event.source, 'thumbSelected');

        $.add.visible = true;
    }
};

var addToSelection = function addToSelection_() {
    var n = thumbSelected;

    thumbSelected.setOpacity(0.6);
    //thumbSelected.parent = $.timeline;

    $.selection.add(n);

    n.setOpacity(1);
};

$.add.addEventListener("singletap", addToSelection);
$.timeline.addEventListener("singletap", onClickThumb);

$.index.open();

init();
