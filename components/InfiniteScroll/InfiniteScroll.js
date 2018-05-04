'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactWaypoint = require('react-waypoint');

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

var _doc = require('./doc');

var _doc2 = _interopRequireDefault(_doc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteScroll = function (_Component) {
  _inherits(InfiniteScroll, _Component);

  function InfiniteScroll(props, context) {
    _classCallCheck(this, InfiniteScroll);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.increaseOffset = function () {
      var _this$props = _this.props,
          items = _this$props.items,
          onMore = _this$props.onMore,
          step = _this$props.step;
      var count = _this.state.count;

      _this.setState({ count: count + 1 },
      // call onMore if we've reached the end of the items
      function () {
        return onMore && (count + 1) * step >= items.length && onMore();
      });
    };

    _this.state = { count: 1 };
    return _this;
  }

  InfiniteScroll.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        items = _props.items,
        renderMarker = _props.renderMarker,
        scrollableAncestor = _props.scrollableAncestor,
        step = _props.step;
    var count = this.state.count;

    var displayCount = step * count;
    var waypointAt = displayCount - step / 2;

    var marker = _react2.default.createElement(_reactWaypoint2.default, {
      key: 'marker',
      onEnter: this.increaseOffset,
      bottomOffsetX: '-96px',
      scrollableAncestor: scrollableAncestor
    });
    if (renderMarker) {
      // need to give it a key
      marker = _react2.default.cloneElement(renderMarker(marker), { key: 'marker' });
    }

    return items.slice(0, displayCount).map(function (item, index) {
      return [children(item, index), index === waypointAt && marker];
    });
  };

  return InfiniteScroll;
}(_react.Component);

InfiniteScroll.defaultProps = {
  items: [],
  step: 50
};
exports.default = InfiniteScroll;


if (process.env.NODE_ENV !== 'production') {
  (0, _doc2.default)(InfiniteScroll);
}