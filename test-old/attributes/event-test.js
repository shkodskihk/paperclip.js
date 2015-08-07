var pc   = require("../.."),
assert   = require("assert"),
paperclip = require("../.."),
stringifyView = require("../utils/stringifyView"),
template = paperclip.template;

describe(__filename + "#", function () {



  [
    "click",
    "doubleClick:dblclick",
    "load",
    "submit",
    "mouseDown",
    "mouseMove",
    "mouseUp",
    "change",
    "mouseOver",
    "mouseOut",
    "focusIn:focus",
    "focusOut:blur",
    "keyDown",
    "keyUp",
    "dragStart",
    "dragEnd",
    "dragOver",
    "dragEnter",
    "dragLeave",
    "selectStart",
    "drop"
  ].forEach(function (event) {

    var ep = event.split(":"),
    name   = ep.shift(),
    nevent = (ep.shift() || name).toLowerCase();

    it("can capture a " + name + " event", function (next) {

      var t = template(
        "<div on"+name.substr(0, 1).toUpperCase() + name.substr(1)+"='{{" +
          "onEvent" +
        "}}'></div>"
      , paperclip).view({
        onEvent: function (event) {
          assert.equal(event.type, name.toLowerCase());
          next();
        }
      });

      t.render();


      var e = document.createEvent("Event");
      e.initEvent(name.toLowerCase(), true, true);
      t.section.node.dispatchEvent(e);
    });
  });

  it("does not prevent dragstart events", function (next) {
    var t = pc.template(
      "<div onDragStart='{{" +
      "onDragStart" +
      "}}'></div>"
      , paperclip).view({
        onDragStart: function (event) {
          if (!event.defaultPrevented) {
            next();
          }
        }
      });

    var e = document.createEvent("Event");
    e.initEvent("dragstart", true, true);
    t.render().dispatchEvent(e);

  });

  it("does not prevent dragend events", function (next) {
    var t = pc.template(
      "<div onDragEnd='{{" +
      "onDragEnd" +
      "}}'></div>"
      , paperclip).view({
        onDragEnd: function (event) {
          if (!event.defaultPrevented) {
            next();
          }
        }
      });

    var e = document.createEvent("Event");
    e.initEvent("dragend", true, true);
    t.render().dispatchEvent(e);
  });


  it("can capture an onEnter event", function (next) {

    var t = pc.template(
      "<div onEnter='{{" +
        "onEvent" +
      "}}'></div>"
    , paperclip).view({
      onEvent: function (event) {
        next();
      }
    });



    var e = document.createEvent("Event");
    e.initEvent("keydown", true, true);
    e.keyCode = 13;
    t.render().dispatchEvent(e);

  });

  it("can capture an onDelete event", function (next) {

    var t = pc.template(
      "<div onDelete='{{" +
        "onEvent" +
      "}}'></div>"
    , paperclip).view({
      onEvent: function (event) {
        next();
      }
    });

    var e = document.createEvent("Event");
    e.initEvent("keydown", true, true);
    e.keyCode = 8;
    t.render().dispatchEvent(e);
  });

  it("can capture an onEscape event", function (next) {

    var t = pc.template(
      "<div onEscape='{{" +
        "onEvent" +
      "}}'></div>"
    , paperclip).view({
      onEvent: function (event) {
        next();
      }
    });

    var e = document.createEvent("Event");
    e.initEvent("keydown", true, true);
    e.keyCode = 27;
    t.render().dispatchEvent(e);
  });

  it("doesn't catch events outside of escape event keycode", function () {
    var i = 0;
    var t = pc.template(
      "<div onEscape='{{" +
        "onEvent" +
      "}}'></div>"
    , paperclip).view({
      onEvent: function (event) {
        i++;
      }
    });

    var e = document.createEvent("Event");
    e.initEvent("keydown", true, true);
    e.keyCode = 30;
    t.render().dispatchEvent(e);
    assert.equal(i, 0);
  });


  it("cannot trigger an event if a view is unbound", function () {
    var i = 0;
    var t = pc.template(
      "<div onEscape='{{" +
        "onEvent" +
      "}}'></div>"
    , paperclip).view({
      onEvent: function (event) {
        i++;
      }
    });

    var e = document.createEvent("Event");
    e.initEvent("keydown", true, true);
    e.keyCode = 27;
    t.render().dispatchEvent(e);
    assert.equal(i, 1);
    t.update({});
    t.section.node.dispatchEvent(e);
    assert.equal(i, 1);
  });
});