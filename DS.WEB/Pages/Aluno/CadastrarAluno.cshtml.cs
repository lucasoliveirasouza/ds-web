using DS.WEB.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DS.WEB.Pages.Aluno
{
    public class CadastrarAlunoModel : PageModel
    {
        public AlunoModel Aluno { get; }

        public void OnGet()
        {
        }
    }
}
