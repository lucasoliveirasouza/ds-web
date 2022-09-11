EventDomContentLoaded(() => {
    document.querySelectorAll("input[data-mask='date']").forEach((el) => {
        VMasker(el).maskPattern('99/99/9999');
        el.addEventListener('input', inputHandler.bind(undefined, ['99/99/9999'], 10), false);
    });
    Array.from(document.querySelectorAll(".datepicker-input")).forEach(function (el) {
        let dp = new Datepicker(el, { buttonClass: 'btn', autohide: true, language: 'pt-BR' });
        el.nextElementSibling.children[0].addEventListener('click', () => dp.show());
    });
})

class APIHelper {
    static LocalHost = "https://localhost:7187";
    static LocalHostDisciplina = "http://localhost:8085";
    static ObjetoEmEdicao = {}
}

function inputHandler(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
}


async function postJSON(optionsFetch) {
    const { url, data, method } = optionsFetch

    const options = method == "GET" ?
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization': getCookie("token-jwt")
            }
        }
        :
        {
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization': getCookie("token-jwt")
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data || {})
        }

    const response = await fetch(url, options);

    if (response.status === 200) {
        let json = await response.json();
        if (json.hasOwnProperty("errors")) {
            let mensagem = json.errors.reduce((erro1, erro2) => `${erro1}<br>${erro2}`);
            new Modal().atencao(mensagem).render();
        }
        return json;
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function EventDomContentLoaded(callback) {
    window.addEventListener('DOMContentLoaded', callback);
}

function visualizeSenha(elemento) {
    var senha = elemento.parentNode.parentNode.parentElement.querySelectorAll("input")[0];
    if (senha.type == 'text') {
        senha.type = 'password';
        elemento.setAttribute('title', 'Visualizar a senha');
        elemento.children[0].setAttribute('class', 'fa fa-eye-slash');
    } else {
        senha.type = 'text';
        elemento.setAttribute('title', 'Ocultar a senha');
        elemento.children[0].setAttribute('class', 'fa fa-eye');
    }
}


HTMLDocument.prototype.createElement2 = function (tagName, classList) {
    var el = this.createElement(tagName);
    if (classList) {
        el.classList = classList;
    }
    return el;
};

function formateData(string, opcoes = {}) {
    let data = new Date(string);
    if (isNaN(data)) {
        data = string.convertaStrJsonToDate();
    }
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(data);
}

NodeList.prototype.toArray = function () {
    return Array.from(this);
};

HTMLElement.prototype.removeChildren = function () {
    var child = this.lastElementChild;
    while (child) {
        this.removeChild(child);
        child = this.lastElementChild;
    }
};

String.prototype.convertaStrLocaleToDate = function () {
    if (this.length <= 0) return;
    return new Date(this.split("/").reverse().join('.'));
};

Date.prototype.convertaDateToStrDiaMesAno = function () {
    if (!this) return '';
    dia = this.getDate().toString().padStart(2, '0');
    mes = (this.getMonth() + 1).toString().padStart(2, '0');
    ano = this.getFullYear();
    return dia + '/' + mes + '/' + ano;
}

function obtenhaTemplate(idTemplate) {
    return document.importNode(document.querySelector(`#${idTemplate}`).content, true);
}

const h = (el, atributes, ...children) => {
    var e = document.createElement(el);
    atr(e, atributes);
    ch(e, children);
    return e;
}

const atr = (e, atr) => {
    if (!atr) return;
    for (let at in atr) {
        e.setAttribute(at, atr[at]);
    }
}

const ch = (e, children) => {
    if (!children) return;
    if (Array.isArray(children)) {
        children.flatMap(c => c).forEach(c => {
            e.appendChild(c);
        });
    }
}