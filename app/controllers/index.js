var thumbSelected = null;

var init = function init_() {
    var _left = 10;

    for (var i = 0; i < 15; i++) {
        var thumb = createCustomView({
            index: i,
            clickable: true,
            classes: ['thumb'],
            label: createCustomLabel({
                text: "Thumb " + i,
                touchEnabled: false
            })
        });


        thumb.applyProperties($.createStyle({
            classes: ['thumb'],
            left: _left
        }));

        $.timeline.add(thumb);

        _left += 200;
    };
};

var createCustomView = function createCustomView_(_settings) {
    var thumb = Ti.UI.createView();

    thumb.applyProperties(_settings);
    thumb.applyProperties($.createStyle({
        classes: _settings.classes
    }));

    thumb.add(_settings.label);

    thumb.settings = _settings;

    return thumb;
};


var createCustomLabel = function createCustomLabel_(_settings) {
    var thumb = Ti.UI.createLabel();

    thumb.applyProperties(_settings);
    thumb.applyProperties($.createStyle({
        classes: _settings.classes
    }));

    thumb.add(_settings.label);

    thumb.settings = _settings;

    return thumb;
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
    var s = _.extend(thumbSelected.settings, {
        left: 0
    })
    var n = createCustomView(s);
    Ti.API.info(n)
    thumbSelected.setOpacity(0.6);
    //thumbSelected.parent = $.timeline;

    $.selection.add(n);

};

$.add.addEventListener("singletap", addToSelection);
$.timeline.addEventListener("singletap", onClickThumb);

$.index.open();

init();
