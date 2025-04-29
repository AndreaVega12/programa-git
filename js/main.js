let globalData = "";

function alterMenu() {
    let b = document.getElementById("botonMenu");
    if (b.classList.contains("open")) {
        b.classList.remove('open');
        document.getElementById("menu_list").classList.remove('open');
    } else {
        b.classList.add('open');
        document.getElementById("menu_list").classList.add('open');
    }
}

function loadingBlock(message = "Espere por favor...", parent = document.body) {
    let x = document.createElement("div");
    x.classList.add("loading");
    x.innerHTML = `<label>${message}</label>
			<div class="bar">
				<div class="point"></div>
			</div>`;
    parent.appendChild(x);
    return x;
}

function obtenerInformacionSesion() {
    let loadingblock = loadingBlock();
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState < 3) {
            return;
        }
        if (this.readyState === 4) {
            loadingblock.remove();
            try {
                let jsonResponse = JSON.parse(this.response);
                if (jsonResponse.online) {
                    construirMenu(jsonResponse.menu);
                } else {
                    location.href = "index.html";
                }
            } catch (e) {
                console.error(e);
                location.href = "index.html";
            }
        }
    });
    xhr.open("GET", "sesion.php");
    xhr.send();
}

function construirMenu(opciones) {
    let menu = document.getElementById("menu_list");
    menu.innerHTML = `<h1 class="text-center">SICOPV</h1>`;
    for (let opcion of opciones) {
        menu.innerHTML += `<div class="card"><label onclick="alterMenu();obtenerInformacion('${opcion}')">${opcion}</label></div>`;
    }
}

function obtenerInformacion(variable) {
    let loadingblock = loadingBlock();
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState < 3) {
            return;
        }
        if (this.readyState === 4) {
            loadingblock.remove();
            try {
                let jsonResponse = JSON.parse(this.response);
                globalData = jsonResponse;
                listarVariable(variable, jsonResponse);
            } catch (e) {
                console.error(e);
            }
        }
    });
    xhr.open("GET", "obtenerInformacion" + variable + ".php");
    xhr.send();
}

function listarVariable(variable, data) {
    let app = document.getElementById("app");
    let contenido = `<h1 class="text-center">Lista de ${variable}</h1>`
        + `<div class="flex space-between margin-bottom-1em"><input type="text" id="filtroListado" placeholder="BUSCAR..." class="flex-1"><img class="imgbtn" src="img/buscar.png" onclick="filtrarListado()"></div>`
        + `<div class="flex-1 margin-bottom-1em overflow-y-scroll" id="listadoListado">`;
    for (let ind in data) {
        contenido += `<div class="flex space-between margin-bottom-1em"><label class="flex-1">${data[ind].label}</label><div class="flex"><div onclick="verDetalleDato('${variable}',${ind})"><img src="img/informacion.png" class="imgbtn"></div><div onclick="editarDato('${variable}',${ind})"><img src="img/editar.png" class="imgbtn"></div></div></div>`;
    }
    contenido += `</div>`
        + `<div class="margin-bottom-1em"><input type="button" value="Crear Nuevo" onclick="crearNuevo('${variable}')"></div>`;
    app.innerHTML = contenido;
}

function filtrarListado() {
    let filtroListado = document.getElementById("filtroListado")
    let listadoListado = document.getElementById("listadoListado");
    for (let child of listadoListado.children) {
        if (!child.children[0].innerText.includes(filtroListado.value)) {
            child.classList.add("hidde");
        } else {
            child.classList.remove("hidde");
        }
    }
}

function verDetalleDato(variable, gind) {
    let app = document.getElementById("app");
    let contenido = `<h1 class="text-center">Detalle de ${variable}</h1>`
        + `<div class="flex-1 margin-bottom-1em" id="listadoListado">`;
    for (let ind in globalData[gind].datos) {
        contenido += `<div class="margin-bottom-1em"><div>${ind}</div><div><input type="text" value="${globalData[gind].datos[ind]}" disabled></div></div>`;
    }
    contenido += `</div>`
        + `<div class="margin-bottom-1em flex"><input class="flex-1" type="button" value="Regresar" onclick="obtenerInformacion('${variable}')"></div>`;
    app.innerHTML = contenido;
}

function editarDato(variable, gind) {
    let app = document.getElementById("app");
    let contenido = `<h1 class="text-center">Detalle de ${variable}</h1>`
        + `<div class="flex-1 margin-bottom-1em" id="listadoListado">`;
    for (let ind in globalData[gind].datos) {
        contenido += `<div class="margin-bottom-1em"><div>${ind}</div><div><input type="text" value="${globalData[gind].datos[ind]}"></div></div>`;
    }
    contenido += `</div>`
        + `<div class="margin-bottom-1em flex"><input class="flex-1" type="button" value="Guardar" onclick="crearNuevo('${variable}')"></div>
        <div class="margin-bottom-1em flex"><input class="flex-1" type="button" value="Regresar" onclick="obtenerInformacion('${variable}')"></div>`;
    app.innerHTML = contenido;
}

function crearNuevo(variable) {
    let app = document.getElementById("app");
    let contenido = `<h1 class="text-center">Registro de ${variable}</h1>`
        + `<div class="flex-1 margin-bottom-1em" id="listadoListado">`;
    for (let ind in globalData[0].datos) {
        contenido += `<div class="margin-bottom-1em"><div>${ind}</div><div><input type="text"></div></div>`;
    }
    contenido += `</div>`
        + `<div class="margin-bottom-1em flex"><input class="flex-1" type="button" value="Guardar" onclick="crearNuevo('${variable}')"></div>
        <div class="margin-bottom-1em flex"><input class="flex-1" type="button" value="Regresar" onclick="obtenerInformacion('${variable}')"></div>`;
    app.innerHTML = contenido;
}

window.addEventListener("load", function () {
    obtenerInformacionSesion();
});