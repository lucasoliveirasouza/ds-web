using System;

namespace DS.WEB.Componentes.ViewComponent.Pesquisa
{
    public class PesquisaOptions
    {
        public string AspFor { get; set; } = "";

        public string GetElementId => AspFor.Replace(".", "_");

        public string Label { get; set; } = "";

        public Type TipoModel { get; set; }

        public string Action { get; set; } = "";

        public string Method { get; set; } = "";

        public string KeyName { get; set; } = "";

        public string ParametrosPesquisa { get; set; } = "";

        public string FiltrarPor { get; set; }

        public bool EhPesquisaServerSide { get; set; }

        public string AoSelecionar { get; set; }

        public string AoApagar { get; set; }
    }
}
