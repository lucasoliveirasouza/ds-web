using DS.WEB.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DS.WEB.Pages.Shared.Components
{
    public class _ModalEnderecoModel : PageModel
    {
        public EnumEstado Estado { get; }

        public void OnGet()
        {
        }
    }
}
