const express = require("express");
const router = express.Router();
const ventas = require("../models/ventas");
const { map } = require("lodash");

// Registro de ventas
router.post("/registro", async (req, res) => {
    const datoVentas = ventas(req.body);
    await datoVentas
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Se ha registrado una nueva venta", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas
router.get("/listar", async (req, res) => {
    await ventas
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoCajerosActivas", async (req, res) => {
    const { pagina, limite, usuario } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ usuario, estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalVentasCajerosActivas", async (req, res) => {
    const { usuario } = req.query;
    await ventas
        .find({ usuario, estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCajerosCanceladas", async (req, res) => {
    const { pagina, limite, usuario } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ usuario, estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalVentasCajerosCanceladas", async (req, res) => {
    const { usuario } = req.query;
    await ventas
        .find({ usuario, estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoActivas", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalVentasActivas", async (_req, res) => {
    await ventas
        .find({ estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoActivasTicket", async (req, res) => {
    const { pagina, limite, numeroTiquet } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ numeroTiquet, estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalVentasActivasTicket", async (req, res) => {
    const { numeroTiquet } = req.query;
    await ventas
        .find({ numeroTiquet, estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCanceladas", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalVentasCanceladas", async (_req, res) => {
    await ventas
        .find({ estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCanceladasTicket", async (req, res) => {
    const { pagina, limite, numeroTiquet } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ numeroTiquet, estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalVentasCanceladasTicket", async (req, res) => {
    const { numeroTiquet } = req.query;
    await ventas
        .find({ numeroTiquet, estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas
router.get("/totalVentas", async (_req, res) => {
    await ventas
        .find()
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas con paginacion segun el dia
router.get("/listarPaginandoDia", async (req, res) => {
    const { pagina, limite, dia } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ estado: "true", createdAt: { $gte: new Date(dia + 'T00:00:00.000Z'), $lte: new Date(dia + 'T23:59:59.999Z') } })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas
router.get("/listarVentasDia", async (req, res) => {
    const { dia } = req.query;

    await ventas
        .find({ estado: "true", createdAt: { $gte: new Date(dia + 'T00:00:00.000Z'), $lte: new Date(dia + 'T23:59:59.999Z') } })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas
router.get("/listarVentasMes", async (req, res) => {
    const { mes, año } = req.query;

    await ventas
        .find({ estado: "true", agrupar: mes, año: año })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener los totales segun el dia
router.get("/listarTotalVentasDia", async (req, res) => {
    const { dia } = req.query;
    await ventas
        .find({ estado: "true", createdAt: { $gte: new Date(dia + 'T00:00:00.000Z'), $lte: new Date(dia + 'T23:59:59.999Z') } })
        .sort({ _id: -1 })
        .then((data) => {
            //console.log(data)
            let productos_vendidos = 0;
            let bebidas_vendidas = 0;
            let extras_vendidos = 0;
            let sandwiches_vendidos = 0;
            let desayunos_vendidos = 0;
            let hamburguesas_vendidas = 0;
            let cafeteria_vendida = 0;
            let envios_vendidos = 0;
            let efectivo = 0;
            let tarjeta = 0;
            let transferencia = 0;
            map(data, (totales, indexPrincipal) => {

                // Sumatoria de artículos vendidos
                map(totales.productos, (producto, index) => {
                    if (producto.categoria === "623b7f2fe94614410f810a47" || producto.categoria === "623b7f24e94614410f810a44" || producto.categoria === "623b7f1be94614410f810a41" || producto.categoria === "623b7f0be94614410f810a3e") {
                        productos_vendidos += 1;
                    }
                    if (producto.categoria === "62397cbaf67f5c7c54a0560b") {
                        bebidas_vendidas += 1;
                    }
                    if (producto.categoria === "625d8b798bb242960f22ae56") {
                        extras_vendidos += 1;
                    }
                    if (producto.categoria === "627a86119d083324e156bda8") {
                        sandwiches_vendidos += 1;
                    }
                    if (producto.categoria === "631b541c05ab0cb5a3c1dbd6") {
                        desayunos_vendidos += 1;
                    }
                    if (producto.categoria === "6262ee08e1383d22020db083") {
                        envios_vendidos += 1;
                    }
                    if (producto.categoria === "64273bc6804705a24d7fb813") {
                        hamburguesas_vendidas += 1;
                    }
                    if (producto.categoria === "64273eb4dad2341c0af5fca4") {
                        cafeteria_vendida += 1;
                    }
                })

                // Sumatoria de ventas realizadas con efectivo
                if (totales.tipoPago === "Efectivo") {
                    efectivo += parseFloat(totales.total);
                    // console.log(totales.total)
                }

                // Sumatoria de ventas realizadas con tarjeta
                if (totales.tipoPago === "Tarjeta") {
                    tarjeta += parseFloat(totales.total);
                    // console.log(totales.total)
                }

                // Sumatoria de ventas realizadas con transferencia
                if (totales.tipoPago === "Transferencia") {
                    transferencia += parseFloat(totales.total);
                    // console.log(totales.total)
                }

            })
            res.status(200).json({ efectivo: efectivo, tarjeta: tarjeta, transferencia: transferencia, tortasVendidas: productos_vendidos, bebidasVendidas: bebidas_vendidas, extrasVendidos: extras_vendidos, sandwichesVendidos: sandwiches_vendidos, desayunosVendidos: desayunos_vendidos, hamburguesasVendidas: hamburguesas_vendidas, cafeteriaVendida: cafeteria_vendida, enviosVendidos: envios_vendidos })
        })
        .catch((error) => res.json({ message: error }));
});

// Obtener los totales segun el mes 
router.get("/listarTotalVentasMes", async (req, res) => {
    const { mes, año } = req.query;
    await ventas
        .find({ estado: "true", agrupar: mes, año: año })
        .sort({ _id: -1 })
        .then((data) => {
            //console.log(data)
            let productos_vendidos = 0;
            let bebidas_vendidas = 0;
            let extras_vendidos = 0;
            let sandwiches_vendidos = 0;
            let desayunos_vendidos = 0;
            let hamburguesas_vendidas = 0;
            let cafeteria_vendida = 0;
            let envios_vendidos = 0;
            let efectivo = 0;
            let tarjeta = 0;
            let transferencia = 0;
            map(data, (totales, indexPrincipal) => {

                // Sumatoria de artículos vendidos
                map(totales.productos, (producto, index) => {
                    if (producto.categoria === "623b7f2fe94614410f810a47" || producto.categoria === "623b7f24e94614410f810a44" || producto.categoria === "623b7f1be94614410f810a41" || producto.categoria === "623b7f0be94614410f810a3e") {
                        productos_vendidos += 1;
                    }
                    if (producto.categoria === "62397cbaf67f5c7c54a0560b") {
                        bebidas_vendidas += 1;
                    }
                    if (producto.categoria === "625d8b798bb242960f22ae56") {
                        extras_vendidos += 1;
                    }
                    if (producto.categoria === "627a86119d083324e156bda8") {
                        sandwiches_vendidos += 1;
                    }
                    if (producto.categoria === "631b541c05ab0cb5a3c1dbd6") {
                        desayunos_vendidos += 1;
                    }
                    if (producto.categoria === "6262ee08e1383d22020db083") {
                        envios_vendidos += 1;
                    }
                    if (producto.categoria === "64273bc6804705a24d7fb813") {
                        hamburguesas_vendidas += 1;
                    }
                    if (producto.categoria === "64273eb4dad2341c0af5fca4") {
                        cafeteria_vendida += 1;
                    }
                })

                // Sumatoria de ventas realizadas con efectivo
                if (totales.tipoPago === "Efectivo") {
                    efectivo += parseFloat(totales.total);
                    // console.log(totales.total)
                }

                // Sumatoria de ventas realizadas con tarjeta
                if (totales.tipoPago === "Tarjeta") {
                    tarjeta += parseFloat(totales.total);
                    // console.log(totales.total)
                }

                // Sumatoria de ventas realizadas con transferencia
                if (totales.tipoPago === "Transferencia") {
                    transferencia += parseFloat(totales.total);
                    // console.log(totales.total)
                }

            })
            res.status(200).json({ efectivo: efectivo, tarjeta: tarjeta, transferencia: transferencia, tortasVendidas: productos_vendidos, bebidasVendidas: bebidas_vendidas, extrasVendidos: extras_vendidos, sandwichesVendidos: sandwiches_vendidos, desayunosVendidos: desayunos_vendidos, hamburguesasVendidas: hamburguesas_vendidas, cafeteriaVendida: cafeteria_vendida, enviosVendidos: envios_vendidos })
        })
        .catch((error) => res.json({ message: error }));
});

//Obtener los detalles de las ventas del mes
router.get("/listarDetallesVentasMes", async (req, res) => {
    const { dia } = req.query;
    //console.log(dia)
    await ventas
        .find({ estado: "true", agrupar: dia })
        .count()
        .sort({ _id: -1 })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas con paginacion segun el mes
router.get("/listarPaginandoMes", async (req, res) => {
    const { pagina, limite, mes, año } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    console.log(año)

    const skip = (pagina - 1) * limite;

    await ventas
        .find({ estado: "true", agrupar: mes, año: año })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Obtener los detalles de las ventas del día
router.get("/listarDetallesVentasDia", async (req, res) => {
    const { dia } = req.query;
    //console.log(dia)
    await ventas
        .find({ estado: "true", createdAt: { $gte: new Date(dia + 'T00:00:00.000Z'), $lte: new Date(dia + 'T23:59:59.999Z') } })
        .count()
        .sort({ _id: -1 })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el día solicitado
router.get("/listarDetallesProductosVendidosDia", async (req, res) => {
    const { dia } = req.query;
    //console.log(dia)
    await ventas
        .find({ estado: "true", createdAt: { $gte: new Date(dia + 'T00:00:00.000Z'), $lte: new Date(dia + 'T23:59:59.999Z') } })
        .sort({ _id: -1 })
        .then((data) => {
            let dataTemp = []
            // console.log(data)
            map(data, (datos, indexPrincipal) => {

                map(datos.productos, (producto, index) => {
                    const { nombre, precio } = producto;
                    dataTemp.push({ numeroTiquet: data[indexPrincipal].numeroTiquet, estado: data[indexPrincipal].estado === "true" ? "Venta completada" : "Venta cancelada", cliente: data[indexPrincipal].cliente ? data[indexPrincipal].cliente : "No especificado", nombre: nombre, precio: precio, tipoPago: data[indexPrincipal].tipoPago, totalVenta: data[indexPrincipal].total })
                })

            })
            res.status(200).json(dataTemp)
        })
        .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el día solicitado
router.get("/listarConsumoIngredientes", async (req, res) => {
    const { dia } = req.query;
    //console.log(dia)
    await ventas
        .find({ estado: "true", createdAt: { $gte: new Date(dia + 'T00:00:00.000Z'), $lte: new Date(dia + 'T23:59:59.999Z') } })
        .sort({ _id: -1 })
        .then((data) => {
            let dataTemp = []
            // console.log(data)
            map(data, (datos, indexPrincipal) => {

                map(datos.productos, (producto, indexProductos) => {
                    map(producto.ingredientes, (ingrediente, indexIngrediente) => {
                        const { id, nombre, cantidad, um } = ingrediente;
                        dataTemp.push({ id: id, nombre: nombre, cantidad: cantidad, um: um, fecha: data[indexPrincipal].createdAt })
                    })
                })
            })
            res.status(200).json(dataTemp)
        })
        .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el mes solicitado
router.get("/listarDetallesProductosVendidosMes", async (req, res) => {
    const { mes, año } = req.query;
    //console.log(dia)
    await ventas
        .find({ estado: "true", agrupar: mes, año: año })
        .sort({ _id: -1 })
        .then((data) => {
            let dataTemp = []
            // console.log(data)
            map(data, (datos, indexPrincipal) => {

                map(datos.productos, (producto, index) => {
                    const { nombre, precio } = producto;
                    dataTemp.push({ numeroTiquet: data[indexPrincipal].numeroTiquet, estado: data[indexPrincipal].estado === "true" ? "Venta completada" : "Venta cancelada", cliente: data[indexPrincipal].cliente ? data[indexPrincipal].cliente : "No especificado", nombre: nombre, precio: precio, tipoPago: data[indexPrincipal].tipoPago, totalVenta: data[indexPrincipal].total })
                })

            })
            res.status(200).json(dataTemp)
        })
        .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el mes solicitado
router.get("/listarProductosAdicionales", async (req, res) => {
    const { numeroTiquet } = req.query;
    //console.log(dia)
    await ventas
        .find({ estado: "true", numeroTiquet: numeroTiquet })
        .sort({ _id: -1 })
        .then((data) => {
            let dataTemp = []
            // console.log(data)
            map(data, (datos, indexPrincipal) => {

                map(datos.productos, (producto, index) => {
                    const { nombre, precio } = producto;
                    dataTemp.push({ numeroTiquet: data[indexPrincipal].numeroTiquet, estado: data[indexPrincipal].estado === "true" ? "Venta completada" : "Venta cancelada", cliente: data[indexPrincipal].cliente ? data[indexPrincipal].cliente : "No especificado", nombre: nombre, precio: precio, tipoPago: data[indexPrincipal].tipoPago, totalVenta: data[indexPrincipal].total })
                })

            })
            res.status(200).json(dataTemp)
        })
        .catch((error) => res.json({ message: error }));
});

// Obtener una venta en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await ventas
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una venta en especifico
router.get("/obtenerVentaAsociada/:tiquetVenta", async (req, res) => {
    const { tiquetVenta } = req.params;
    await ventas
        .find({ tiquetVenta })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una venta
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await ventas
        .remove({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Venta eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una venta
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    await ventas
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la venta actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una venta
router.put("/cambiarIdentificador/:id", async (req, res) => {
    const { id } = req.params;
    const { atendido } = req.body;
    await ventas
        .updateOne({ _id: id }, { $set: { atendido } })
        .then((data) => res.status(200).json({ mensaje: "Venta atendida" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de la venta actual
router.get("/obtenNoTiquet", async (req, res) => {
    const ventasTotales = await ventas.findOne().sort({ _id: -1 });
    // console.log(ventasTotales)
    if (ventasTotales.numeroTiquet !== undefined) {
        res.status(200).json({ noTiquet: ventasTotales.numeroTiquet })
    } else {
        res.status(200).json({ noTiquet: "0" })
    }
});

// Actualizar datos del producto
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { tipoPago, efectivo, cambio, subtotal, total, pagado, iva, comision } = req.body;
    await ventas
        .updateOne({ _id: id }, { $set: { tipoPago, efectivo, cambio, subtotal, total, pagado, iva, comision } })
        .then((data) => res.status(200).json({ mensaje: "Datos del producto actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;

