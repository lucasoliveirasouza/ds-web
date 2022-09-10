using DS.WEB.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace DS.WEB.Pages.Aluno
{
    public class AterrissagemAlunoModel : PageModel
    {
        public List<AlunoModel> Alunos { get; }


        public void OnGet()
        {
        }
    }
}
