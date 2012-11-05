// Generated by CoffeeScript 1.3.3
(function() {
  var Board, Game,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Board = (function(_super) {

    __extends(Board, _super);

    function Board() {
      return Board.__super__.constructor.apply(this, arguments);
    }

    Board.configure("size", "state", "history", "states");

    Board.prototype.newboard = function() {
      var num;
      this.state = (function() {
        var _i, _ref, _results;
        _results = [];
        for (num = _i = _ref = this.size; _ref <= 0 ? _i <= 0 : _i >= 0; num = _ref <= 0 ? ++_i : --_i) {
          _results.push(Array(this.size + 1));
        }
        return _results;
      }).call(this);
      this.history = [];
      return this.states = [];
    };

    Board.prototype.formatstate = function() {
      var item, record, _i, _len, _ref;
      record = [];
      _ref = this.state;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        record.push(item.join());
      }
      return record.join();
    };

    Board.prototype.addstate = function() {
      return this.states.push(this.formatstate());
    };

    Board.prototype.addhistory = function(turn, move) {
      return this.history.push(turn + "," + move.join());
    };

    return Board;

  })(Spine.Model);

  Game = (function(_super) {

    __extends(Game, _super);

    Game.prototype.el = "#board";

    Game.prototype.space = 40;

    Game.prototype.move = 0;

    Game.prototype.turn = 0;

    Game.prototype.opponent = 1;

    Game.prototype.turncode = ["black", "white"];

    function Game() {
      Game.__super__.constructor.apply(this, arguments);
      this.size--;
      this.render();
      this.xcheck = [0, 0, -1, 1];
      this.ycheck = [-1, 1, 0, 0];
      this.mover.className = this.turncode[this.turn];
    }

    Game.prototype.elements = {
      "#mover": "mover",
      "shadow": "shadow"
    };

    Game.prototype.events = {
      "mousemove": "moving",
      "mouseout": "hide",
      "mouseover": "show",
      "click": "place"
    };

    Game.prototype.line = function(index) {
      var element;
      element = $("<line class='vertical' />").css({
        left: index * this.space
      });
      this.append(element);
      element = $("<line class='horizontal' />").css({
        top: index * this.space
      });
      return this.append(element);
    };

    Game.prototype.point = function(points) {
      var renderpoint, renderpoints, x, _fn, _i, _j, _len, _len1, _results;
      renderpoints = [];
      _fn = function(x, space) {
        var element, y, _j, _len1, _results;
        this.space = space;
        _results = [];
        for (_j = 0, _len1 = points.length; _j < _len1; _j++) {
          y = points[_j];
          element = $("<dot/>").css({
            left: x * this.space,
            top: y * this.space
          });
          _results.push(renderpoints.push(element));
        }
        return _results;
      };
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        x = points[_i];
        _fn(x, this.space);
      }
      _results = [];
      for (_j = 0, _len1 = renderpoints.length; _j < _len1; _j++) {
        renderpoint = renderpoints[_j];
        _results.push(this.append(renderpoint));
      }
      return _results;
    };

    Game.prototype.render = function() {
      var column, iter, points, _i, _len, _ref;
      this.board = new Board({
        size: this.size
      });
      this.board.newboard();
      this.dimension = this.size * this.space;
      if (this.size > 11) {
        points = [3, this.size / 2, this.size - 3];
      } else {
        points = [this.size / 2];
      }
      this.el.css({
        width: this.dimension,
        height: this.dimension
      });
      _ref = this.board.state;
      for (iter = _i = 0, _len = _ref.length; _i < _len; iter = ++_i) {
        column = _ref[iter];
        this.line(iter);
      }
      return this.point(points);
    };

    Game.prototype.hide = function() {
      this.shadow.hide();
      this.mover.hide();
      return this.position = false;
    };

    Game.prototype.show = function() {
      this.shadow.show();
      return this.mover.show();
    };

    Game.prototype.moving = function() {
      var inner, offset, outer, x, y;
      offset = $(this.el).offset();
      x = event.x - offset.left + this.space / 2;
      y = event.y - offset.top + this.space / 2;
      outer = this.dimension + this.space / 2;
      inner = 0;
      if (x > outer) {
        x = outer;
      }
      if (y > outer) {
        y = outer;
      }
      if (x < inner) {
        x = inner;
      }
      if (y < inner) {
        y = inner;
      }
      this.snap = [x - x % this.space, y - y % this.space];
      this.shadow.css({
        left: this.snap[0],
        top: this.snap[1]
      });
      this.mover.css({
        left: x - this.space / 2,
        top: y - this.space / 2
      });
      this.position = [this.snap[0] / this.space, this.snap[1] / this.space];
      return $('#report').html(this.position.toString());
    };

    Game.prototype.renderpiece = function() {
      var piece, variant;
      variant = Math.floor(Math.random() * 4);
      piece = $("<piece/>").addClass(this.turncode[this.turn] + " var" + variant);
      piece.attr("id", this.position.join("_"));
      piece.css({
        left: this.snap[0],
        top: this.snap[1]
      });
      return this.append(piece);
    };

    Game.prototype.place = function() {
      var location;
      location = this.board.state[this.position[0]][this.position[1]];
      if (location !== void 0) {
        return;
      }
      this.board.state[this.position[0]][this.position[1]] = this.turn;
      this.aggress();
      if (!this.liberty()) {
        this.board.state[this.position[0]][this.position[1]] = void 0;
        return;
      }
      this.renderpiece();
      this.board.addhistory(this.turn, this.position);
      this.board.addstate();
      this.move++;
      this.turn = this.move % 2;
      this.opponent = (this.move + 1) % 2;
      return this.mover.attr("class", this.turncode[this.turn]);
    };

    Game.prototype.neighbor = function(x, y, xc, yc) {
      if (y + yc === -1 || y + yc === this.size + 1 || x + xc === -1 || x + xc === this.size + 1) {
        return false;
      }
      return this.board.state[x + xc][y + yc];
    };

    Game.prototype.aggress = function(location) {
      var iter, neighbor, x, xc, y, yc, _i, _len, _ref, _results;
      x = this.position[0];
      y = this.position[1];
      _ref = this.xcheck;
      _results = [];
      for (iter = _i = 0, _len = _ref.length; _i < _len; iter = ++_i) {
        xc = _ref[iter];
        yc = this.ycheck[iter];
        neighbor = this.neighbor(x, y, xc, yc);
        if (neighbor === void 0) {
          continue;
        }
        if (neighbor === this.opponent) {
          _results.push(this.liberty(this.opponent, [x + xc, y + yc]));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Game.prototype.liberty = function(side, position) {
      var existing, iter, liberties, neighbor, piece, step, structure, test, x, xc, y, yc, _i, _j, _k, _len, _len1, _len2, _ref;
      if (side == null) {
        side = this.turn;
      }
      if (position == null) {
        position = this.position;
      }
      structure = [position];
      step = 0;
      liberties = false;
      while (step < structure.length) {
        x = structure[step][0];
        y = structure[step][1];
        _ref = this.xcheck;
        for (iter = _i = 0, _len = _ref.length; _i < _len; iter = ++_i) {
          xc = _ref[iter];
          yc = this.ycheck[iter];
          neighbor = this.neighbor(x, y, xc, yc);
          if (neighbor === false) {
            continue;
          }
          if (neighbor === void 0) {
            liberties = true;
            break;
          }
          if (neighbor === side) {
            test = [x + xc, y + yc].join();
            existing = false;
            for (_j = 0, _len1 = structure.length; _j < _len1; _j++) {
              piece = structure[_j];
              if (piece.join() === test) {
                existing = true;
                break;
              }
            }
            if (!existing) {
              structure.push([x + xc, y + yc]);
            }
          }
        }
        step++;
      }
      if (side !== this.turn && !liberties) {
        for (_k = 0, _len2 = structure.length; _k < _len2; _k++) {
          piece = structure[_k];
          this.board.state[piece[0]][piece[1]] = void 0;
          $("#" + piece.join("_")).remove();
        }
      }
      return liberties;
    };

    return Game;

  })(Spine.Controller);

  $(function() {
    var game;
    return game = new Game({
      size: 19
    });
  });

}).call(this);
