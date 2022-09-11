using DS.WEB.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace DS.WEB.Pages.Disciplina
{
    public class AterrissagemDisciplinaModel : PageModel
    {
        public List<DisciplinaModel> Disciplinas { get; }

        public void OnGet()
        {
        }
    }
}
