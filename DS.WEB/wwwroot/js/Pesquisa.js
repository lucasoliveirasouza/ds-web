class Pesquisa {
    constructor(options) {
        this._options = options;
        this._container = document.getElementById(`${this._options.id}_container`);
        const eventoAposMostrar = () => {
            if (this._inputPesquisa) {
                this._inputPesquisa.focus();
            }
        };

        this.__modal = new ModalBuilder()
            .corpo(options.templateBody)
            .rodape(options.templateFooter)
            .alinhamentoCorpoEsquerda()
            .centralizado()
            .adicioneClasse('modal-pesquisa')
            .depoisDeMostrar(eventoAposMostrar)
            .depoisDeOcultar(this._limpePesquisa)
            .estatico()
            .largo()
            .renderSemMostrar();

        this._grid = this.__modal.querySelector(`#Grid_${this._options.id}`);
        this._timeoutFiltreTransparente;
        this._inputCodigo = document.querySelector(`#${this._options.id}`);
        this._inputDescricao = document.querySelector(`#${this._options.id}_text`);
        this._inputPesquisa = this.__modal.querySelector(`#${this._options.id}Pesquisa`);
        this._apagarPesquisa = this.__modal.querySelector(`#${this._options.id}ApagarPesquisa`);
        this._apagarSelecionado = document.querySelector(`#${this._options.id}ApagarSelecionado`);
        this._pesquisar = document.querySelector(`#${this._options.id}Pesquisar`);
        this._selecionar = this.__modal.querySelector(`#${this._options.id}Selecionar`);
        this._novo = document.querySelector(`#${this._options.id}Novo`);
        this._editar = document.querySelector(`#${this._options.id}Editar`);
        this._infoRapidas = document.querySelector(`#${this._options.id}InfoRapidas`);
        this._formGroup = this._inputDescricao.closest(".form-group");

        this._fechar = this.__modal.querySelector(`#${this._options.id}Fechar`);

        this._prepare();
    }

    _openModal(key) {
        if (!key) key = '';
        this._selecionar.disabled = true;
        this._oculteControlesPesquisa();

        if (this.__modal.isShown) {
            this._inputPesquisa.value = `${this._inputPesquisa.value}${key}`;
            this._inputPesquisa.dispatchEvent(new Event("keyup"));
            return;
        }

        this._inputPesquisa.value += key;

        this.__modal.show();
        this._pesquiseServidor(this._obtenhaParametros(key))
    }

    async _filtre(termoPesquisa) {
        const resposta = this._pesquiseServidor(this._obtenhaParametros(termoPesquisa));

        if (this._grid.Grid.getData().length > 0) {
            this._selecionar.disabled = false;
        }

        return resposta;
    }

    _obtenhaParametros(termoPesquisa) {
        let filtrosPesquisa = {};
        let nomeFuncao = this._options.parametrosPesquisa;

        if (nomeFuncao) {
            let regexParametrosFuncao = /\([A-Za-z0-9\s]{0,}\)$/;
            if (!regexParametrosFuncao.test(nomeFuncao)) nomeFuncao += '()';
            filtrosPesquisa = eval(nomeFuncao);
        }

        filtrosPesquisa.TermoPesquisa = termoPesquisa;
        return filtrosPesquisa;
    }

    async _pesquiseServidor(filtrosPesquisa) {
        let urlAction = this._options.action;
        const optionsFetch = {
            url: urlAction,
            data: filtrosPesquisa,
            method: this._options.method
        }
        let resposta = await postJSON(optionsFetch);

        if (resposta && resposta.success) {
            let data;
            if (this._options.modelName == "AlunoModel" || this._options.modelName == "ProfessorModel") {
                data = resposta.data.map(obj => {
                    return {
                        Id: obj.id,
                        Matricula: obj.matricula,
                        Nome: obj.nome
                    }
                });
            }
            else {
                data = resposta.data;
            }
            if (!Object.keys(data).length) data = [];
            if (!Array.isArray(data)) data = [data];
            window[`Grid_${this._options.id}`].setData(data);
            window[`Grid_${this._options.id}`].bind();
            this.__modal.querySelectorAll('.em-grid-row').forEach(row => row.addEventListener('dblclick', () => { this._selecione(); }));
            window[`Grid_${this._options.id}`].selecionePrimeiro();
            this._selecionar.disabled = data.length === 0;
            if (this._inputPesquisa.value.length) {
                this._mostre(this._apagarPesquisa);
            }
        }

        return resposta;
    }

    _apaguePesquisa() {
        this._oculteControlesPesquisa();
        this._inputPesquisa.focus();
        this._inputPesquisa.value = '';
    }
    _limpePesquisa() {
        this.querySelector('input').value = '';
    }

    _apagueSelecionado(cancelarFoco) {
        this._oculteControlesSelecionado();
        this._inputCodigo.value = '';
        this._inputDescricao.value = '';
        this._selecionado = undefined;

        if (this._options.permiteDigitar) {
            this._inputDescricao.removeAttribute("readonly");
        }

        this._selecionado = undefined;
        this._dispareEventos();
        this._options.aoApagar && eval(`${this._options.aoApagar}()`);
        if (!cancelarFoco) this._inputDescricao.focus();
    }

    _selecione(parametros) {
        if (!parametros) parametros = {};

        let selecionados = window[`Grid_${this._options.id}`].obtenhaSelecionados();
        if (!parametros.model) parametros.model = selecionados.length > 1
            ? selecionados : selecionados[0];

        if (this._options.antesSelecionar && !eval(`${this._options.antesSelecionar}(parametros.model)`)) {
            this._apagueSelecionado();
            window[`Grid_${this._options.id}`].clear();
            this.__modal.hide();
            return;
        }

        if (!parametros.model || this._selecionar.disabled) {
            if (parametros.apagueSeFalhar) this._apagueSelecionado(parametros.apagueSeFalhar);
            return;
        }

        this._selecionado = parametros.model;
        this._altereValoresInputs(parametros.model);
        window[`Grid_${this._options.id}`].clear();
        this.__modal.hide();
        this._options.aoSelecionar && eval(`${this._options.aoSelecionar}(parametros.model)`);
        this._disparaSelecao();
    }

    _disparaSelecao() {
        document.dispatchEvent(this._eventoSelecao);
    }

    _altereValoresInputs(model) {
        this._inputCodigo.value = this._obtenhaCodigoSelecao(model);
        this._inputDescricao.value = this._obtenhaDescricaoSelecao(model);

        if (this._options.permiteDigitar) {
            this._inputDescricao.setAttribute("readonly", true);
        }

        this._mostreControlesSelecionado();
        this._dispareEventos();
    }

    _obtenhaCodigoSelecao(selecionado) {
        if (!this._options.modelName || !selecionado) return;
        return eval(`selecionado.${this._options.keyName}`);
    }

    _obtenhaDescricaoSelecao(selecionado) {
        if (!this._options.modelName || !selecionado) return;

        if (this._options.modelName === 'ProfissionalRegistradoModel') {
            return `${selecionado.TipoDeRegistro.Descricao}: ${selecionado.Registro}-${selecionado.UF.Sigla} ${selecionado.Nome}`;
        }

        return selecionado.DescricaoPesquisa || selecionado.Descricao || selecionado.Nome;
    }

    _dispareEventos() {
        let eventoChange = new Event("change");
        this._inputCodigo.dispatchEvent(eventoChange);
        this._inputDescricao.dispatchEvent(eventoChange);
    }

    _prepare() {

        if (this._options.disabled) {
            this.desabilite();
        }
        var eventoKeydownDescricao = (ev) => {
            const keyTab = 9;
            const keyDelete = 46;
            const keyBackspace = 8;
            const key = ev.keyCode;

            if (key === keyDelete || key === keyBackspace) {
                this.limpe();
                return;
            }

            if (key === keyTab) return;
            ev.preventDefault();
            ev.stopPropagation();
            if (ehAlfanumerico(ev)) this._openModal(ev.key);
        }

        var eventoChangeDescricao = (ev) => {
            if (this._inputCodigo && this._inputCodigo.value === "" && !this._options.permiteDigitar) ev.currentTarget.value = "";

            if (ev.currentTarget.value === "") {
                this._oculteControlesSelecionado();
            }
        }

        var eventoKeydownPesquisa = (ev) => {
            if (ev.keyCode === 38 || ev.keyCode === 40 || ev.keyCode === 13) {
                ev.preventDefault();
            }
        }

        var wto = undefined;
        var eventoKeyupPesquisa = (ev) => {
            ev.preventDefault();
            if (ev.keyCode && ![8, 46].includes(ev.keyCode)) return;
            clearTimeout(wto);
            this._selecionar.disabled = true;
            this._oculteControlesPesquisa();
            let valorFiltro = this._inputPesquisa.value;
            wto = setTimeout(() => this._filtre(valorFiltro), 500);
        }

        var eventoKeyDownModal = (ev) => {
            if (ev.keyCode === 13) return this._selecione();
            if (ev.keyCode === 38) return window[`Grid_${this._options.id}`].selecioneAnterior();
            if (ev.keyCode === 40) return window[`Grid_${this._options.id}`].selecioneProximo();
        }

        if (!this._inputDescricao.value.length) this._oculteControlesSelecionado();
        this._inputDescricao.addEventListener('change', eventoChangeDescricao);

        if (!this._options.permiteDigitar) ['keydown', 'cut', 'paste'].forEach(nomeEvento =>
            this._inputDescricao.addEventListener(nomeEvento, eventoKeydownDescricao));

        this._inputPesquisa.addEventListener('keydown', eventoKeydownPesquisa);
        this._inputPesquisa.addEventListener('keyup', eventoKeyupPesquisa);
        this.__modal.addEventListener('keydown', eventoKeyDownModal);

        this._apagarPesquisa.addEventListener('click', () => { this._apaguePesquisa(); });
        this._apagarSelecionado.addEventListener('click', () => { this._apagueSelecionado(); });
        this._pesquisar.addEventListener('click', () => { this._openModal() });
        this._selecionar.addEventListener('click', () => this._selecione());
        this._eventoSelecao = new CustomEvent("selecao", { 'detail': this._options.id });

        this._fechar && this._fechar.addEventListener('click', () => { this._apaguePesquisa(); this.__modal.hide(); });
    }
    _abraUrlNovaJanela(url) {
        openWindow(url);
    }
    desabilite() {
        this._formGroup && this._formGroup.classList.add("disabled");
        this._inputDescricao.setAttribute("readonly", true);
        this._apagarSelecionado.style.display = "none";
        this._pesquisar.style.display = "none";
    }

    habilite() {
        this._formGroup && this._formGroup.classList.remove("disabled");
        this._inputDescricao.removeAttribute("readonly");
        if (this._inputDescricao.value != "") {
            this._apagarSelecionado.style.display = "";
        }
        this._pesquisar.style.display = "";
    }

    _mostreControlesSelecionado() {
        this._editar && this._mostre(this._editar);
        this._infoRapidas && this._mostre(this._infoRapidas);
        this._novo && this._oculte(this._novo);
        this._mostre(this._apagarSelecionado);
    }

    _oculteControlesSelecionado() {
        this._editar && this._oculte(this._editar);
        this._infoRapidas && this._oculte(this._infoRapidas);
        this._novo && this._mostre(this._novo);
        this._oculte(this._apagarSelecionado);
    }

    _oculteControlesPesquisa() {
        this._oculte(this._apagarPesquisa);
    }

    _oculte(el) {
        el.style.display = "none";
    }

    _mostre(el) {
        el.style.display = "block";
    }

    inputCodigo() {
        return this._inputCodigo;
    }

    inputDescricao() {
        return this._inputDescricao;
    }

    limpe() {
        this._apagueSelecionado(true);
    }

    obtenhaSelecionado() {
        return this._selecionado;
    }

    definaSelecionado(obj) {
        if (!obj) return;
        this._altereValoresInputs(obj);
        this._selecionado = obj;
    }
}