var WintellectJs;
(function (WintellectJs) {

    'use strict';

    var Subscription = (function () {
            function Subscription(id, callback) {
                this.id = id;
                this.callback = callback;
            }
            return Subscription;
        })(),

        Message = (function () {
            function Message() {
                this._subscriptions = [];
                this._nextId = 0;
            }
            Message.prototype.subscribe = function (callback) {
                var subscription = new Subscription(this._nextId++, callback);
                this._subscriptions[subscription.id] = subscription;
                return subscription.id;
            };
            Message.prototype.unSubscribe = function (id) {
                this._subscriptions[id] = undefined;
            };
            Message.prototype.notify = function (payload) {
                var index;
                for(index = 0; index < this._subscriptions.length; index++) {
                    if(this._subscriptions[index]) {
                        this._subscriptions[index].callback(payload);
                    }
                }
            };
            return Message;
        })();

    WintellectJs.$$jsEventAgg = (function () {
        function EventManager() {
            this._messages = {
            };
        }

        EventManager.prototype.subscribe = function (message, callback) {
            var msg;
            msg = this._messages[message] || (this._messages[message] = new Message());
            return msg.subscribe(callback);
        };
        EventManager.prototype.unSubscribe = function (message, token) {
            if (this._messages[message]) {
                ((this._messages[message])).unSubscribe(token);
            }
        };
        EventManager.prototype.publish = function (message, payload) {
            if (this._messages[message]) {
                ((this._messages[message])).notify(payload);
            }
        };
        return EventManager;
    })();
})(WintellectJs || (WintellectJs = {}));