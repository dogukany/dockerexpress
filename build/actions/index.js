"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reToken = exports.authUser = exports.setUser = exports.getUsers = exports.getMainRouter = void 0;
var userSchema_1 = __importDefault(require("../models/userSchema"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var getMainRouter = function (req, res, next) {
    res.send("check /users router for post and get method");
};
exports.getMainRouter = getMainRouter;
var getUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSchema_1.default.findOne({ email: req.user.email }, function (err, myUser) {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        res.json(myUser);
                    }
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var setUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userheader, accessToken, refreshToken, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userheader = { email: req.body.email };
                accessToken = jsonwebtoken_1.default.sign(userheader, "" + process.env.ACCESS_TOKEN, {
                    expiresIn: "15s",
                });
                refreshToken = jsonwebtoken_1.default.sign(userheader, "" + process.env.REFRESH_TOKEN);
                user = new userSchema_1.default({
                    email: req.body.email,
                    password: req.body.password,
                    refreshToken: refreshToken,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.json({
                    accesstoken: accessToken,
                    refreshtoken: refreshToken,
                    message: "user created",
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.sendStatus(401)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.setUser = setUser;
var authUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var header, token;
    return __generator(this, function (_a) {
        header = req.headers["authorization"];
        token = header && header.split(" ")[1];
        if (token == null && header == null) {
            res.sendStatus(401);
        }
        else {
            jsonwebtoken_1.default.verify(token, "" + process.env.ACCESS_TOKEN, function (err, user) {
                if (err) {
                    res.sendStatus(401);
                }
                else {
                    req.user = user;
                    next();
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.authUser = authUser;
var reToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, userToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.body.token;
                userToken = "";
                if (refreshToken === null)
                    return [2 /*return*/, res.sendStatus(401)];
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.body.email }, function (err, myUser) {
                        if (err || myUser === null) {
                            res.sendStatus(401);
                        }
                        else {
                            userToken = myUser.refreshToken;
                            if (!userToken.includes(refreshToken))
                                return res.sendStatus(401);
                            jsonwebtoken_1.default.verify(refreshToken, "" + process.env.REFRESH_TOKEN, function (err, user) {
                                if (err)
                                    return res.sendStatus(403);
                                var accessToken = jsonwebtoken_1.default.sign({ email: req.body.email }, "" + process.env.ACCESS_TOKEN, {
                                    expiresIn: "15s",
                                });
                                res.json({ accessToken: accessToken });
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.reToken = reToken;
