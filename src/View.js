import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import { locationInputMsg, removeLocationMsg, addLocationMsg } from "./Update";

const { div, h1, label, input, pre, form, button, ul, li, span, i, p } = hh(h);

function locationForm(dispatch, model) {
  return div({ className: "" }, [
    form(
      {
        className: "",
        onsubmit: e => {
          e.preventDefault();
          dispatch(addLocationMsg);
        }
      },
      [
        label({ className: "f6 b db mb2 white" }, "Location"),
        input({
          className: "pa2 w-60",
          value: model.location,
          oninput: e => dispatch(locationInputMsg(e.target.value))
        }),
        button(
          { className: "pv2 ph3 br2 fr white bg-blue", type: "submit" },
          "Add"
        )
      ]
    )
  ]);
}

function cell(className, label, temp) {
  return div({ className }, [div({ className: "f7 b" }, label), div({}, temp)]);
}

const location = R.curry((dispatch, loc) => {
  const { name, temp, low, high, id } = loc;
  return li({ className: "pa3 bb b--white flex justify-between relative" }, [
    cell("w-60 tl white", "Location", name),
    cell("w-20 tc white", "Temp", temp),
    cell("w-20 tc white", "Low", low),
    cell("w-20 tc mr2 white", "High", high),
    i({
      className:
        "relative top--1 right--1 mt1 mr1 fa fa-remove pointer white-40",
      onclick: () => dispatch(removeLocationMsg(id))
    })
  ]);
});

function locations(dispatch, model) {
  const locations = R.map(location(dispatch), model.locations);
  return ul({ className: "list pl0 ml0 ba b--white br" }, locations);
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb white" }, ["Open Weather Map API"]),
    p({ className: "f7 pv2 i white" }, [
      "For precision, enter the name of the city you wish to lookup, then a comma, and then the two letter country code (eg. New York, US or London, UK)."
    ]),
    locationForm(dispatch, model),
    locations(dispatch, model)
  ]);
}

export default view;
