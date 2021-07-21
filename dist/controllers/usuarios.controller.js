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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const sequelize_1 = require("sequelize");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        where: {
            estado: 1
        }
    });
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No se encontro usuario con el id: ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email:${body.email}`
            });
        }
        // const usuario = Usuario.build( body )
        // await usuario.save();
        const usuario = yield usuario_1.default.create(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Favor comunicarse con el administrador"
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: `El usuario con el id : ${id} no existe`
            });
        }
        if (body.email) {
            const existeEmail = yield usuario_1.default.findOne({
                where: {
                    email: body.email,
                    [sequelize_1.Op.not]: [{ id }],
                }
            });
            if (existeEmail) {
                return res.status(400).json({
                    msg: `Ya existe un usuario con el email:${body.email}`
                });
            }
        }
        // const usuario = Usuario.build( body )
        // await usuario.save();
        yield usuario.update(body, { where: { id } });
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Favor comunicarse con el administrador"
        });
    }
});
exports.putUsuario = putUsuario;
const deletUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: `El usuario con el id : ${id} no existe`
            });
        }
        // eliminacion fisica
        // await usuario.destroy();
        // eliminacion logica
        yield usuario.update({ estado: 0 });
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Favor comunicarse con el administrador"
        });
    }
});
exports.deletUsuario = deletUsuario;
//# sourceMappingURL=usuarios.controller.js.map