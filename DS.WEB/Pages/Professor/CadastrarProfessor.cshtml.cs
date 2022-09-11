using DS.WEB.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DS.WEB.Pages.Professor
{
    public class CadastrarProfessorModel : PageModel
    {
        public ProfessorModel Professor { get; }

        public void OnGet(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                ViewData["idProfessor"] = id;
            }
        }
    }
}
