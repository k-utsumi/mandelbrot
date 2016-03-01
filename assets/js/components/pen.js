'use strict';

const $          = global.jQuery;
const storage    = require('../storage');
const events     = require('../events');
const Preview    = require('./preview');
const resizeable = require('jquery-resizable-dom/dist/jquery-resizable.js');

class Pen {

    constructor(el){
        this._el             = $(el);
        this._id             = this._el[0].id;
        this._previewPanel   = this._el.find('[data-behaviour="preview"]');
        this._handleSelector = `#${this._id} > [data-role="resize-handle"]`;
        this._handle         = $(this._handleSelector);
        this._init();
    }

    _init() {
        const preview = new Preview(this._previewPanel);
        this._previewPanel.resizable({
            handleSelector: this._handleSelector,
            resizeWidth: false,
            onDragStart: () => {
                this._el.addClass('is-resizing');
                preview.disableEvents();
                events.trigger('start-dragging');
            },
            onDragEnd: () => {
                this._el.removeClass('is-resizing');
                preview.enableEvents();
                events.trigger('end-dragging');
            },
        });
    }
}

module.exports = Pen;