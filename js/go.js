// Generated by CoffeeScript 1.3.3
(function() {
  var Board, Boards, Piece,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Board = (function(_super) {

    __extends(Board, _super);

    function Board() {
      return Board.__super__.constructor.apply(this, arguments);
    }

    Board.configure("size", "state");

    Board.prototype.newboard = function() {
      var num;
      return this.state = (function() {
        var _i, _ref, _results;
        _results = [];
        for (num = _i = _ref = this.size - 1; _ref <= 0 ? _i <= 0 : _i >= 0; num = _ref <= 0 ? ++_i : --_i) {
          _results.push(Array(this.size));
        }
        return _results;
      }).call(this);
    };

    return Board;

  })(Spine.Model);

  Boards = (function(_super) {

    __extends(Boards, _super);

    Boards.prototype.el = "#board";

    function Boards() {
      Boards.__super__.constructor.apply(this, arguments);
    }

    Boards.prototype.line = function(index) {
      var element;
      element = $("<line class='vertical' />").css({
        left: index * 40
      });
      this.append(element);
      element = $("<line class='horizontal' />").css({
        top: index * 40
      });
      return this.append(element);
    };

    Boards.prototype.render = function() {
      var board, column, dimension, iter, _i, _len, _ref, _results;
      board = new Board({
        size: this.size
      });
      board.newboard();
      dimension = --this.size * 40;
      this.el.css({
        width: dimension,
        height: dimension
      });
      _ref = board.state;
      _results = [];
      for (iter = _i = 0, _len = _ref.length; _i < _len; iter = ++_i) {
        column = _ref[iter];
        _results.push(this.line(iter));
      }
      return _results;
    };

    return Boards;

  })(Spine.Controller);

  Piece = (function(_super) {

    __extends(Piece, _super);

    function Piece() {
      return Piece.__super__.constructor.apply(this, arguments);
    }

    Piece.configure("color", "position");

    return Piece;

  })(Spine.Model);

  $(function() {
    var board;
    board = new Boards({
      size: 19
    });
    return board.render();
  });

}).call(this);
