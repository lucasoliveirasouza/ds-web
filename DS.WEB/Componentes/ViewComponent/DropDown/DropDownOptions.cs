using System;
using System.Collections.Generic;

namespace DS.WEB.Componentes.ViewComponent.DropDown
{
    public class DropDownOptions
    {
        public string AspFor { get; set; }
        public string GetElementId => AspFor.Replace(".", "_");
        public string Label { get; set; }
        public List<string> ClassList { get; set; } = new() { "form-select" };
        public string DefaultSelectMessage { get; set; } = "";
        public object[] Params { get; set; }
        public string AoSelecionar { get; set; }
        public Type TipoEnumerador { get; set; }
        public object Itens { get; set; }
    }
}
